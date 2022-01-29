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

    async run(mouse=null,lastFrame=null){
        if(lastFrame){
            var found = false
            for(let frame of this.order){
                if(found){
                    this.currentFrame = frame
                    await frame.play()
                }
                else if(frame == lastFrame){
                    found = true
                }
            }
        }
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

    pause(){
        try{
            this.currentFrame.pause()
        }
        catch{
            console.log("cant pause")
        }
    }

    async resume(){
        try{
            await this.currentFrame.play()
            return this.run(null,this.currentFrame)
        }
        catch{
            console.log("cant resume")
        }
    }
}