import { storage } from "./modules/storage.js"
import { strict as assert } from "assert"

export default class Game{
    constructor(){
        this.currentScene = storage.defaultScene
    }

    async run(){
        var nextScene = await this.currentScene.run()
        assert(nextScene == storage.defaultScene.nextScene)
        // while(true){
        //     nextScene = this.currentScene.run()
        //     this.currentScene = nextScene
        // }
    }
}