/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { ClassroomLine } from "@tetras_school_management/app/screens/classroom/classroom_list/classroom_line/classroom_line";
import { useState } from "@odoo/owl";
export class ClassroomListScreen extends Component {
    static template = "tetras_school_management.ClassroomListScreen";
    static components = { ClassroomLine };


    setup() {
        this.tetras = useTetras();
        this.state = useState({ filterClassrooms: this.tetras.classrooms });
    }

    async onClassroomClick(classroom) {
        this.tetras.showScreen("ClassroomFormScreen", {"classroom": classroom})
    }
    SearchClassroomName(ev) {
        const text = ev.target.value.toLowerCase();
        this.state.filterClassrooms  = this.tetras.classrooms.filter(classroom => classroom.name.toLowerCase().includes(text));
        if (text === "") {
            this.state.filterClassrooms = this.tetras.classrooms;
        }
    }
}

registry.category("tetras_screens").add("ClassroomListScreen", ClassroomListScreen);