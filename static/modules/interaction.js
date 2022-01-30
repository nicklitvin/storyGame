import Frame from "./frame.js"

export default class Interaction extends Frame{
    constructor(interactables=[],secDuration=0,isOver=false){
        super(secDuration*1000)

        this.interactables = interactables
        this.duration = secDuration*1000
        this.isOver = isOver
    }

    async playAndClickAll(){
        for(let i of this.interactables){
            await i.clickMe()
        }
    }

    async play(){
        this.makeTimerPromise()
        await this.timerPromise()
    }

    async clickMouse(mouse){
        var clickedOn = 0
        for(let i of this.interactables){
            if(i.isClickedOn(mouse)){
                await i.clickMe()
                clickedOn += 1
            }
        }
        return clickedOn
    }
}