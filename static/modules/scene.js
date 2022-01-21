export default class Scene {
    constructor(data){
        this.order = data.order 
        this.nextScene = data.nextScene
        this.currentFrame = null
    }

    async run(){
        for(let frame of this.order){
            this.currentFrame = frame
            await frame.play()
        } 
        // console.log("returning ", this.nextScene)
        return this.nextScene
    }

    async testRunClickAll(){
        for(let frame of this.order){
            this.currentFrame = frame
            try{await frame.playAndClickAll()}
            catch{await frame.play()}
        } 
        // console.log("returning ", this.nextScene)
        return this.nextScene
    }


}