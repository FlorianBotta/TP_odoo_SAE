from odoo import models, fields, api, _


class PosOrder(models.Model):
    _inherit = "pos.order"

    # @api.model_create_multi
    # def create(self, vals_list):
    #     res = super(PosOrder, self).create(vals_list)
    #
    #     for pos_order_line in res.lines:
    #         if pos_order_line.product_id.categ_id.name.lower() == 'bière':
    #             pos_order_line.product_id.last_date_order = res.date_order.strftime('%Y-%m-%d')
    #             # price = pos_order_line.product_id.list_price
    #             number_of_beers = pos_order_line.qty
    #             date_order = res.date_order
    #             # pass
    #
    #     return res
