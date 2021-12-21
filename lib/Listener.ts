import { API_KEY, SPACE_ID } from "../config";
import { Game } from "@gathertown/gather-game-client";
import { List, FilterLibrary, MutatorLibrary } from ".";
global.WebSocket = require("isomorphic-ws");

export class Listener {
    game: Game
    list: List
    filterLibrary: FilterLibrary = new FilterLibrary()
    mutatorLibrary: MutatorLibrary = new MutatorLibrary()
    constructor(){
        this.game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
        this.list = new List(this.game)
    }

    public connect(){
        this.game.connect(SPACE_ID); 
        this.game.subscribeToConnection(this.connected.bind(this))
    }

    public alarm(alarm: Function) : void
    {
        this.list.registerAlarm(alarm)
    }

    public filter(filters: Array<string>|string): void
    {
        let loaded = []
        if (!Array.isArray(filters)) filters = [filters]
        for (let f of filters){
            loaded.push(this.filterLibrary.get(f))
        }
        this.list.registerFilter(loaded)
    }

    public mutator(mutators:Array<string>|string): void
    {
        let loaded = []
        if (!Array.isArray(mutators)) mutators = [mutators]
        for (let m of mutators){
            loaded.push(this.mutatorLibrary.get(m))
        }
        this.list.registerMutator(loaded)
    }

    private connected(connected:boolean): void
    {
        this.list.connect()
        this.game.subscribeToEvent("mapSetObjects",   ((raw, context) => {if (context.map){this.list.saveObjects(context.map.objects!)}}))
        this.game.subscribeToEvent("mapDeleteObject", ((raw, context) => {if (context.map){this.list.saveObjects(context.map.objects!, true)}}))

    }
}