from odoo import fields, models, api


class Control(models.Model):
    _name = "tetras.control"
    _description = "Control"

    name = fields.Char(string="Name", required=True)
    date = fields.Date(string="Date")
    classroom_id = fields.Many2one("tetras.classroom", string="Classroom", required=True)
    students_grade_ids = fields.One2many('tetras.student.grade', 'control_id', string='Students Grades')
    average_grade = fields.Float(string="Average", compute="_compute_average")
    min_grade = fields.Float(string="Min Grade", default=0, compute="_compute_min_max_grade")
    max_grade = fields.Float(string="Max Grade", default=0, compute="_compute_min_max_grade")

    @api.onchange('classroom_id')
    def _onchange_classroom_id(self):
        if self.classroom_id:
            self.students_grade_ids = [(5, 0, 0)]
            for student in self.classroom_id.student_ids:
                self.students_grade_ids = [(0, 0, {
                    'student_id': student.id,
                    'grade': 0,
                })]

    def _compute_average(self):
        for record in self:
            if record.students_grade_ids:
                record.average_grade = sum(record.students_grade_ids.mapped('grade')) / len(record.students_grade_ids)
            else:
                record.average_grade = 0

    def _compute_min_max_grade(self):
        for record in self:
            if record.students_grade_ids:
                record.min_grade = min(record.students_grade_ids.mapped('grade'))
                record.max_grade = max(record.students_grade_ids.mapped('grade'))
            else:
                record.min_grade = 0
                record.max_grade = 0
