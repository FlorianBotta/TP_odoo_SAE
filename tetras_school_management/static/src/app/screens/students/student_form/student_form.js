/** @odoo-module */

import { registry } from "@web/core/registry";
import { ContactFormScreen } from "@tetras_school_management/app/screens/contact/contact";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import {useRef,  useState } from "@odoo/owl";

export class StudentFormScreen extends ContactFormScreen {
    static template = "tetras_school_management.StudentFormScreen";
    static components = { Dropdown, DropdownItem };

    setup() {
        super.setup();
        this.state = useState({ isOpen: true, model: "tetras.student" });
        this.classroom = useRef("classroomId");
    }
    refreshData() {
        super.refreshData();
        this.tetras.showScreen("StudentListScreen");
    }

    SaveContactData() {
        const contact = super.SaveContactData();
        contact["classroom_id"] = this.props.contact.classroom_id[0];
        contact["grade_ids"] = this.props.contact.grade_ids;
        this.tetras.orm.call("tetras.student", "write_student",[this.props.contact.id, contact]).then(() => {
            this.tetras.load_server_data();
        });
    }

    _onSelected(classroom) {
        this.props.contact.classroom_id = [classroom.id, classroom.name];
    }
}
registry.category("tetras_screens").add("StudentFormScreen", StudentFormScreen);
