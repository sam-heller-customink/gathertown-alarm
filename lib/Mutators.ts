import { MapObject } from "@gathertown/gather-game-client"
import { List } from "."

export class MutatorLibrary {
    mutators: {[key: string ]: Function }= {
        randomColorMutator: (list: List, object: MapObject) : MapObject => {
            let parts = object.normal!.split('/')
            parts[parts.length - 1] = list.templates.randomColor(object._name!)
            object.normal = parts.join('/')
            return object
        },
        randomOffsetMutator: (list: List, object: MapObject) : MapObject => {
            object.offsetX = Math.floor(Math.random() * 100)
            object.offsetY = Math.floor(Math.random() * 100)
            return object
        },
        resetMutator: (list: List, object: MapObject) : MapObject => {
            object.offsetX = 0
            object.offsetY = 0
            object.properties = {}
            return object
        },
        moveLeftMutator: (list: List, object: MapObject): MapObject => {
            if (object.properties){
                if (object.properties!._x === undefined){
                    object.properties['_x'] = object.x
                    object.properties['_y'] = object.y
                    object.properties['direction'] = ["up", "down"][Math.round(Math.random())]
                }
                if (Math.abs(object.y - object.properties._y) < 2){
                    if (object.properties.direction == "up") object.y++
                    if (object.properties.direction == "down") object.y--
                } else {
                    if (object.properties.direction == "up") object.y--
                    if (object.properties.direction == "down") object.y++
                    object.properties.direction = object.properties.direction == "up" ? "down" : "up"
                }
                if (Math.abs(object.x - object.properties._x) > 20) object.x =object.properties._x
                object.x -= 1
            }
            

            return object
        }
        

    }
    get(key:string){
        return key in this.mutators ? this.mutators[key] : this.mutators.alwaysPassFilter
    }
}
