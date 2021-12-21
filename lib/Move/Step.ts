
export class MoveStep {
    count: number
    current: number = 0
    size: number
 
    constructor(count: number, size: number)
    {
        this.count = count
        this.size = size
    }
 
    clone(): MoveStep
    {
        return new MoveStep(this.count, this.size)
    }
 
    done() : boolean
    {
        return this.current++ >= this.count
    }
 
    move(start:number, operator: "add"|"subtract") : number
    {
        if (this.done()) return 0
        return operator == "add" ?   start + this.size :  start - this.size
    }
 }