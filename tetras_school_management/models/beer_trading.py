from odoo import models, fields, api, _
import pandas as pd
from datetime import datetime, timedelta

COEFF_BIERE = 0.009
OPENING_HOURS = [(11, 0), (14, 0), (17, 0), (1, 0)]


class BeerTrading(models.Model):
    _name = 'tetras.beer.trading'
    _description = 'Beer Trading'

    name = fields.Char(string='Name')
    data_beer = fields.Char(string='Data Beer')

    def _init_data_beer(self):
        orders = self.env['pos.order'].search(["lines.product_id.categ_id.name", "=", "Bière"])
        for order in orders:
            for line in order.lines:
                if "mont blanc" in line.product_id.name.lower():
                    res_data = {
                        'date_order': order.date_order.strftime('%Y-%m-%d %H:%M:%S'),
                        "product": line.product_id.name,
                        "qty": line.qty,
                    }

    def outsite_openning_hours(self, row):
        order_time = row['date_order'].time()

        start_date_morning = datetime.combine(row['date_order'].date(),
                                              datetime.strptime(f'{OPENING_HOURS[0][0]}:{OPENING_HOURS[0][1]}',
                                                                '%H:%M').time())
        end_date_morning = datetime.combine(row['date_order'].date(),
                                            datetime.strptime(f'{OPENING_HOURS[1][0]}:{OPENING_HOURS[1][1]}',
                                                              '%H:%M').time())
        start_date_afternoon = datetime.combine(row['date_order'].date(),
                                                datetime.strptime(f'{OPENING_HOURS[2][0]}:{OPENING_HOURS[2][1]}',
                                                                  '%H:%M').time())
        end_date_afternoon = datetime.combine((row['date_order']).date(), datetime.strptime('23:59', '%H:%M').time())

        if (start_date_morning.time() <= order_time < end_date_morning.time()) or (
                start_date_afternoon.time() <= order_time < end_date_afternoon.time()): return True
        if order_time.hour == 0: return True

        return False

    def get_time_since(self, row):
        if not self.outsite_openning_hours(row):
            return False
        date = row['date_order']
        if date.hour < OPENING_HOURS[1][0] and date.hour != 0:
            opening_time = datetime.combine(date, datetime.strptime(f'{OPENING_HOURS[0][0]}:{OPENING_HOURS[0][1]}',
                                                                    '%H:%M').time())
            return abs((date - opening_time).total_seconds() / 60)
        opening_time = datetime.combine(date, datetime.strptime(f'{OPENING_HOURS[0][0]}:{OPENING_HOURS[0][1]}',
                                                                '%H:%M').time()) + timedelta(hours=3)
        return abs((date - opening_time).total_seconds() / 60)

    def get_data(self):
        datas = [
            {'date_order': '2024-05-02 11:54:12', 'product': 'Biere', 'qty': 2},
            {'date_order': '2024-05-02 11:54:24', 'product': 'Biere', 'qty': 8},
            {'date_order': '2024-05-02 11:54:32', 'product': 'Biere', 'qty': 8},
            {'date_order': '2024-05-02 11:54:45', 'product': 'Biere', 'qty': 8},
            {'date_order': '2024-05-02 11:54:59', 'product': 'Biere', 'qty': 8},
            {'date_order': '2024-05-02 11:55:24', 'product': 'Biere', 'qty': 8},
            {'date_order': '2024-05-02 12:00:24', 'product': 'Biere', 'qty': 1},
            {'date_order': '2024-05-02 19:05:24', 'product': 'Biere', 'qty': 1},
            {'date_order': '2024-06-02 00:54:45', 'product': 'Biere', 'qty': 8},
        ]

        df = pd.DataFrame(datas)

        df['date_order'] = pd.to_datetime(df['date_order'])

        df['time_since_opening'] = df.apply(self.get_time_since, axis=1)

        df['day'] = df['date_order'].dt.date

        df['total_qty_since'] = df.apply(
            lambda row: df[(df['day'] == row['day']) & (df['date_order'] < row['date_order'])]['qty'].sum(), axis=1) + \
                                df[
                                    'qty']

        df['forex_price'] = df.apply(
            lambda x: calculate_price(nb_sold=x['total_qty_since'], time=x['time_since_opening']), axis=1)

        df['rounded_time'] = df['date_order'].dt.floor('10min')

        result = df.groupby(pd.Grouper(key='rounded_time', freq='10min')).agg({
            'forex_price': ['max', 'min', 'first', 'last']
        }).reset_index()

        # Renommer les colonnes agrégées
        result.columns = ['rounded_time', 'max_price', 'min_price', 'first_price', 'last_price']

        result = result.dropna()

        result['rounded_time'] = result['rounded_time'].apply(lambda x: str(x))

        beer_trading_id = self.env['tetras.beer.trading'].search([('name', '=', 'Beer Trading')], limit=1)
        if beer_trading_id:
            beer_trading_id.data_beer = result.values.tolist()
        else:
            beer_trading_id = self.env['tetras.beer.trading'].create({'name': 'Beer Trading'}).sudo()
            beer_trading_id.data_beer = result.values.tolist()


def calculate_price(nb_sold, time):
    expression = 5 - (2 * COEFF_BIERE) * nb_sold + COEFF_BIERE * time
    if expression < 3:
        return 3
    return min(expression, 7)
