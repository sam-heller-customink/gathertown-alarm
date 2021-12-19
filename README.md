# ![Hex Panel](https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/rWNFj8kGfifXdFkSjnbYq)  gathertown alarms ![Hex Panel](https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/w8BXJhxPd6LjeuR7sEoZN) 


Experiment with the [gathertown](https://user-images.githubusercontent.com/93146809/146673338-7ccb8044-bbd4-4e10-ae2d-f06b0f0317ab.png) [websockets API](https://user-images.githubusercontent.com/93146809/146673336-6196731e-099c-497c-9fc6-6ea4ba74b34a.png), which is under heavy development at the moment so this is probably already deprecated. 

 
Currently this is wired up to strobe all of the 3 Panel Hexagon lights in a given space when an alarm condition is met.  This is the template ID of the object (currently `NeonLightHexagonal3 - AAon1ubyMS1h4gUg9fcuv`) which is set in `lib/HexPanel.ts` and the location of the image asset, which is managed by the Color class in `lib/HexPanelColor.ts`. 

There aren't any real world alerts built out yet, currently the Alarm class just switches state every time it's checked, but that logic could easily be swapped out to query whatever seems worth flashing a bunch of lights about. 

### Config
Configuration for your space is controlled in config.ts, and should look something like this. 
```typescript
export const API_KEY  = "YOUR-KEY-HERE"
export const MAP_ID   = "OoOoOaAaAaAhHhH\\My-Gather-Space"
export const SPACE_ID = "room-id-from-map-editor"
```
*  Go [here](https://gather.town/apiKeys) to get an API key
*  The map ID you extract from the URL of your gathertown. So if your space is `https://gather.town/app/OoOoOaAaAaAhHhH/My-Gather-Space` the map ID will be `OoOoOaAaAaAhHhH\\My-GatherSpace`. Note that the `/` seperating the ID string from the name is replaced with `\\`
*  The Space ID is the name of the specific room, you can get it from opening up the Mapmaker page, clicking the objects button, and selecting the Rooms tab on the right-hand panel. 

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



