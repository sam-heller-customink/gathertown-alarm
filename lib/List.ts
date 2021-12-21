require('dotenv').config();
import { convertMapObjectToWireObject, Game, MapObject } from "@gathertown/gather-game-client";
import {Templates, Intervals, WireList, ObjectList, Mutator, Filter } from ".";
export class List {
    public game: Game
    public mapId: string
    public objects: Map<string, MapObject> = new Map()
    public templates: Templates = new Templates()
    private intervals: Intervals = {}
    private alarms: Array<Function> = Array()
    private filters: Array<Filter> = Array()
    private mutators: Array<Mutator> = Array()

    constructor(game: Game)
    {
        this.game = game
        this.mapId = String(process.env.MAP_ID)
    }

    public connect() : void 
    {
        this.intervals.alertCheckInterval = setInterval(() => this.alertJob(), 100)
    }

    public registerFilter(filter: Filter|Array<Filter>) : void
    {
        if (!Array.isArray(filter)) filter = new Array(filter)
        this.filters = this.filters.concat(filter)

    } 

    public registerAlarm(alarm: Function) : void 
    {
        this.alarms.push(alarm)

    }

    public registerMutator(mutator: Mutator|Array<Mutator>) : void
    {
        if (!Array.isArray(mutator)) mutator = [mutator]
        this.mutators = this.mutators.concat(mutator)
    }

    public saveObjects(objects:ObjectList, deleteExisting:boolean = false) : void
    {
        if (this.mapId in this.game.partialMaps){
            let objectsArray = Array.from(Object.values(objects))
            if (deleteExisting) this.objects = new Map()
            for (let filter of this.filters){
                objectsArray = objectsArray.filter((o) => {
                    return filter.filter(this.game.partialMaps[this.mapId], o)
                }, this)
            }
            objectsArray.forEach((object) => this.objects.set(object.id!, object))
        }
    }

    private mutateObjects(object: MapObject) : MapObject
    {
        
        
        if (this.mapId in this.game.partialMaps){
            let map = this.game.partialMaps[this.mapId]
            for (let mutator of this.mutators){object = mutator.mutate(map, object)}
        }
        
        return object
    }

    private getWireList() : WireList
    {
        let index:number = 0
        let wires:WireList = {}
        for (let obj of Array.from(this.objects.values())){
            obj._tags = []
            obj = this.mutateObjects(obj)
            wires[index++] = convertMapObjectToWireObject(obj)
        }
        return wires
    }

    private sendObjects() : void
    {
        let objects = this.getWireList()
        this.game.engine.sendAction({
            $case: "mapSetObjects",
            mapSetObjects: {
                mapId: String(process.env.MAP_ID),
                objects
            }
        })
    }

    private alertJob(){
        for(let alarm of this.alarms){
            if (!alarm()){
                this.sendObjects()
            }
        }
    }   



}