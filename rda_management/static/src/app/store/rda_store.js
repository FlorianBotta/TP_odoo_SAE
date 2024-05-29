/** @odoo-module */
import {Reactive} from "@web/core/utils/reactive";
import {registry} from "@web/core/registry";

export class RDAStore extends Reactive {
    mainScreen = {name: null, component: null};
    static serviceDependencies = [
        "orm",
    ];

    constructor() {
        super();
        this.ready = this.setup(...arguments).then(() => this);
    }

    async setup(env, {orm}) {
        this.env = env;
        this.orm = orm;
        await this.load_server_data();

        this.showScreen("TradingBeerScreen");

        setInterval(async () => {
            try {
                await this.load_server_data();
                console.log("Données de la bière actualisées avec succès !");
            } catch (error) {
                console.error("Erreur lors de l'actualisation des données de la bière :", error);
            }
        }, 5 * 60 * 100);
    }

    async load_server_data() {
        console.log("Chargement des données de la bière...");
        const loadedData = await this.orm.silent.call("rda.management", "load_rda_data", []);
        await this._processData(loadedData);
    }


    async _processData(loadedData) {
        this.trading_beer = loadedData["rda.beer.trading"];
        this.product_ids = loadedData["product.template"];
    }


    showScreen(name, props) {
        const component = registry.category("rda_screens").get(name);
        this.mainScreen = {component, props};
    }

}

export const rdaService = {
    dependencies: RDAStore.serviceDependencies,
    async start(env, deps) {
        return new RDAStore(env, deps).ready;
    },
};

registry.category("services").add("rda", rdaService);
