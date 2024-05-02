from odoo import api, fields, models


class TetrasManagement(models.Model):
    _name = "tetras.management"
    _description = "Tetras Management"

    @api.model
    def load_tetras_data(self):
        return {
            "tetras.student": self.env["tetras.student"].search_read(
                fields=["name", "email", "id", "birth_day", "phone", "classroom_id", "grade_ids"]),
            "tetras.teacher": self.env["tetras.teacher"].search_read(
                fields=["name", "email", "id", "birth_day", "phone", "diploma"]),
            "tetras.classroom": self.env["tetras.classroom"].search_read(
                fields=["name", "student_ids", "capacity"]),
            "tetras.student.grade": self.env["tetras.student.grade"].search_read(
                fields=["grade", "student_id", "control_id"]),
            "tetras.control": self.env["tetras.control"].search_read(
                fields=["name", "date", "classroom_id", "students_grade_ids", "average_grade", "min_grade", 'max_grade']),
            "tetras.beer.trading": self.env["tetras.beer.trading"].search_read(
                fields=["name", "data_beer"]),
        }
