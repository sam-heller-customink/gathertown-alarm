require('dotenv').config();
import { convertMapObjectToWireObject, Game, GameMapV2, MapObject, Move, MoveDirection, PlayerMoves, ServerClientEventContext, SpriteDirection } from "@gathertown/gather-game-client";
import { Object3D, Vector3 } from 'three'

export class GatherObject
{

    mapObj?: MapObject
    game: Game
    ball?: MovingObject
    populated: boolean = false
    constructor(game: Game){
        this.game = game
    }

    mapSetHandler(raw: Object, context: ServerClientEventContext)
    {   
        if (this.ball == undefined ){
            let soccerId = String(process.env.SOCCER_OBJECT_ID)
            let ballObj = Object.values(context.map!.objects!).find((v) => v.id?.includes(soccerId))
            if (ballObj){
                this.ball = new MovingObject(ballObj, this.game) 
                this.populated = true
            }

        }
    }

    playerMoveHandler(raw: any, context: ServerClientEventContext) 
    {
        if (this.populated && this.ball != undefined){
            let move = Coordinates.fromPlayerMoves(raw.playerMoves)
            if (this.ball.moveTo.farFrom(move, 'x', 2)){
                switch (move.direction!){
                    case MoveDirection.Left : this.ball.moveTo.by("x", -1); break;
                    case MoveDirection.Right: this.ball.moveTo.by("x", 1 ); break
                    default: break;
                }            
            }
            
            if (this.ball.moveTo.farFrom(move, 'y', 2))     {
                switch (move.direction!){
                    case MoveDirection.Up  : this.ball.moveTo.by("y", -1); break;
                    case MoveDirection.Down : this.ball.moveTo.by("y", 1); break; 
                    default: break
                }
            }
            this.ball.move()    
        }

    }
}

class Coordinates {
    x: number = 0
    y: number = 0
    direction?: MoveDirection
    constructor(x:number, y:number){
        this.x = x
        this.y = y
    }

    by(key: "x"|"y", val: number) : void
    {
        this[key] = val
    }

    ne(point: Coordinates){
        return this.x != point.x && this.y != point.y
    }

    farFrom(point:Coordinates, plane: "x"|"y", testNumber: number): boolean 
    {
        return Math.abs(point[plane] - this[plane]) >= testNumber
    }

    bounds(direction: "up"|"down", bounds: Coordinates, plane: "x"|"y") : void
    {
        if (direction == "up"){if(this[plane] >= bounds[plane]){this[plane] = bounds[plane] - 1}} 
        else {if(this[plane] <= bounds[plane]){this[plane] = bounds[plane] + 1}}
        if (this[plane] <= 0) { this[plane] = 10}
    }

    
    static fromPlayerMoves(moves: PlayerMoves) : Coordinates
    {
        let point = new Coordinates(moves.x!, moves.y!)
        if ([SpriteDirection.Left, SpriteDirection.LeftAlt].includes(moves.direction!)) point.direction = MoveDirection.Left
        if ([SpriteDirection.Right, SpriteDirection.RightAlt].includes(moves.direction!)) point.direction = MoveDirection.Right
        if ([SpriteDirection.Up, SpriteDirection.UpAlt].includes(moves.direction!)) point.direction = MoveDirection.Up
        if ([SpriteDirection.Down, SpriteDirection.DownAlt].includes(moves.direction!)) point.direction = MoveDirection.Down
        return point
    }
    

}


class MovingObject {
    object: MapObject
    game: Game
    map: Partial<GameMapV2>
    // currently: Coordinates
    bounds: Coordinates
    moveTo: Coordinates
    constructor(object: MapObject, game: Game){
        this.object = object
        this.game = game
        this.map = game.partialMaps[String(process.env.MAP_ID)]
        this.bounds = new Coordinates(this.map.dimensions![0], this.map.dimensions![1])
        this.moveTo = new Coordinates(this.object.x,this.object.y)
        // this.currently = new Coordinates(this.object.x, this.objecty)
    }

    move(): void
    {
        this.moveTo.bounds("up", this.bounds, "x")
        this.moveTo.bounds("up", this.bounds, "y")
        if (this.moveTo.ne(new Coordinates(this.object.x, this.object.y))){
            this.object.x = this.moveTo.x
            this.object.y = this.moveTo.y
            this.send()
        }
    }

    send() : void 
    {
        let objects = {0: convertMapObjectToWireObject(this.object!)}
        console.log("Updating", objects)
        this.game.engine.sendAction({
            $case: "mapSetObjects",
            mapSetObjects: {
                mapId: String(process.env.MAP_ID),
                objects
            }
        })
    }

}