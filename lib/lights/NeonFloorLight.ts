import { Game } from '@gathertown/gather-game-client'
import { GatherObject, GatherList, GatherAsset, Alarm } from "../GatherBase"

export class NeonFloorAsset extends GatherAsset {
    template_id = "NeonLight - YetgPErSM2lROzL8wM8AX"
    palette = {pink: 'm2Her7RtvZNjwaPQ8kgUv', red: "iJgrKztSeq-fK2Gdk0whV", white:'x4kUNlkyKX9qaL3fxOGD6', green: 'SDTxqYl9GwajFLHzi0o0B', yellow: "tzsoZlPKC7mt5LVaBeJW_", blue: 'FWQgOYPJxPHzcTRcnpENf'}
    flash_one = this.palette.red
    flash_two = this.palette.green
    baseline = this.palette.pink
}

export class NeonFloorLight extends GatherObject {
    asset: NeonFloorAsset = new NeonFloorAsset()
}

export class NeonFloorList extends GatherList {
    asset: NeonFloorAsset = new NeonFloorAsset()
    buildObject(mapId: string, gameObj: Game, currentObjId: string) : GatherObject
    {
        return new NeonFloorLight(mapId, gameObj, currentObjId)
        
    }    
}