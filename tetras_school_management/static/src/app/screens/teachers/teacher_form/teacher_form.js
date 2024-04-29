/** @odoo-module */

import { registry } from "@web/core/registry";
import { ContactFormScreen } from "@tetras_school_management/app/screens/contact/contact";
import {useRef,  useState } from "@odoo/owl";

export class TeacherFormScreen extends ContactFormScreen {
    static template = "tetras_school_management.TeacherFormScreen";

    setup() {
        super.setup();
        this.state = useState({ isOpen: true, model: "tetras.teacher" });
        this.diploma = useRef("diploma");
    }

    refreshData() {
        super.refreshData();
        this.tetras.showScreen("TeacherListScreen");
    }

    SaveContactData() {
        const contact = super.SaveContactData();
        contact["diploma"] = this.props.contact.diploma;
        this.tetras.orm.call("tetras.teacher", "write_teacher",[this.props.contact.id, contact]).then(() => {
            this.tetras.load_server_data();
        });
    }
}

registry.category("tetras_screens").add("TeacherFormScreen", TeacherFormScreen);
