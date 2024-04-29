/** @odoo-module */

import {Component, useState} from "@odoo/owl";
import {useTetras} from "@tetras_school_management/app/store/tetras_hook";

export class ContactFormScreen extends Component {
    static template = "tetras_school_management.StudentFormScreen";

    setup() {
        this.tetras = useTetras();
        this.state = useState({isOpen: true, model: "tetras.contact"});
    }

    async UnlinkContact() {
        this.tetras.orm.call("tetras.contact", "delete_contact", [this.props.contact.id, this.state.model]).then(() => {
            this.refreshData();
        });
    }

    refreshData() {
        this.tetras.load_server_data();
    }
    SaveContactData() {
        return {
            id: this.props.contact.id,
            name: this.props.contact.name,
            email: this.props.contact.email,
            phone: this.props.contact.phone,
            birth_day: this.props.contact.birth_day,
        };
    }
}