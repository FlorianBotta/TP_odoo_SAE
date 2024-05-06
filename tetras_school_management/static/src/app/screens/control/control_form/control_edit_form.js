/** @odoo-module */

import {Component} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useTetras} from "@tetras_school_management/app/store/tetras_hook";

export class ControlEditScreen extends Component {
    static template = "tetras_school_management.ControlEditScreen";

    setup() {
        this.tetras = useTetras();
        this.filterControlStudent = this.filterStudent();
    }

    filterStudent() {
        const classrom_id = this.tetras.getControl(this.props.control_id).classroom_id[0];
        // students in the classroom
        const student_id_classroom = this.tetras.students.filter(student => student.classroom_id[0] === classrom_id);
        // students without grade in the control
        const student_id_control = this.tetras.students_grade_ids.filter(student => student.control_id[0] === this.props.control_id);
        return student_id_classroom.filter(student => !student_id_control.map(student => student.student_id[0]).includes(student.id));
    }

    SaveControlData(ev) {
        for (let student of this.filterControlStudent) {
            if (student.grade !== undefined) {
                this.tetras.orm.call("tetras.student.grade", "create_student_grade", [{
                    "student_id": student.id,
                    "control_id": this.props.control_id,
                    "grade": student.grade,
                }]).then(() => {
                    this.tetras.load_server_data();
                    this.tetras.showScreen('ControlFormScreen', {control:this.tetras.getControl(this.props.control_id)});
                });
            }
        }
    }


}

registry.category("tetras_screens").add("ControlEditScreen", ControlEditScreen);
