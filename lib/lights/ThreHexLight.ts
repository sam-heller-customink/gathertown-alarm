import { Game } from "@gathertown/gather-game-client"
import { GatherList, GatherAsset, GatherObject} from '../GatherBase'

export class ThreeHexAsset extends GatherAsset {
    palette     = {green: 'rWNFj8kGfifXdFkSjnbYq', red: 'w8BXJhxPd6LjeuR7sEoZN', yellow: 'YgtTnqSUdKrsTx9Cv3ie5', purple: 'U4fPPwmAXgo_nXYvTFmPV', orange: '103siNHGmqZgRxU_M8Hpa', blue: 'XJu6euW6YjFGf6DE_j8qe'} 
    template_id = "NeonLightHexagonal3 - AAon1ubyMS1h4gUg9fcuv"
    flash_one   = this.palette.red
    flash_two   = this.palette.yellow
    baseline    = this.palette.green
}

export class ThreeHexLight extends GatherObject
{
    asset =  new ThreeHexAsset()
}

export class ThreeHexList extends GatherList
{
    asset = new ThreeHexAsset()
    build(mapId: string, gameObj: Game, currentObjId: string) : ThreeHexLight
    {
        return new ThreeHexLight(mapId, gameObj, currentObjId)
    }
}

