export default class Scene {
    constructor(data){
        this.order = data.order 
        this.nextScene = data.nextScene
    }

    async run(){
        for(let frame of this.order){
            await frame.play()
        } 
        // console.log("returning ", this.nextScene)
        return this.nextScene
    }
}