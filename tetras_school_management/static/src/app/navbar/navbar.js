/** @odoo-module */

import { Component } from "@odoo/owl";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";


export class Navbar extends Component {
    static template = "tetras_school_management.Navbar";

    setup() {
        this.tetras = useTetras();
    }
}

