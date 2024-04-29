/** @odoo-module */

import { Component } from "@odoo/owl";


export class TeacherLine extends Component {
    static template = "tetras_school_management.TeacherLine";

    static props = {
        name: String,
        teacherId: Number,
        onClick: { type: Function, optional: true },
    };
}

