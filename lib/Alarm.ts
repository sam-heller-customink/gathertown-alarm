export class Alarm {
    public name: string
    private state: boolean = false
    private tests: Array<Function>

    constructor(name:string, tests:Array<Function>|Function, interval:number = 1000)
    {
        this.name = name
        this.tests = Array.isArray(tests) ? tests : [tests]
        setInterval(() => {this.check()},interval)
    }
    
    public okay() : boolean
    {
        return this.state
    }

    private check() : void
    {   
        for(let test of this.tests){
            if (!test()){this.trip();return;}
        }
        this.clear()
    }

    private clear() : boolean 
    {
        return this.state = true
    }

    private trip() : boolean 
    {
        return this.state = false   
    }
}