from odoo import api, fields, models


class RDAManagement(models.Model):
    _name = "rda.management"
    _description = "RDA Management"

    @api.model
    def load_rda_data(self):
        return {
            "product.template": self.env["product.template"].search_read(
                fields=["id", "name"], domain=[("type", "=", "product"), ("sale_ok", "=", True)]),
            "rda.beer.trading": self.env["rda.beer.trading"].search_read(
                fields=["name", "data_beer"]),
        }
