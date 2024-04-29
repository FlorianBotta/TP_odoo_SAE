/** @odoo-module */

import { Component } from "@odoo/owl";


export class ControlLine extends Component {
    static template = "tetras_school_management.ControlLine";

    static props = {
        control: Object,
        controlId: Number,
        onClick: { type: Function, optional: true },
    };
}