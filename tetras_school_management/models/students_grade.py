from odoo import fields, models,api


class StudentGrade(models.Model):
    _name = "tetras.student.grade"
    _description = "Tetras School Management - Student Grade"

    grade = fields.Float(string="Grade", required=True)
    student_id = fields.Many2one(
        string="Student",
        comodel_name="tetras.student",
        required=True,
        ondelete="cascade",
    )
    control_id = fields.Many2one(
        string="Control",
        comodel_name="tetras.control",
        required=True,
        ondelete="cascade",
    )

    @api.model
    def create_student_grade(self, vals):
        return self.create(vals)

    def delete_student_grade(self):
        self.unlink()
