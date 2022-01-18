export default class Interaction{
    constructor(interactables=[],duration=0,isOver=false){
        this.interactables = interactables
        this.duration = duration
        this.isOver = isOver
    }

    async play(){
        for(let i of this.interactables){
            await i.clickedOn()
        }

        var time = this.duration
        return new Promise( (res)=>{
            setTimeout(res,time)
        })
    }   
}