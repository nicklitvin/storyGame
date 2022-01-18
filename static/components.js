export class Audio{
    constructor(txt){
        this.txt = txt
    }

    play(){
        return new Promise( (res)=>{
            setTimeout( ()=>{
                console.log(this.txt)
                res()                
            }, 250)
        })
    }
}


export class Interactable{
    constructor(audio){
        this.audio = audio
    }

    async clickedOn(){
        await this.audio.play()
    }
}

export class Interaction{
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

export class Scene {
    constructor(order=null,nextScene=null){
        this.order = order 
        this.nextScene = nextScene
    }

    async run(){
        for(let frame of this.order){
            await frame.play()
        } 
        return this.nextScene
    }
}

