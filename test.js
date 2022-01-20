import Mouse from "./static/modules/mouse.js"
import Interactable from "./static/modules/interactable.js"
import Audio from "./static/modules/audio.js"
import Location from "./static/modules/location.js"
import { strict as assert } from "assert"
import Game from "./static/game.js"
import { storage } from "./static/modules/storage.js"

class TestGame{
    constructor(){
        this.split = "----------------------------"
    }

    async testClick(){
        const myMouse1 = new Mouse(new Location(0,0.5))
        const myMouse2 = new Mouse(new Location(4,new Location(1.2)))
        const myInter = new Interactable(new Audio("TEST CLICK 1/1"),new Location(0,0),1)
        
        const click1 = await myInter.isClickedOn(myMouse1)
        const click2 = await myInter.isClickedOn(myMouse2)

        assert(click1 == true, "should be clicked")
        assert(click2 == false, "should not be clicked")
    }

    async testGame(){
        const myGame = new Game(storage.testDefaultScene)
        await myGame.testRun()
        assert(myGame.currentScene == storage.testDefaultScene.nextScene, "next Scene Error")
    }

    async testInteractableClick(){
        const myGame = new Game(storage.testClick)
        myGame.mouse = new Mouse(new Location(4,4.2))
        myGame.testRunWithoutWaiting()
        const clicked = await myGame.processMouseChange()
        assert(clicked == 1, "clicked Error")
        
        // give time for audio to finish playing
        return new Promise( (res)=>{
            setTimeout(res,500)
        })
    }

    async runTests(){
        for(var test of 
            [this.testClick,this.testGame, this.testInteractableClick])
        {
            console.log(this.split)
            await test()
        }
        
        console.log(`${this.split}\nALL TESTS SUCCEEDED!\n${this.split}`)
    }
}

const mygame = new TestGame()
mygame.runTests()
