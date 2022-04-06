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
        const con0 = mouse.location.x >= this.location.x - this.width/2
        const con1 = mouse.location.x <= this.location.x + this.width/2
        const con2 = mouse.location.y >= this.location.y - this.height/2
        const con3 = mouse.location.y <= this.location.y + this.height/2

        if(con0 && con1 && con2 && con3){
            return true
        }
    }

    clickMe(){
        if(this.isClickable){
            const state = this.globalEvents[this.affectedEvent]
            if(state){
                this.globalEvents[this.affectedEvent] = false
            }
            else{
                this.globalEvents[this.affectedEvent] = true
            }
        }
    }
}