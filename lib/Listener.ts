import { API_KEY, SPACE_ID } from "../config";
import { Game } from "@gathertown/gather-game-client";
import { List, Filter, Mutator } from ".";
import { GatherObject } from "./GatherObject";
global.WebSocket = require("isomorphic-ws");

export abstract class Listener {
    game: Game
    connection_made: boolean = false
    constructor(){
        this.game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
    }

    public connect(){
        this.game.connect(SPACE_ID); 
        this.game.subscribeToConnection(this.connected.bind(this))
    }

    public abstract connected(connected:boolean): void

}
export class LightListener extends Listener {

    list?: List
    
    public alarm(alarm: Function) : void
    {
        if (!this.connection_made) return 
        if (this.list) this.list.registerAlarm(alarm)
    }

    public filter(filters: Array<Filter>|Filter): void
    {
        if (!this.connection_made) return 
        if (!Array.isArray(filters)) filters = [filters]
        for (let f of filters){this.list!.registerFilter(filters)}
    }

    public mutator(mutators:Array<Mutator>|Mutator): void
    {
        if (!this.connection_made) return 
        if (!Array.isArray(mutators)) mutators = [mutators]
        for (let m of mutators){this.list?.registerMutator(m)}
    }
    
    
    public connected(connected:boolean): void
    {
        if (connected){
            this.connection_made = true
            this.list = new List(this.game)
            this.list.connect()        
            this.game.subscribeToEvent("mapSetObjects",   ((raw, context) => {if (context.map){this.list?.saveObjects(context.map.objects!)}}))
            this.game.subscribeToEvent("mapDeleteObject", ((raw, context) => {if (context.map){this.list?.saveObjects(context.map.objects!, true)}}))
        }
    }
}
export class MovementListener extends Listener 
{
    mover?:GatherObject
    
    public connected(connected: boolean): void {
        if (connected){
            this.connection_made = true
            this.mover =  new GatherObject(this.game)
            this.game.subscribeToEvent("mapSetObjects", this.mover?.mapSetHandler.bind(this.mover))
            this.game.subscribeToEvent("playerMoves", this.mover?.playerMoveHandler.bind(this.mover))
        }
    }
}