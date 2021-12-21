import { GameMapV2, MapObject, MoveDirection } from "@gathertown/gather-game-client"
import { MoveAction, MoveStep, MovePoint, Templates } from "."



export abstract class Mutator {
    abstract mutate(map: Partial<GameMapV2>, object: MapObject) : MapObject 

    normal(object: MapObject, templateKey: string)
    {
        let parts = object.normal!.split('/')
        parts[parts.length - 1] = templateKey
        object.normal = parts.join('/')
        return object

    }

}
export class randomColorMutator extends Mutator {
    mutate(map:  Partial<GameMapV2>, object: MapObject) : MapObject 
    { 
        if (!object._name) return object
        return this.normal(object, Templates.randomColor(object._name))

    }
}
export class colorSetMutator extends Mutator {
    ctr: number = 0
    colors:Array<string> = Array()
    length: number
    constructor(colors:Array<string>){
        super()
        this.colors = colors
        this.length = colors.length
    }

    next(): string
    {
        this.ctr = this.ctr == this.length ? 0 : this.ctr
        return this.colors[this.ctr++]

    }

    mutate(map:  Partial<GameMapV2>, object: MapObject) : MapObject 
    {
        let color = Templates.named(object._name!, this.next())
        return this.normal(object, color)
    }
}
export class offsetMutator extends Mutator {
    x_offset: number
    y_offset: number
    constructor(x: number, y: number){
        super()
        this.x_offset = x
        this.y_offset = y
    }
    
    mutate(map:  Partial<GameMapV2>, object: MapObject) : MapObject 
    {
        object.offsetX = Math.floor(Math.random() * 100)
        object.offsetY = Math.floor(Math.random() * 100)
        return object

    }
 }
export class moveByMutator extends Mutator {
    step: MoveStep
    direction: MoveDirection
    active: Map<string, MoveAction> = new Map()

    constructor(direction: MoveDirection, size: number, count: number = 1){
        super()
        this.step = new MoveStep(size, count)
        this.direction = direction
        
    }

    action(object: MapObject) : MoveAction
    {   let action = this.active.get(object.id!)
        if (action !== undefined) return action 
        this.active.set(object.id!, new MoveAction(
            new MovePoint(object.x, object.y), 
            this.direction, 
            this.step.clone()
        ))
        return this.action(object)
    }

    mutate(map:  Partial<GameMapV2>, object: MapObject) : MapObject 
    {   
        if( !object.id ) return object
        if (this.action(object).done()) {
            this.active.delete(object.id)
            return object
        } 
        let point = this.action(object).move()
        object = {...object, ...point}      
        return object
    }

}

 export class moveToMutator extends Mutator {
    target_x: number
    target_y: number
    step_size: number

    constructor(x: number, y: number, steps: number = 0){
        super()
        this.target_x = x
        this.target_y = y 
        this.step_size = steps
    }

    mutate(map:  Partial<GameMapV2>, object: MapObject) : MapObject 
    {

        return object
    }
 }

 export class resetMutator extends Mutator {

    mutate(map: Partial<GameMapV2>, object: MapObject) : MapObject 
    {
        object.offsetX = 0
        object.offsetY = 0
        if (object.properties){
            if ('x' in object.properties) {object.x = object.properties['x']; delete(object.properties['x'])}
            if ('y' in object.properties){object.y = object.properties['y']; delete(object.properties['y'])}
            if ('normal' in object.properties) {object.normal = object.properties['normal']; delete(object.properties['normal'])}
        }
        return object
    }
 }
