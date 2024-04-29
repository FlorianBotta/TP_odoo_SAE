from odoo import fields, models, api


class Teacher(models.Model):
    _name = "tetras.teacher"
    _inherit = "tetras.contact"
    _description = "Tetras School Management - Teacher"

    diploma = fields.Char(string="Diploma")

    @api.model
    def create_teacher(self, vals_list):
        res = self.create(vals_list)
        return res

    def write_teacher(self, vals_list):
        return self.write(vals_list)
