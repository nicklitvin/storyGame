import Location from "./location.js"

export default class MenuItem{
    constructor(text=null,isClickable=false,globalEvents=null,affectedEvent=null,
        location = new Location(),width=0,height=0)
    {
        this.text = text
        this.location = location
        this.isClickable = isClickable
        this.globalEvents = globalEvents
        this.affectedEvent = affectedEvent
        this.width = width
        this.height = height
    }

    isClickedOn(mouse){
        if(
            mouse.location.x >= this.location-this.width/2 &&
            mouse.location.x <= this.location+this.width/2 &&
            mouse.location.y >= this.location-this.height/2 &&
            mouse.location.y <= this.location+this.height/2
        )
        {
            return true
        }
    }

    clickMe(){
        if(this.isClickable){
            const state = this.globalEvents[affectedEvent]
            if(state){
                this.globalEvents[affectedEvent] = false
            }
            else{
                this.globalEvents[affectedEvent] = true
            }
        }
    }
}