import Frame from "./frame.js"

export default class Interaction extends Frame{
    constructor(interactables=[],duration=0,isOver=false){
        super(duration*1000)

        this.interactables = interactables
        this.duration = duration*1000
        this.isOver = isOver
    }

    async playAndClickAll(){
        for(let i of this.interactables){
            await i.clickedOn()
        }

        var time = this.duration
        return new Promise( (res)=>{
            setTimeout(res,time)
        })
    }

    async play(){
        this.makeTimerPromise()
        await this.timerPromise()
    }

    async processMouseChange(mouse){
        var clickedOn = 0
        for(let i of this.interactables){
            if(await i.isClickedOn(mouse)){
                clickedOn += 1
            }
        }
        return clickedOn
    }
}