import { API_KEY, SPACE_ID } from "./config";
import { TemplateData } from "./lib/index"
import { Game } from "@gathertown/gather-game-client";
import { getColorName, initColors, MINIMAL_COLORS } from "./lib/ntc";
import * as fs from 'fs'

/**
 * Hacky lil doo-dad to save a copy of the currently connected map and also 
 * print out to the console a TemplateData object populated with the names
 * and colors of all the objects in your map that can be copy/pasted
 * directly into Templates.data
 */
global.WebSocket = require("isomorphic-ws");
initColors(MINIMAL_COLORS);
const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
game.connect(SPACE_ID);
game.subscribeToConnection((connected) => {
    const mapConnectInterval = setInterval(() => {
        if (connected){
            fs.writeFileSync('maps.json', JSON.stringify(game.partialMaps))
            let map = game.partialMaps['empty-room-small-brick']
            let td:TemplateData = {}
            for(let i in map.objects){
                let obj = map.objects[parseInt(i)]
                if (obj){
                    if (!(obj._name! in td)){td[obj._name!] = {colors: {}}}
                    let color_name = getColorName(obj.color).name.replace(' ', '_').toLowerCase()
                    let color_val = String(obj.normal.split('/').pop())
                    td[obj._name!].colors[color_name] = color_val
                }
            }
            console.log('='.repeat(50))
            console.log(td)
            console.log('='.repeat(50))
            clearInterval(mapConnectInterval)
            game.disconnect(SPACE_ID)
            process.exit()
        }
    },5000)
})




