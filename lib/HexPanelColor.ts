/**
 * Sloppy way to save URLs for the different color image sprites of the panels, edit
 * the values of safe, alarm_one, and alarm_two to use different colors
 */
export class HexPanelColor {
    static url       = 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/'
    static palette   = {green: 'rWNFj8kGfifXdFkSjnbYq', red: 'w8BXJhxPd6LjeuR7sEoZN', yellow: 'YgtTnqSUdKrsTx9Cv3ie5', purple: 'U4fPPwmAXgo_nXYvTFmPV', orange: '103siNHGmqZgRxU_M8Hpa', blue: 'XJu6euW6YjFGf6DE_j8qe'} 
    static safe      = HexPanelColor.url + HexPanelColor.palette.green
    static alarm_one = HexPanelColor.url + HexPanelColor.palette.red
    static alarm_two = HexPanelColor.url + HexPanelColor.palette.yellow
}
