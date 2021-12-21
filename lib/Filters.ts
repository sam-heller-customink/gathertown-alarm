require('dotenv').config()
import { GameMapV2, MapObject } from "@gathertown/gather-game-client"
import { Templates } from "."


export abstract class Filter {
    abstract filter(map: Partial<GameMapV2>, object: MapObject) : boolean 

}

export class AlwaysPassFilter extends Filter {
    filter(map: Partial<GameMapV2>, object: MapObject) : boolean 
    {
        return true
    }
}
export class TempateExistsFilter extends Filter {
    filter(map: Partial<GameMapV2>, object: MapObject) : boolean 
    {
        return object._name ? Templates.name.includes(object._name!) : false
    }
}

export class ItemIDsFilter extends Filter {
    ids: Array<string>
    constructor(ids:Array<string>){
        super()
        this.ids = ids 
    }

    filter(map: Partial<GameMapV2>, object: MapObject) : boolean 
    {
        return object.id ? this.ids.includes(object.id) : false
    }
}

export class TemplateIDsFilter extends Filter {
    templateIds: Array<string>
    constructor(templateIds: string | Array<string>){
        super()
        this.templateIds = Array.isArray(templateIds) ? templateIds : new Array(templateIds)
    }

    filter(map: Partial<GameMapV2>, object: MapObject) : boolean 
    {
        return object.templateId ? this.templateIds.includes(object.templateId) : false
    }
}
