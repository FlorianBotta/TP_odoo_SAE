/** @odoo-module */

import {Component} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useTetras} from "@tetras_school_management/app/store/tetras_hook";
import {onMounted} from "@odoo/owl";
import {useState} from "@odoo/owl";

export class TradingBeerScreen extends Component {
    static template = "tetras_school_management.TradingBeerScreen";

    setup() {
        this.tetras = useTetras();
        onMounted(() => {
            this.initChart();
        });
    }

    initChart() {
        var data_table = this.tetras.trading_beer[0].data_beer;

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
        series.name("ACME Corp. stock prices");

        chart.title('Stock Candlestick Demo: ACME Corp. Stock prices \n(Array data notation)');
        chart.container('container');

        chart.draw();
    }

}

registry.category("tetras_screens").add("TradingBeerScreen", TradingBeerScreen);