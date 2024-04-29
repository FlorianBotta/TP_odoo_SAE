/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { useState } from "@odoo/owl";

export class ClassroomFormScreen extends Component {
    static template = "tetras_school_management.ClassroomFormScreen";

    setup() {
        this.tetras = useTetras();
        this.state = useState({isOpen: true });
    }
    SaveClassroomData() {
        const classroom = {
            id: this.props.classroom.id,
            name: this.props.classroom.name,
        };
        const students = this.props.classroom.students;
        this.tetras.orm.call("tetras.classroom", "write_classroom",[this.props.classroom.id, classroom, students]).then(() => {
            this.tetras.load_server_data();
        });

    }

}

registry.category("tetras_screens").add("ClassroomFormScreen", ClassroomFormScreen);
