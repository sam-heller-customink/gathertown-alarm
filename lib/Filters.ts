require('dotenv').config()
import { MapObject } from "@gathertown/gather-game-client"
import { List } from "."

export class FilterLibrary {
    filters: {[key: string ]: Function }= {
        alwaysPassFilter: (list: List, object:MapObject): boolean => true,
        templateExistsFilter: (list: List, object:MapObject): boolean =>{ return list.templates.names.includes(object._name!) },
        idsFromEnvFilter: (list: List, object:MapObject) : boolean => {
            if (process.env.GATHER_FILTER_IDS && object.id){
                let validIds = process.env.GATHER_FILTER_IDS.split(",")
                return validIds.includes(object.id)
            }
            console.log("Failed env check in idsFilter")
            return true
        },
        templateFromEnvFilter:(list: List, object: MapObject): boolean => {
            if (process.env.GATHER_TEMPLATE_FILTER_IDS && object.templateId){
                let validIds = process.env.GATHER_TEMPLATE_FILTER_IDS.split(",")
                return validIds.includes(object.templateId)
            }
            return true
        }
    }
    get(key:string){
        return key in this.filters ? this.filters[key] : this.filters.alwaysPassFilter
    }
}