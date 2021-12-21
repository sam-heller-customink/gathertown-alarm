import { MAP_ID } from "../config";
import { convertMapObjectToWireObject, Game, MapObject, ServerClientEventContext, WireObject } from "@gathertown/gather-game-client";
import {Templates, Alarm, Intervals, MapDeleteObjectsRaw, MapSetObjectsRaw, WireList } from ".";

export class List {
        game: Game
        objects: Map<string, MapObject> = new Map()
        intervals: Intervals = {itemJobInterval: {}, alertCheckInterval: {}}
        templates: Templates = new Templates()
        alarms: Array<Alarm> = Array()
        filters: Array<Function> = Array()

        constructor(game: Game)
        {
            this.game = game
            this.intervals.alertCheckInterval = setInterval(() => this.alertJob(), 100)
            //Register the first filter to only operate on objects that we have template data for
            this.registerFilter((object:MapObject) => this.templates.names.includes(object._name!))
            
        }

        public registerFilter(filter: Function) : void
        {
            this.filters.push(filter)

        }

        public registerAlarm(alarm: Alarm, frequency: number = 1000) : void 
        {
            this.alarms.push(alarm)

        }
        
        public mapDeleteObjects(raw: MapDeleteObjectsRaw , context: ServerClientEventContext) : void
        {
            if(context.map){
                this.objects = new Map() //Delete everything and start from scratch
                this.saveObjects(Object.values(context.map.objects!))
            }
        }

        public mapSetObjects(raw: MapSetObjectsRaw, context: ServerClientEventContext) : void
        {   
            if (context.map){
                console.log('mapSetObjects');
                this.saveObjects(Object.values(context.map.objects!))
            }
        }

        protected saveObjects(objects:Array<MapObject>) : void
        {
            let filtered = {...objects}
            for (let filter of this.filters){filtered = filtered.filter(filter.bind(this))}
            filtered.forEach((object) => this.objects.set(object.id!, object))
        }

        protected getWireList(updater:Function = ((o:WireObject) => {})) : WireList
        {
            let index:number = 0
            let wires:WireList = {}
            for (let obj of Array.from(this.objects.values())){
                obj = updater(obj)
                obj._tags = []
                wires[index] = convertMapObjectToWireObject(obj)
                index++;
            }
            return wires
        }

        protected sendObjects()
        {
            let objects = this.getWireList(this.swapWireObjectColor.bind(this))
            this.game.engine.sendAction({
                $case: "mapSetObjects",
                mapSetObjects: {
                    mapId: MAP_ID,
                    objects
                }
            })
        }

        protected swapWireObjectColor(object: WireObject) : WireObject
        {
            let parts = object.normal!.split('/')
            parts[parts.length - 1] = this.templates.randomColor(object._name!)
            object.normal = parts.join('/')
            return object
        }

        protected alertJob(){
            if (!this.checkAlarms()){
                this.sendObjects()
            }
        }   

        protected checkAlarms() : Boolean
        {
            for(let alarm  of this.alarms){
                if (!alarm.okay()){return false}
            }
            return true
        }


}