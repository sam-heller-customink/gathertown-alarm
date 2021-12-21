import { WireObject, MapDeleteObject, MapSetObjects } from "@gathertown/gather-game-client";
export interface WireList { [key: number]: WireObject }
export interface Intervals { itemJobInterval: Object, alertCheckInterval: Object}
export interface MapDeleteObjectsRaw{ mapDeleteObject: MapDeleteObject  }
export interface MapSetObjectsRaw {mapSetObjects: MapSetObjects}
export interface TemplateInterface { data: {[key: string]: {}}}
export interface TemplateData { [key:string]: {colors: {[key:string]: string}}}
