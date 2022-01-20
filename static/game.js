import { storage } from "./modules/storage.js"

export default class Game{
    constructor(){
        this.currentScene = storage.defaultScene
    }

    async run(){
        var nextScene = await this.currentScene.run()
        this.currentScene = nextScene
        // while(true){
        //     nextScene = this.currentScene.run()
        //     this.currentScene = nextScene
        // }
    }
}