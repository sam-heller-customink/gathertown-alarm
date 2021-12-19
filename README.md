# gathertown alarms ![Hex Panel Green](https://user-images.githubusercontent.com/93146809/146673338-7ccb8044-bbd4-4e10-ae2d-f06b0f0317ab.png) ![Hex Panel Red](https://user-images.githubusercontent.com/93146809/146673336-6196731e-099c-497c-9fc6-6ea4ba74b34a.png) ![Hex Panel Yellow](https://user-images.githubusercontent.com/93146809/146673547-0204dbe5-28b4-432d-9d6d-44c97f5c5f16.png) ![Hex Panel Purple](https://user-images.githubusercontent.com/93146809/146673552-c8032b21-50bc-4e6c-9c12-763ff37195d4.png) ![Hex Panel Orange](https://user-images.githubusercontent.com/93146809/146673555-473bfd1e-b765-4dfc-954f-8b749214d02e.png) ![Hex Panel Blue](https://user-images.githubusercontent.com/93146809/146673558-daf36702-abd8-46f3-afc4-e660ec6c5efc.png) 




Experiment with the [gathertown](https://gather.town) [websockets API](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063), which is under heavy development at the moment so this is probably already deprecated. 

 
Currently this is wired up to strobe all of the 3 Panel Hexagon lights in a given space when an alarm condition is met.  This is the template ID of the object (currently `NeonLightHexagonal3 - AAon1ubyMS1h4gUg9fcuv`) which is set in `lib/HexPanel.ts` and the location of the image asset, which is managed by the Color class in `lib/HexPanelColor.ts`. 

There aren't any real world alerts built out yet, currently the Alarm class just switches state every time it's checked, but that logic could easily be swapped out to query whatever seems worth flashing a bunch of lights about. 

### Config
Configuration for your space is controlled in config.ts, and should look something like this. 
```typescript
export const API_KEY  = "YOUR-KEY-HERE"
export const SPACE_ID   = "OoOoOaAaAaAhHhH\\My-Gather-Space"
export const MAP_ID = "room-id-from-map-editor"
```
*  Go [here](https://gather.town/apiKeys) to get an API key
*  The space ID you extract from the URL of your gathertown. So if your space is `https://gather.town/app/OoOoOaAaAaAhHhH/My-Gather-Space` the map ID will be `OoOoOaAaAaAhHhH\\My-GatherSpace`. Note that the `/` seperating the ID string from the name is replaced with `\\`
*  The Map ID is the name of the specific room, you can get it from opening up the Mapmaker page, clicking the objects button, and selecting the Rooms tab on the right-hand panel. 

Once that's set, make sure to add some of the lights named "Neon Lights (Hexagonal)(3)" in the object picker, save your map, and run it with

```bash
npm run start
```

This defaults to flashing yellow and red during an alert, and resetting to green when alls well. If you want to change the colors, check what's available in `HexPanelColor.palette` and swap out the values for `alarm_one`, `alarm_two` and `safe` in `lib/HexPanel.ts`

If you want to flash a small number or single light, you can do it directly instead of in bulk by passing an alarm object to the creation of a single panel by passing it the specific object from the `game.partialMaps[MAP_ID].objects` list. 

```typescript
let alarm_light_id = 'NeonLightHexagonal3 - AAon1ubyMS1h4gUg9fcuv_<GET-THIS-PART-FROM-MAP-JSON>'
game.subscribeToConnection((connected) => {
    const connectInterval = setInterval(() => {
        if (connected){
            for(let obj of game.partialMaps[MAP_ID].objects){
                if (obj.id == alarm_light_id){
                    new HexPanelList(MAP_ID, game, alarm)
                }
            }
            setInterval(() => {alarm.check()}, 10000)
            clearInterval(connectInterval)
        }
    },5000)        
})
```

You can get the id from the maps json, which you can pull up in your browser at `https://gather.town/api/getMap?apiKey=YOUR-KEY-HERE&mapId=room-id-from-map-editor&spaceId=OoOoOaAaAaAhHhH\My-Gather-Space`. Note that the `\\` from the config.ts is a single `\` in the URL.

**Pro-Tip**: Grab a copy of your map json to restore your space from so you don't end up blowing away your existing space, recreating it from memory, and explaining to your co-workers why all their desk decorations disappeared over the weekend. 



