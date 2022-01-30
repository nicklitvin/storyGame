export default class Interactable{
    constructor(audio,location=null,radius=1,events=null,affectedEvent=null,requiredEvent=null){
        this.audio = audio
        this.location = location
        this.radius = radius
        this.events = events
        this.affectedEvent = affectedEvent
        this.requiredEvent = requiredEvent
    }

    async clickMe(){
        try{
            this.events[this.affectedEvent] = 1
        }
        catch{}
        await this.audio.play()
    }

    isClickedOn(mouse){
        const distance = ((mouse.location.x - this.location.x)**2 +
            (mouse.location.y - this.location.y)**2)**0.5

        if(distance - this.radius <= 0){
            return true
        }
        return false
    }
}