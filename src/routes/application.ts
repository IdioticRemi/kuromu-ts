import {Duration} from "klasa";
import {Route, RouteStore} from "klasa-dashboard-hooks";

export default class extends Route {

    constructor(
        store: RouteStore,
        file: string[],
        directory: string
    ) {
        super(store, file, directory, {route: 'application'});

        this.authenticated = false;
    }

    get(req, res) {
        return res.end(JSON.stringify({
            users: this.client.users.size,
            guilds: this.client.guilds.size,
            channels: this.client.channels.size,
            clusters: this.client.shard.clusterCount,
            shards: this.client.options.shardCount,
            uptime: Duration.toNow(Date.now() - (process.uptime() * 1000)),
            latency: this.client.ws.ping.toFixed(0),
            memory: process.memoryUsage().heapUsed / 1024 / 1024,
            invite: this.client.invite,
            ...this.client.application
        }));
    }

};