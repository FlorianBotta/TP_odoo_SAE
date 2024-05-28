/** @odoo-module */

import { Transition } from "@web/core/transition";
import { ErrorHandler } from "@web/core/utils/components";
import { Component, onMounted, onWillStart } from "@odoo/owl";
import { useRDA } from "@rda_management/app/store/rda_hook";
import { Navbar } from "@rda_management/app/navbar/navbar";

/**
 * Chrome is the root component of the rda App.
 */
export class Chrome extends Component {
    static template = "rda_management.Chrome";
    static components = { Transition, ErrorHandler, Navbar };
    setup() {
        this.rda = useRDA();
    }
}
