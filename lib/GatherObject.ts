import { Game, MapObject, WireObject } from "@gathertown/gather-game-client";
import { GatherAsset } from './GatherAsset'
import { Alarm } from './Alarm'

/**
 * Base Gather Object, children just need to define asset
 */
export class GatherObject {
    id: string
    map_id: string
    object: MapObject
    game: Game
    asset: GatherAsset = new GatherAsset()
    alarm?: Alarm|null

    /**
     * Load a Gather Object panel. If an alarm object is passed this will set it
     * up to alert whenever the alarm goes active. Otherwise this should be
     * used to populate an objects array for bulk updates
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
     * Flash this individual object 
     */
    flash() : void
    {
        this.object.normal = this.object.normal == this.asset.one() ? this.asset.two() : this.asset.one()
        this.game.setObject(this.map_id, this.id, this.object)
    }

    /**
     * Clear this object to the safe color, only run if we're not already safe
     */
    clear() : void
    {
        if (this.object.normal != this.asset.base()){
            this.object.normal = this.asset.base()
            this.game.setObject(this.map_id, this.id, this.object)
        }
    }

}


