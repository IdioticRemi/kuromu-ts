import {SharderEvents, ShardingManager} from "kurasuta";
import {Colors, KlasaConsole} from "klasa";
import {join} from "path";

// Local Imports

import {SHARDER_OPTIONS} from "./config";

// ShardingManager declaration

const shardingManager = new ShardingManager(join(__dirname, './KuromuCluster'), SHARDER_OPTIONS);

// Create a KlasaConsole

// @ts-ignore
const console = new KlasaConsole({
    colors: {
        log: {
            time: {
                background: "lightcyan"
            }
        }
    }
});

const shardStyle = {
    text: "black",
    background: "cyan"
};

// Listen to some events

shardingManager.on(SharderEvents.SPAWN, cluster => {
    console.log(`${new Colors(shardStyle).format(`[CLUSTER ${cluster.id}]`)} Cluster ${cluster.id} has spawned!`)
});

shardingManager.on(SharderEvents.SHARD_READY, shardID => {
    console.log(`${new Colors(shardStyle).format(`[${shardID}]`)} Shard ${shardID} is ready!`)
});

shardingManager.on(SharderEvents.READY, cluster => {
    console.log(`${new Colors(shardStyle).format(`[CLUSTER ${cluster.id}]`)} Cluster ${cluster.id} is reaady!`)
});

// Spawn the clusters

shardingManager.spawn();