import Mouse from "./modules/mouse.js"
import GameSceneStorage from "./modules/gameSceneStorage.js"
import {globalState} from "./modules/globalState.js"

export default class Game{
    constructor(startScene=null){
        this.mouse = new Mouse()
        this.paused = false

        this.globalState = globalState
        this.gameScenes = new GameSceneStorage(globalState)
        this.currentScene = startScene ? this.gameScenes.getScene(startScene): this.gameScenes.getDefaultScene()
    }

    async run(){
        var nextScene = await this.currentScene.run(this.mouse)
        this.currentScene = this.gameScenes.getScene(nextScene)
    }

    async runAndClickAll(){
        var nextScene = await this.currentScene.runAndClickAll()
        this.currentScene = this.gameScenes.getScene(nextScene)
    }

    async clickMouse(){
        try{
            if(!this.globalState.paused){
                const clickedOn = await this.currentScene.currentFrame.clickMouse(this.mouse)
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
            this.globalState.paused = true
        }
        catch{
            console.log("Current scene cant be paused")
        }
    }
    
    async resume(){
        try{
            this.globalState.paused = false
            var nextScene = await this.currentScene.resume()
            this.currentScene = this.gameScenes.getScene(nextScene)
            // call run to repeat
        }
        catch{
            console.log("Current scene cant be resumed")
        }
    }
}