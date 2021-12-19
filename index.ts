import { API_KEY, MAP_ID, SPACE_ID } from "./config";
import { HexPanelList } from "./lib/HexPanelList";
import { Alarm } from "./lib/Alarm"
import { Game } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");

// Set up the Connection
const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
game.connect(SPACE_ID);

// Wait for it to kick off
game.subscribeToConnection((connected) => {
    // Run this in a set-interval to make we load the panels successfully
    const batchConnectInterval = setInterval(() => {
        if (connected){
            const alarm = new Alarm() 
            new HexPanelList(MAP_ID, game, alarm)
            setInterval(() => {alarm.check()}, 10000)
            clearInterval(batchConnectInterval) // Once the Panels and alarm are set up, clear this
        }
    },5000)        
})
