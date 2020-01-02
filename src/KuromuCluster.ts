import {BaseCluster} from "kurasuta";

// Local Imports

import {TOKENS} from "./config";

// Cluster Declaration

export default class extends BaseCluster {
    protected launch(): Promise<void> | void {
        this.client.login(TOKENS.DISCORD_TOKEN);
    }
}