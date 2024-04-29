/** @odoo-module */

import { Component } from "@odoo/owl";


export class ClassroomLine extends Component {
    static template = "tetras_school_management.ClassroomLine";

    static props = {
        classroom: Object,
        classroomId: Number,
        onClick: { type: Function, optional: true },
    };
}