/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { StudentLine } from "@tetras_school_management/app/screens/students/student_list/student_line/student_line";
import { useState } from "@odoo/owl";
export class StudentListScreen extends Component {
    static template = "tetras_school_management.StudentListScreen";
    static components = { StudentLine };

    setup() {
        this.tetras = useTetras();
        this.state = useState({ filterStudents: this.tetras.students });
    }

    async onStudentClick(student) {
        this.tetras.showScreen("StudentFormScreen", {"contact": student})
    }
    async onNewStudentNameChange(ev) {
        if (ev.key === "Enter") {
            const text = ev.target.value.trim();
            ev.target.value = "";
            if (text) {
                const NewStudent = {
                    name: text,
                    classroom_id: [],
                    grade_ids: [],
                }
                await this.tetras.orm.call("tetras.student", "create_student", [NewStudent]);
                this.tetras.load_server_data();
            }
        }
    }
    SearchStudentName(ev) {
        const text = ev.target.value.toLowerCase();
        this.state.filterStudents  = this.tetras.students.filter(student => student.name.toLowerCase().includes(text));
        if (text === "") {
            this.state.filterStudents = this.tetras.students;
        }
    }
}

registry.category("tetras_screens").add("StudentListScreen", StudentListScreen);
