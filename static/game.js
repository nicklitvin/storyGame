import Mouse from "./modules/mouse.js"
import {storage} from "./modules/storage.js"

export default class Game{
    constructor(scene=storage.default){
        this.currentScene = scene
        this.mouse = new Mouse()
    }

    async run(){
        var nextScene = await this.currentScene.run()
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
            const clickedOn = await this.currentScene.currentFrame.processMouseChange(this.mouse)
            return clickedOn
        }
        catch{
            return 0
        }
    }

    moveMouse(x,y){
        this.mouse.move(x,y)
    }
}