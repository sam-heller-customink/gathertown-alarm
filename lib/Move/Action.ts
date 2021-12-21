import { MoveDirection } from "@gathertown/gather-game-client"
import { MovePoint, MoveStep, MoveVector } from "."

export class MoveAction {
    position: MoveVector
    steps: MoveStep
    stepsCounter: number = 0
    constructor(position: MovePoint, direction: MoveDirection, steps: MoveStep){
        this.position = new MoveVector(position, direction)
        this.steps = steps
    }
 
    done(): boolean
    {
        return this.steps.done()
    }
 
    move() : MovePoint 
    {
        return this.position.move(this.steps)
    }
 }