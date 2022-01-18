export default class Scene {
    constructor(data){
        this.order = data.order 
        this.nextScene = data.nextScene
    }

    async run(){
        console.log(this.order)
        for(let frame of this.order){
            await frame.play()
        } 
        return this.nextScene
    }
}