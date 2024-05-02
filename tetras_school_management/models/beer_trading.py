from odoo import models, fields, api, _


class BeerTrading(models.Model):
    _name = 'tetras.beer.trading'
    _description = 'Beer Trading'

    name = fields.Char(string='Name')

    data_beer = fields.Text(string='Data Beer')
