
/**
 * Basically a configuration manager for different object types that we 
 * want to hook into. All class variables except for URL should be updated
 * for the new object.
 */
export class GatherAsset {
    url  = 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/'
    template_id = ""
    palette   = {}
    flash_one: string = ""
    flash_two: string = ""
    baseline: string  = ""



    one() : string
    {
        return this.url + this.flash_one
    }

    two() : string
    {
        return this.url + this.flash_two
    }

    base() : string 
    {
        return this.url + this.baseline
    }

    template(): string 
    {   
        return this.template_id
    }
}
