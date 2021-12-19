import { Game } from "@gathertown/gather-game-client"
import { GatherList, GatherAsset, GatherObject} from '../GatherBase'

export class StreetLampAsset extends GatherAsset {
    palette = {blue: "nTOZDPKjZ7IgHBiZRpJaf", green: "zmEKs_R0f7nJnBChYqCdh", lime: "jecMZBWbhye_dQmf1dYuZ", white: "HR-Bgi3J2Eptex8wcngpF", purple: "_1x4AjD5IINB2xYi10sz-", yellow: "vk_ZoZ9enrvj38Hci7bD_", red: "FJLnl_CM0A4M8hDp9c0e2"}
    template_id = "CyberpunkStreetlamp - LmutEwgwsNaHlp88ZQcUj"
    flash_one = this.palette.purple
    flash_two = this.palette.lime
    baseline  = this.palette.white
}

export class StreetLampFixture extends GatherObject 
{
    asset = new StreetLampAsset()
}

export class StreetLampList extends GatherList 
{
    asset = new StreetLampAsset()
    build(mapId: string, gameObj: Game, currentObjId: string) : StreetLampFixture
    {
        return new StreetLampFixture(mapId, gameObj, currentObjId)
    }
}