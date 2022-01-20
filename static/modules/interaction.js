export default class Interaction{
    constructor(interactables=[],duration=0,isOver=false){
        this.interactables = interactables
        this.duration = duration
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
        var time = this.duration
        return new Promise( (res)=>{
            setTimeout(res,time)
        })
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