import { Game } from "@gathertown/gather-game-client"
import { GatherList, GatherAsset, GatherObject} from '../GatherBase'

export class NeonCircleAsset extends GatherAsset {
    palette     = {green: 'dokURzA5f78OgpErfS_IY', lime: "uMGrU7RzdguwhPy2Ymbgq",  red: 'sYUcwU1mFfb3IfUZDGbAn', yellow: 'YgtTnqSUdKy5D5JZCMovB4kqhp-Y0KRrsTx9Cv3ie5', purple: 'U4fPPwmAXgo_nXYvTFmPV', orange: '103siNHGmqZgRxU_M8Hpa', blue: '8Rb8J_0GNvdAmWQautc'} 
    template_id = "NeonLightCircle - fQUHe3C1UWtUbqRu_SpNX"
    flash_one   = this.palette.red
    flash_two   = this.palette.yellow
    baseline    = this.palette.green
}

export class NeonCircleLight extends GatherObject
{
    asset =  new NeonCircleAsset()
}

export class NeonCircleList extends GatherList
{
    asset = new NeonCircleAsset()
    build(mapId: string, gameObj: Game, currentObjId: string) : NeonCircleLight
    {
        return new NeonCircleLight(mapId, gameObj, currentObjId)
    }
}

