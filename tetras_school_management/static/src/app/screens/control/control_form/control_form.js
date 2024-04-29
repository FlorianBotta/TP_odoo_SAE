/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";

export class ControlFormScreen extends Component {
    static template = "tetras_school_management.ControlFormScreen";

    setup() {
        this.tetras = useTetras();
    }

    onDeleteStudentGradeClick(student_grade) {
        console.log("student_grade", student_grade.id);
        this.tetras.orm.call("tetras.student.grade", "delete_student_grade", [student_grade.id]).then(() => {
            this.tetras.load_server_data();
            // this.tetras.showScreen('ControlFormScreen', {control:this.tetras.getControl(this.props.control.id)});
        });

    }
}

registry.category("tetras_screens").add("ControlFormScreen", ControlFormScreen);
