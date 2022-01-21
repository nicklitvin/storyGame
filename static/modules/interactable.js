export default class Interactable{
    constructor(audio,location=null,radius=1,events=null,affectedEvent=null,requiredEvent=null){
        this.audio = audio
        this.location = location
        this.radius = radius
        this.events = events
        this.affectedEvent = affectedEvent
        this.requiredEvent = requiredEvent
    }

    async clickedOn(){
        try{
            this.events[this.affectedEvent] = 1
        }
        catch{}
        await this.audio.play()
    }

    async isClickedOn(mouse){
        const distance = (mouse.location.x - this.location.x)**2 + (mouse.location.y - this.location.y)**2
        // console.log(distance,mouse.location,this.location)
        if(distance - this.radius <= 0){
            await this.clickedOn()
            return true
        }
        return false
    }
}