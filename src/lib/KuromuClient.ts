import {KlasaClient, KlasaClientOptions} from "klasa";
import {DashboardClient} from "klasa-dashboard-hooks";

class KuromuClient extends KlasaClient {
    constructor(options: KlasaClientOptions) {
        super(options);

        // @ts-ignore
        this.console.startup = (...args) => this.console.write(args, "startup");
        // @ts-ignore
        this.console.cleanup = (...args) => this.console.write(args, "cleanup");
    }
}

KuromuClient.use(DashboardClient);

export {KuromuClient};