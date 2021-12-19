import { Game, MapObject, WireObject } from "@gathertown/gather-game-client";
import { HexPanelColor } from './HexPanelColor'
import { Alarm } from './Alarm'
 
/**
 * Single Hex Panel, shouldn't be used directly unless you only have one or two
 * lights, otherwise you'll run into rate limiting issues reaaaaal quicklike
 */
export class HexPanel {
    static template_id: string = "NeonLightHexagonal3 - AAon1ubyMS1h4gUg9fcuv"
    id: string
    map_id: string
    object: MapObject
    game: Game

    /**
     * Load a Hex panel. If an alarm object is passed this will set it
     * up to alert whenever the alarm goes active. Otherwise this should
     * be used to populate an objects array for bulk updates
     * 
     * @param map_id 
     * @param game 
     * @param object_id 
     * @param alarm 
     */
    constructor(map_id: string, game: Game, object_id: string, alarm: Alarm|null = null)
    {
        this.id = object_id
        this.map_id = map_id
        this.game = game
        console.log("Hex Panel Loading for", object_id)
        this.object = game.getObject(object_id)!.obj
        if (alarm != null){
            setInterval(() => {alarm.active() ? this.flash() : this.clear()}, 200)
        }
    }
    

    /**
     * Retrieve a clone of the object with a specified color set, this is for batching
     * mapSetObject actions when you've got too many lights to trigger individually
     * 
     * @param color String from Color class
     * @returns MapObject object with updated color
     */
    objectForColor(color: string) : WireObject
    {
        //Apparently this needs to be set manually for WireObject to be happy, idk
        let cloned = Object.assign({"_tags" : []}, this.object)
        cloned.normal = color
        cloned._tags = []
        return cloned
    } 

    /**
     * Flash this individual panel 
     */
    flash() : void
    {
        this.object.normal = this.object.normal == HexPanelColor.alarm_one ? HexPanelColor.alarm_two : HexPanelColor.alarm_one
        this.game.setObject(this.map_id, this.id, this.object)
    }

    /**
     * Clear this panel to the safe color, only run if we're not already safe
     */
    clear() : void
    {
        if (this.object.normal != HexPanelColor.safe){
            this.object.normal = HexPanelColor.safe
            this.game.setObject(this.map_id, this.id, this.object)
        }
    }

}


