/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { ControlLine } from "@tetras_school_management/app/screens/control/control_list/control_line/control_line";
import { useState } from "@odoo/owl";
export class ControlListScreen extends Component {
    static template = "tetras_school_management.ControlListScreen";
    static components = { ControlLine };


    setup() {
        this.tetras = useTetras();
        this.state = useState({ filterControls: this.tetras.controls });
    }

    async onControlClick(control) {
        this.tetras.showScreen("ControlFormScreen", {"control": control})
    }

    SearchControlName(ev) {
        const text = ev.target.value.toLowerCase();
        this.state.filterControls  = this.tetras.controls.filter(control => control.name.toLowerCase().includes(text));
        if (text === "") {
            this.state.filterControls = this.tetras.controls;
        }


    }
}

registry.category("tetras_screens").add("ControlListScreen", ControlListScreen);