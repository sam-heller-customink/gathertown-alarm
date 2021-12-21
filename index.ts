import { API_KEY, SPACE_ID } from "./config";
import { Game } from "@gathertown/gather-game-client";
import { List, Alarm } from "./lib";

global.WebSocket = require("isomorphic-ws");


const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
game.connect(SPACE_ID); 
game.subscribeToConnection((connected) => {
    let list = new List(game)
    game.subscribeToEvent("mapSetObjects", ((raw, context) => list.mapSetObjects(raw, context)))
    game.subscribeToEvent("mapDeleteObject", ((action, map) => list.mapDeleteObjects(action, map)))
    let alarm =new Alarm('AlwaysOn', (() => false))
    list.registerAlarm(alarm, 1000)
})




