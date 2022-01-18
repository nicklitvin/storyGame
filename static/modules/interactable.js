export default class Interactable{
    constructor(audio){
        this.audio = audio
    }

    async clickedOn(){
        await this.audio.play()
    }
}