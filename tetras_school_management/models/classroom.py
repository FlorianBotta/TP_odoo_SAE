from odoo import models, fields, api, _


class Classroom(models.Model):
    _name = "tetras.classroom"
    _description = "Classroom"

    name = fields.Char(string="Name", required=True)
    capacity = fields.Integer(string="Capacity")
    student_ids = fields.One2many("tetras.student", "classroom_id", string="Students")

    def write_classroom(self, classroom, student_ids):
        if student_ids:
            for student in student_ids:
                student_id = student.get("id")
                tetras_student = self.env["tetras.student"].browse(student_id)
                student_obj = {
                    "name": student.get("name"),
                    "email": student.get("email"),
                    "phone": student.get("phone"),
                    "birth_day": student.get("birth_day"),
                }
                tetras_student.write(student_obj)
        return self.write(classroom)
