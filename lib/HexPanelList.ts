// I'm 100% Unclear on what or why we've got both map and wire objects,
// but this works so.....🤷‍♂️
import { Game, MapObject, WireObject } from "@gathertown/gather-game-client";
import { HexPanelColor } from './HexPanelColor'
import { Alarm } from './Alarm'
import { HexPanel } from './HexPanel'

export interface WireList { [key: number]: WireObject } // Cuz Typescript

/**
 * Class responsible for managing the hex lights
 */
export class HexPanelList {
    alarm_one: WireList = {};
    alarm_two: WireList = {};
    safe: WireList = {};
    current: string =  HexPanelColor.safe
    game: Game
    mapId: string
    alarm?: Alarm 


    /**
     * Buiiiiildit
     * 
     * @param mapId configured in config.ts
     * @param gameObj loaded in index
     * @param alarm optional if you want to trigger the flashing some other way
     */
    constructor(mapId: string,gameObj: Game, alarm: Alarm|null = null){
        this.game = gameObj
        this.mapId = mapId
        let objects = gameObj.partialMaps[mapId].objects
        let currentObj: MapObject
        for (let key in objects){
            currentObj = objects[parseInt(key)]
            if (currentObj.templateId == HexPanel.template_id){
                this.add(parseInt(key), new HexPanel(mapId, gameObj, String(currentObj.id)))
            }
        }
        if (alarm){
            this.alarm = alarm
            setInterval(() => {alarm.active() ? this.flashAll() : this.clearAll()}, 200)
        }
    }

    /**
     * Take a single panel, and duplicate different colored versions of it to 
     * different wirelists. Basically just preloading all the different states
     * so we can swap them out at will
     * 
     * @param key pretty sure any number will work as long as it's unique
     * @param panel 
     */
    add(key:number, panel:HexPanel): void
    {
        this.alarm_one[key] = panel.objectForColor(HexPanelColor.alarm_one)
        this.alarm_two[key] = panel.objectForColor(HexPanelColor.alarm_two)
        this.safe[key] = panel.objectForColor(HexPanelColor.safe)

    }

    /**
     * Flash all the panels to an alternating color
     */
    flashAll() : void
    {
        this.current = this.current != HexPanelColor.alarm_one ? HexPanelColor.alarm_one : HexPanelColor.alarm_two
        this.send()
    }

    /**
     * Set all the colors back to the "safe" color
     */
    clearAll() : void
    {
        if (!this.alarm!.active()){
            this.current = HexPanelColor.safe
            this.send()
        }
    }

    /**
     * Match against the "current" color and send off the request to the
     * gather API to set the color. Any modifications to objects will be
     * passed along here as well.
     */
    send(): void
    {
        let objects = this.safe
        if (this.current == HexPanelColor.alarm_one) objects = this.alarm_one
        if (this.current == HexPanelColor.alarm_two) objects = this.alarm_two
        this.game.engine.sendAction({
            $case: "mapSetObjects",
            mapSetObjects: {
                mapId: this.mapId,
                objects,
            },
        });        
    }
    
}