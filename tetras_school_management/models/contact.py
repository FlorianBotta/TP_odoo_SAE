from odoo import fields, models, api


class Contact(models.Model):
    _name = "tetras.contact"
    _description = "Tetras School Management - Contact"

    name = fields.Char(string="Name")
    email = fields.Char(string="Email")
    phone = fields.Char(string="Phone")
    birth_day = fields.Date(string="Birth day")

    @api.model
    def delete_contact(self, contact_id, model_name):
        if model_name:
            contact = self.env[model_name].browse(contact_id)
            contact.unlink()
            return True
        try:
            contact = self.browse(contact_id)
            contact.unlink()
        except Exception:
            return Exception

