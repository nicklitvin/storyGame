import Mouse from "./modules/mouse.js"
import {storage} from "./modules/storage.js"

export default class Game{
    constructor(scene=storage.default){
        this.currentScene = scene
        this.mouse = new Mouse()
        this.paused = false
    }

    async run(){
        var nextScene = await this.currentScene.run(this.mouse)
        this.currentScene = storage[nextScene]
    }

    async testRunClickAll(){
        var nextScene = await this.currentScene.testRunClickAll()
        this.currentScene = storage[nextScene]
    }

    testRunWithoutWaiting(){
        this.currentScene.run()
    }

    async processMouseChange(){
        try{
            if(!this.paused){
                const clickedOn = await this.currentScene.currentFrame.processMouseChange(this.mouse)
                return clickedOn
            }
        }
        catch{
            return 0
        }
    } 

    moveMouse(x,y){
        this.mouse.move(x,y)
    }

    pause(){
        try{
            this.currentScene.pause()
            this.paused = true
        }
        catch{
            console.log("Current scene cant be paused")
        }
    }
    
    async resume(){
        try{
            this.paused = false
            var nextScene = await this.currentScene.resume()
            this.currentScene = storage[nextScene]
            // call run to repeat
        }
        catch{
            console.log("Current scene cant be resumed")
        }
    }
}