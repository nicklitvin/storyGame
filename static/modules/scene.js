export default class Scene {
    constructor(data){
        this.order = data.order 
        this.nextScene = data.nextScene
        this.currentFrame = null
    }

    updateNextScene(){
        try{
            return this.nextScene.decide()
        }
        catch{
            return this.nextScene
        }  
    }

    async run(mouse=null){
        for(let frame of this.order){
            this.currentFrame = frame
            await frame.play(mouse)
        } 
            
        return this.updateNextScene()
    }

    async testRunClickAll(){
        for(let frame of this.order){
            this.currentFrame = frame
            try{await frame.playAndClickAll()}
            catch{await frame.play()}
        } 
        return this.updateNextScene()
    }
}