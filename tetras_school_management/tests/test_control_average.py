from odoo.tests import tagged
from odoo.tests.common import TransactionCase


@tagged('post_install', '-at_install')
class TestControlAverage(TransactionCase):

    def setUp(self):
        super(TestControlAverage, self).setUp()
        self.classroom = self.env['tetras.classroom'].create({
            'name': 'Classroom 1',
            'capacity': 10,
        })
        self.tetras_student_1 = self.env['tetras.student'].create({
            'name': 'Student 1',
            'classroom_id': self.classroom.id,
        })
        self.tetras_student_2 = self.env['tetras.student'].create({
            'name': 'Student 2',
            'classroom_id': self.classroom.id,
        })
        self.control = self.env['tetras.control'].create({
            'name': 'Control 1',
            'date': '2021-01-01',
            'classroom_id': self.classroom.id,
        })
        self.student_grade_1 = self.env['tetras.student.grade'].create({
            'student_id': self.tetras_student_1.id,
            'grade': 10,
            'control_id': self.control.id,
        })
        self.student_grade_2 = self.env['tetras.student.grade'].create({
            'student_id': self.tetras_student_2.id,
            'grade': 20,
            'control_id': self.control.id,
        })

    def test_compute_average(self):
        self.assertEqual(self.control.average_grade, 15)
