from odoo import api, fields, models


class RDAManagement(models.Model):
    _name = "rda.management"
    _description = "RDA Management"

    @api.model
    def load_rda_data(self):
        return {
            "rda.beer.trading": self.env["rda.beer.trading"].search_read(
                fields=["name", "data_beer"]),
        }
