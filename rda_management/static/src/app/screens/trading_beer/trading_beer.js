/** @odoo-module */

import {Component} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useRDA} from "@rda_management/app/store/rda_hook";
import {onMounted} from "@odoo/owl";
import {useState} from "@odoo/owl";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

export class TradingBeerScreen extends Component {
    static template = "rda_management.TradingBeerScreen";
    static components = { Dropdown, DropdownItem };
    setup() {
        this.rda = useRDA();
        this.state = useState({product_name: "Choisir un produit"}, {product_id: null});
        this.orm = useService("orm");
        onMounted(() => {
            this.initChart();
        });
    }

    initChart() {
        const exisiting_chart = document.getElementById("container");
        if (exisiting_chart) {
            exisiting_chart.remove();
        }

        const containers = document.getElementById("containers");
        const container = document.createElement("div");

        container.id = "container";
        container.style.width = "100%";
        container.style.height = "500px";

        containers.style.height = "500px";
        containers.style.width = "100%";
        containers.appendChild(container);

        var data_table = this.rda.trading_beer[0].data_beer;

        data_table = eval(data_table)

        var table = anychart.data.table();
        table.addData(data_table);

        // map the data
        var mapping = table.mapAs();
        mapping.addField('open', 1);
        mapping.addField('high', 2);
        mapping.addField('low', 3);
        mapping.addField('close', 4);

        // chart type
        var chart = anychart.stock();

        // set the series
        var series = chart.plot(0).candlestick(mapping);
        series.name(this.state.product_name + "stock prices");

        chart.title(_t('Trading Beer of ' + this.state.product_name));
        chart.container('container');

        chart.draw();
    }

    _onSelected(product) {
        this.state.product_name = product.name;
        this.state.product_id = product.id;
        this._on_change_product().then(r => console.log("Product changed"));
    }

    async _on_change_product(){
        await this.orm.call("rda.beer.trading", "get_beer_trading_data", [], {product_id: this.state.product_id});
        await this.rda.load_server_data();
        this.initChart();
    }

}

registry.category("rda_screens").add("TradingBeerScreen", TradingBeerScreen);