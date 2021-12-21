import { WireObject, MapObject } from "@gathertown/gather-game-client";
export * from './Alarm'
export * from './List'
export * from './Templates'
export * from './Listener'
export * from './Filters'
export * from './Mutators'
export interface WireList { [key: number]: WireObject }
export interface ObjectList { [key: number]: MapObject}
export interface Intervals { [key: string]: ReturnType<typeof setInterval>}
export interface TemplateInterface { data: {[key: string]: {}}}
export interface TemplateData { [key:string]: {colors: {[key:string]: string}}}
