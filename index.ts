import { API_KEY, MAP_ID, SPACE_ID } from "./config";
import { NeonFloorList } from "./lib/lights/NeonFloorLight";
import { Alarm } from "./lib/Alarm"
import { Game, Space } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");


switch (process.argv[2]){
    case 'items': getMapItems(); break;
    case 'alarms': setupAlarms(); break;
    case 'help' : 
    default: 
        console.log("usage:")
        console.log("\tnpm run items : Save space to map.json and print out list of items and IDs to console")
        console.log("\tnpm run alarms : Run the currently configured alarm setup")
        process.exit()
    break
}

function getMapItems(){
    // Set up the Connection
    const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
    game.connect(SPACE_ID);
    game.subscribeToConnection((connected) => {
        const mapConnectInterval = setInterval(() => {
            if (connected){
                const fs = require('fs')
                fs.writeFileSync('maps.json', JSON.stringify(game.partialMaps))
                let map = game.partialMaps['empty-room-small-brick']
                for(let i in map.objects){
                    let obj = map.objects[parseInt(i)]
                    console.log(obj._name, obj.id)
                    console.log(obj.templateId)
                    console.log(obj.normal)
                    console.log("\n")
                }
                clearInterval(mapConnectInterval) // Once the Panels and alarm are set up, clear this
                game.disconnect(SPACE_ID)
                process.exit()
            }
        },5000)
    })
    
}

function setupAlarms(){
    // Set up the Connection
    const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
    game.connect(SPACE_ID);    
    // Wait for it to kick off
    game.subscribeToConnection((connected) => {
        // Run this in a set-interval to make we load the panels successfully
        const batchConnectInterval = setInterval(() => {
            if (connected){
                const alarm = new Alarm() 
                new NeonFloorList(MAP_ID, game, alarm).buildList()
                setInterval(() => {alarm.check()}, 10000)
                clearInterval(batchConnectInterval) // Once the Panels and alarm are set up, clear this
            }
        },5000)        
    })

}
