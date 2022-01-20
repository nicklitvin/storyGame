import Mouse from "./static/modules/mouse.js"
import Interactable from "./static/modules/interactable.js"
import Audio from "./static/modules/audio.js"
import Location from "./static/modules/location.js"
import { strict as assert } from "assert"
import Game from "./static/game.js"
import { storage } from "./static/modules/storage.js"

class TestGame{
    constructor(){}

    async testClick(){
        const myMouse1 = new Mouse(new Location(0,0.5))
        const myMouse2 = new Mouse(new Location(4,1.2))
        const myInter = new Interactable(new Audio("test Audio"),new Location(0,0),1)
        
        const click1 = await myInter.isClickedOn(myMouse1)
        const click2 = await myInter.isClickedOn(myMouse2)

        assert(click1 == true, "should be clicked")
        assert(click2 == false, "should not be clicked")
    }

    async testGame(){
        const myGame = new Game()
        await myGame.run()
        // console.log("my current scene",myGame.currentScene)
        assert(myGame.currentScene == storage.defaultScene.nextScene, "next Scene Error")
    }

    async runTests(){
        for(var test of 
            [this.testClick, this.testGame])
        {
            await test()
        }
        
        const split = "----------------------------"
        console.log(`${split}\nALL TESTS SUCCEEDED!\n${split}`)
    }
}

const mygame = new TestGame()
mygame.runTests()
