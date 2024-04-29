from odoo import fields, models, api


class Student(models.Model):
    _name = "tetras.student"
    _inherit = "tetras.contact"
    _description = "Tetras School Management - Student"

    name = fields.Char(string="Name", required=True)
    classroom_id = fields.Many2one(string="Classroom", comodel_name="tetras.classroom")
    grade_ids = fields.One2many(
        string="Grades",
        comodel_name="tetras.student.grade",
        inverse_name="student_id",
    )

    @api.model
    def create_student(self, vals_list):
        res = self.create(vals_list)
        return res

    def write_student(self, vals_list):
        return self.write(vals_list)

