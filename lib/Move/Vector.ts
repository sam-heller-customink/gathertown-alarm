import { MoveDirection } from "@gathertown/gather-game-client"
import { MovePoint } from "./Point"
import { MoveStep } from "./Step"

export class MoveVector {
    point: MovePoint
    operator: "add" | "subtract"
    plane: "x" | "y"
    direction: MoveDirection
    constructor(point: MovePoint, direction: MoveDirection){
        this.point = point
        this.direction = direction
        this.operator = [MoveDirection.Right, MoveDirection.Up].includes(this.direction) ? "add" : "subtract"
        this.plane  = [MoveDirection.Right, MoveDirection.Left].includes(this.direction) ? "x" : "y"
    }
 
    move(step: MoveStep) : MovePoint
    {
        this.point[this.plane] = step.move(this.point[this.plane], this.operator)
        return this.point
    }
 }