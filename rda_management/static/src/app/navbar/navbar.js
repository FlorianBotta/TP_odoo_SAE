/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRDA } from "@rda_management/app/store/rda_hook";


export class Navbar extends Component {
    static template = "rda_management.Navbar";

    setup() {
        this.rda = useRDA();
    }
}

