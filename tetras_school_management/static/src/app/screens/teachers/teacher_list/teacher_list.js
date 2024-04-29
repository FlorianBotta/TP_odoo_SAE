/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { TeacherLine } from "@tetras_school_management/app/screens/teachers/teacher_list/teacher_line/teacher_line";
import { useState } from "@odoo/owl";
export class TeacherListScreen extends Component {
    static template = "tetras_school_management.TeacherListScreen";
    static components = { TeacherLine };


    setup() {
        this.tetras = useTetras();
        this.state = useState({ filterTeachers: this.tetras.teachers });
    }

    async onTeacherClick(teacher) {
        this.tetras.showScreen("TeacherFormScreen", {"contact": teacher})
    }

    SearchTeacherName(ev) {
        const text = ev.target.value.toLowerCase();
        this.state.filterTeachers  = this.tetras.teachers.filter(student => student.name.toLowerCase().includes(text));
        if (text === "") {
            this.state.filterTeachers = this.tetras.teachers;
        }
    }
}

registry.category("tetras_screens").add("TeacherListScreen", TeacherListScreen);
