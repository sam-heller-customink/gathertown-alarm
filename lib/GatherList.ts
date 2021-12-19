// I'm 100% Unclear on what or why we've got both map and wire objects,
// but this works so.....🤷‍♂️
import { Game, MapObject, WireObject } from "@gathertown/gather-game-client";
import { GatherAsset, GatherObject, Alarm } from './GatherBase'
export interface WireList { [key: number]: WireObject } // Cuz Typescript

/**
 * Class responsible for managing the Gather Objects, set asset in 
 * child classses 
 */
export class GatherList {
    alarm_one: WireList = {};
    alarm_two: WireList = {};
    safe: WireList = {};
    current: string = ""
    game: Game
    mapId: string
    alarm?: Alarm 
    asset: GatherAsset


    /**
     * 
     * 
     * @param mapId configured in config.ts
     * @param gameObj loaded in index
     * @param alarm optional if you want to trigger the flashing some other way
     */
    constructor(mapId: string,gameObj: Game, alarm: Alarm|null = null){
        this.asset = new GatherAsset()
        this.game = gameObj
        this.mapId = mapId
        if (alarm){
            this.alarm = alarm
            setInterval(() => {alarm.active() ? this.flashAll() : this.clearAll()}, 200)
        }
    }

    /**
     * Build the list of objects
     */
    buildList(){
        let objects = this.game.partialMaps[this.mapId].objects
        let currentObj: MapObject
        for (let key in objects){
            currentObj = objects[parseInt(key)]
            if (this.matchedTemplate(currentObj)){
                this.add(parseInt(key), this.buildObject(this.mapId, this.game, String(currentObj.id)))
            }
        }        
    }

    /**
     * Factory method which builds objects for the list,  override this in the 
     * child class to call the appropriate constructor
     * 
     * @param mapId 
     * @param gameObj 
     * @param currentObjId 
     * @returns 
     */
    buildObject(mapId: string, gameObj: Game, currentObjId: string) : GatherObject
    {
        return new GatherObject(mapId, gameObj, currentObjId)
        
    }

    /**
     * Method to match an object against a configured template
     * id, override this in an extending class to use a different object
     * @param obj 
     * @returns 
     */
    matchedTemplate(obj:MapObject) : boolean
    {
        return obj.templateId == this.asset.template()
    }

    /**
     * Take a single panel, and duplicate different colored versions of it to 
     * different wirelists. Basically just preloading all the different states
     * so we can swap them out at will
     * 
     * @param key pretty sure any number will work as long as it's unique
     * @param panel 
     */
    add(key:number, panel:GatherObject): void
    {
        this.alarm_one[key] = panel.objectForColor(this.asset.one())
        this.alarm_two[key] = panel.objectForColor(this.asset.two())
        this.safe[key]      = panel.objectForColor(this.asset.two())

    }

    /**
     * Flash all the panels to an alternating color
     */
    flashAll() : void
    {
        this.current = this.current != this.asset.one() ? this.asset.one() : this.asset.two()
        this.send()
    }

    /**
     * Set all the colors back to the "safe" color
     */
    clearAll() : void
    {
        if (!this.alarm!.active()){
            this.current = this.asset.base()
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
        if (this.current == this.asset.one()) objects = this.alarm_one
        if (this.current == this.asset.two()) objects = this.alarm_two
        this.game.engine.sendAction({
            $case: "mapSetObjects",
            mapSetObjects: {
                mapId: this.mapId,
                objects,
            },
        });        
    }
    
}