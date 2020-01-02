import {inspect} from "util";
import fetch from "node-fetch";
import {constants, Route, RouteStore, Util} from "klasa-dashboard-hooks";

export default class extends Route {

    constructor(
        store: RouteStore,
        file: string[],
        directory: string
    ) {
        super(store, file, directory, {
            route: 'oauth/user',
            authenticated: true
        });
    }

    async api(token) {
        token = `Bearer ${token}`;
        const user = await fetch('https://discordapp.com/api/users/@me', {headers: {Authorization: token}})
            .then(result => result.json());
        await this.client.users.fetch(user.id);
        user.guilds = await fetch('https://discordapp.com/api/users/@me/guilds', {headers: {Authorization: token}})
            .then(result => result.json());
        return this.client['webUsers'].add(user);
    }

    async get(request, response) {
        let dashboardUser = this.client['webUsers'].get(request.auth.scope[0]);

        if (!dashboardUser) {
            dashboardUser = await this.api(request.auth.token);
            response.setHeader('Authorization', Util.encrypt({
                token: request.auth.token,
                scope: [dashboardUser.id, ...dashboardUser.guilds.filter(guild => guild.userCanManage).map(guild => guild.id)]
            }, this.client.options['clientSecret']));
        }

        return response.end(JSON.stringify(dashboardUser));
    }

    async post(request, response) {
        const botUser = await this.client.users.fetch(request.body.id);
        const updated = await botUser.settings.update(request.body.data, {action: 'overwrite'});
        const errored = Boolean(updated.errors.length);

        if (errored) this.client.emit('error', `${botUser.username}[${botUser.id}] failed updating user configs via dashboard with error:\n${inspect(updated.errors)}`);

        return response.end(constants.RESPONSES.UPDATED[Number(!errored)]);
    }

};