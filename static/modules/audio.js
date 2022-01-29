import Frame from "./frame.js"

export default class Audio extends Frame{
    constructor(txt){
        super(250) // duration of audio
        this.txt = txt
    }

    async play(){
        this.makeTimerPromise()
        await this.timerPromise()
        console.log(this.txt)
        if(this.complete){
            return
        }
    }
}