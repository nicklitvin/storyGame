export default class Interactable{
    constructor(audio,location=null,radius=1){
        this.audio = audio
        this.location = location
        this.radius = radius
    }

    async clickedOn(){
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