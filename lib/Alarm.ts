export class Alarm {
    // Let's be ☀️☀️☀️☀️optimistic☀️☀️☀️☀️
    state = false

    /**
     * This is what you want to modify or override in a child 
     * class to have the alarm actually operate on something. 
     * currently it just swaps states every time it's checked
     */
    check() : void
    {
        this.state = this.state ? this.clear() : this.trip()
    }

    //Everything from here on is CRUD. Well, RU really, but whatever
    active() : boolean
    {
        return this.state
    }

    clear() : boolean 
    {
        return this.state = false
    }

    trip() : boolean 
    {
        return this.state = true   
    }
}