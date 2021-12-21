import {TemplateData } from '.'
export class Templates {
    static data:TemplateData = {  
        'Neon Light (Circle)': {  colors: {  indigo: '0-8Rb8J_0GNvdAmWQautc',  opal: 'uMGrU7RzdguwhPy2Ymbgq',  alpine: 'dokURzA5f78OgpErfS_IY',  ivory: 'eoDdfjyjoAfCtmt68r9Vo',  carrot_orange: 'U0SD9Uem6x8aDD6m2RNjx',  lemon: 'y5D5JZCMovB4kqhp-Y0KR',  hot_pink: 'sYUcwU1mFfb3IfUZDGbAn'  }  },  
        'Neon Light (Vertical)': {  colors: {  indigo: 'D-rmjVPJMfGfTD_uytCSH',  opal: '8UXWGRuSBgxgoF3SWGn0F',  alpine: 'FdZLVVgD2LO-76CPdpOo5',  ivory: 'k2fSpoO-DY1oM5jyd3xgh',  carrot_orange: 'qhoAnG_acOFoPkBLcDi_r',  lemon: 'gYpi8OYxscJ_wPoTDqqCT',  hot_pink: 'IfT2LySpI3TiOk5pmr9FT'  }  },  
        'Cyberpunk Streetlamp': {  colors: {  indigo: '_1x4AjD5IINB2xYi10sz-',  opal: 'zmEKs_R0f7nJnBChYqCdh',  alpine: 'jecMZBWbhye_dQmf1dYuZ',  ivory: 'HR-Bgi3J2Eptex8wcngpF',  lemon: 'vk_ZoZ9enrvj38Hci7bD_',  hot_pink: 'FJLnl_CM0A4M8hDp9c0e2'  }  },  
        'Neon Light (Hexagonal) (3)': {  colors: {  hot_pink: 'w8BXJhxPd6LjeuR7sEoZN',  lemon: 'YgtTnqSUdKrsTx9Cv3ie5',  carrot_orange: '103siNHGmqZgRxU_M8Hpa',  ivory: 'XJu6euW6YjFGf6DE_j8qe',  opal: 'rWNFj8kGfifXdFkSjnbYq',  alpine: 'x21R8IQ71TM1b_MAKXi6g',  indigo: 'ftMOUyrbpOso7TKF1K1EV'  }  },  
        'Neon Light (Heart)': {  colors: {  indigo: 'pEDurMYS7UloO8HpwsE0F',  opal: 'XsXSU2UHsuV0BCJFQ2AcV',  alpine: 'ieNUwzpk0gSzF_4vmaHQK',  ivory: 'AZptb31WVz1J5W9dM-Oxq',  carrot_orange: 'kiZZj4tcJOEf4g1lq5DL6',  lemon: 'Y_2iwcbQ0uKxVD538-kW1',  hot_pink: 'kAkJlfsYjfstTilKgIlks'  }  }, 
        'Neon Sign (Pirate)': {  colors: {  indigo: '8Nar8DCqhBpR6cod3EKtt',  opal: 'WQV_UO4T-tTfGccTIzWgz',  alpine: 'NlopC7jLYUr4BI2N_IZCs',  ivory: 'AZKLBrZyA4D6qYxj8D4ZL',  carrot_orange: 's5e3Qj__DtgVSUQAwSi_X',  lemon: 'hk2F0UZZIILSQCeIL07l5',  hot_pink: 'JBd6Jpb-eimRsmefO6l2W'  }  }, 
        'Neon Light (Floor)': {  colors: {  indigo: 'm2Her7RtvZNjwaPQ8kgUv',  opal: 'MxvpcIzu54dr8wcWC9OUH',  alpine: 'SDTxqYl9GwajFLHzi0o0B',  ivory: 'x4kUNlkyKX9qaL3fxOGD6',  carrot_orange: 'tzsoZlPKC7mt5LVaBeJW_',  lemon: 'qnq2Ffdki2qY89H5-_Ckz',  hot_pink: 'iJgrKztSeq-fK2Gdk0whV'  }  },  
        'Neon Light (Hexagonal) (7)': {  colors: {  indigo: 'T2OsXKhK1HQ3rptUbi7Ay',  opal: 'xmtcO71mvx4OdAYoaoF2P',  alpine: 'Rq3bazWkQYdAFlys-B3X_',  ivory: 'lR4K2oRpdnXc1_oj7_zA7',  carrot_orange: 'YIuIjbHyvCVzQxjqKNb5X',  lemon: '5s3dOhHg6vOB70WiwaoFt',  hot_pink: 'UGMVDDCNNHYBXCtRaSR0y'  }  }  
    }
    names(): Array<string>
    {
        return Object.keys(Templates.data)
    } 

    static randomColor(name:string): string
    {
        let color = Object.values(this.data[name].colors)
        return color[Math.floor(Math.random()*color.length)]

    }

    static named(fixtureName: string, colorName: string) : string 
    {
        if (fixtureName in Templates.data){
            if (colorName in Templates.data[fixtureName].colors){
                return Templates.data[fixtureName].colors[colorName]
            }
            return Templates.randomColor(colorName)
        }
        return ""
    }

}
