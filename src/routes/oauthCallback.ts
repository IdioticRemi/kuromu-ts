import {URL, URLSearchParams} from "url";
import fetch from "node-fetch";
import {constants, Route, RouteStore, Util} from "klasa-dashboard-hooks";

export default class extends Route {

    constructor(
        store: RouteStore,
        file: string[],
        directory: string
    ) {
        super(store, file, directory, {route: 'oauth/callback'});
    }

    get oauthUser() {
        return this.store.get('oauthUser');
    }

    async post(request, response) {
        if (!request.body.code) return this.noCode(response);
        const url = new URL('https://discordapp.com/api/oauth2/token');
        // @ts-ignore
        url.search = new URLSearchParams([
            ['grant_type', 'authorization_code'],
            ['redirect_uri', request.body.redirectUri],
            ['code', request.body.code]
        ]);
        const res = await fetch(url, {
            headers: {Authorization: `Basic ${Buffer.from(`${this.client.user.id}:${this.client.options['clientSecret']}`).toString('base64')}`},
            method: 'POST'
        });
        if (!res.ok) return response.end(constants.RESPONSES.FETCHING_TOKEN);

        const {oauthUser} = this;

        if (!oauthUser) return this.notReady(response);

        const body = await res.json();
        // @ts-ignore
        const user = await oauthUser.api(body.access_token);

        return response.end(JSON.stringify({
            access_token: Util.encrypt({
                token: body.access_token,
                scope: [user.id, ...user.guilds.filter(guild => guild.userCanManage).map(guild => guild.id)]
            }, this.client.options['clientSecret']),
            user
        }));
    }

    notReady(response) {
        response.writeHead(500);
        return response.end(constants.RESPONSES.NOT_READY);
    }

    noCode(response) {
        response.writeHead(400);
        return response.end(constants.RESPONSES.NO_CODE);
    }

};