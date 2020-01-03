const url = 'http://localhost:4000/api/application';

export class ApplicationAPI {
    static fetchApplication() {
        return new Promise(async (resolve, reject) => {
            try {
                const results = await fetch(url).then(res => res.json());

                resolve([{
                    name: "Ping",
                    value: `Bot latency is ${results.latency} ms`
                }, {
                    name: "Uptime",
                    value: `Online since ${results.uptime}`
                }, {
                    name: "Clustering",
                    value: `Running on ${results.clusters} clusters`
                }, {
                    name: "Sharding",
                    value: `Running on ${results.shards} shards`
                }]);
            } catch (e) {
                reject(e);
            }
        })
    }
}