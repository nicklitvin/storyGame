import Mouse from "./static/modules/mouse.js"
import Interactable from "./static/modules/interactable.js"
import Audio from "./static/modules/audio.js"
import Location from "./static/modules/location.js"
import { strict as assert } from "assert"
import Game from "./static/game.js"
import { storage, events } from "./static/modules/storage.js"
import { BoundaryTest, KeyPoint} from "./static/modules/boundaryTest.js"

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

    async testGameSceneReturn(){
        const myGame = new Game(storage.testDefaultScene)
        await myGame.testRunClickAll()
        assert(myGame.currentScene == storage.nextDefaultScene, "next Scene Error")
    }

    async testInteractableClick(){
        const myGame = new Game(storage.testClick)
        myGame.mouse = new Mouse(new Location(4,4.2))
        myGame.testRunWithoutWaiting()
        const clicked = await myGame.processMouseChange()
        assert(clicked == 1, "clicked Error")
        
        return new Promise( (res)=>{
            setTimeout(res,500)
        })
    }

    async testSceneAndFrameTransition(){
        const myGame = new Game(storage.testTransition)
        myGame.mouse = new Mouse(new Location(4,4.2))
        await myGame.run()

        myGame.testRunWithoutWaiting()
        const beforeClick = await myGame.processMouseChange()
        assert(beforeClick == 0, "dont process click during audio")
        assert(myGame.currentScene.currentFrame == storage.testTransition1.currentFrame, "should be audio")
        await new Promise( (res)=>setTimeout(res,350))

        assert(myGame.currentScene.currentFrame == storage.testTransition1.currentFrame, "should be interact")
        const afterClick = await myGame.processMouseChange()
        assert(afterClick == 1, "click not registering")


        return new Promise( (res)=>{
            setTimeout(res,500)
        })
    }

    async testMouseMove(){
        const myGame = new Game(storage.testClick)
        myGame.mouse = new Mouse(new Location(0,0))
        myGame.testRunWithoutWaiting()
        
        const beforeMove = await myGame.processMouseChange()
        assert(beforeMove == 0, "should miss target")
        
        myGame.moveMouse(4,4.1)
        const afterMove = await myGame.processMouseChange()
        assert(afterMove == 1, "should hit target")
        
        return new Promise( (res)=>{
            setTimeout(res,250)
        })
    }

    async testEventChange(){
        const myGame = new Game(storage.testEventChange)
        await myGame.testRunClickAll()
        assert(events.testEvent == 1, "event should change")
        assert(myGame.currentScene === storage.testEventChange1)

        events.testEvent = 0
        const myGame1 = new Game(storage.testEventChangeExtra)
        await myGame1.run()
        assert(events.testEvent == 0, "event shouldnt change")
        assert(myGame1.currentScene === storage.testEventChange2)
    }

    async testMovingBoundary(){
        const directions = 
            [
                new KeyPoint(new Location(1,0),0.01),
                new KeyPoint(new Location(0.5,0.5),0.05)
            ]
        const myMouse = new Mouse(new Location(0.1,0.1))
        const boundaryLocation = new Location(0,0)
        const boundaryTest = new BoundaryTest(boundaryLocation,directions,1,myMouse)
        const success = await boundaryTest.runUntilFail()
        assert(success == true, "should be within boundary")
        console.log("TEST BOUNDARY1 1/1")
    }

    async testMovingBoundary1(){
        const directions = 
            [
                new KeyPoint(new Location(10,0),0.01),
            ]
        const myMouse = new Mouse(new Location(0.1,0.1))
        const boundaryLocation = new Location(0,0)
        const boundaryTest = new BoundaryTest(boundaryLocation,directions,1,myMouse)
        const success = await boundaryTest.runUntilFail()
        assert(success == false, "should not be within boundary")
        console.log("TEST BOUNDARY2 1/1")
    }

    async testBoundaryInGame(){
        const myGame = new Game(storage.testBoundary)
        myGame.mouse = new Mouse(new Location(0.5,0.5))

        await myGame.run()
        assert(events.testBoundary == 1, "mouse should be always within boundary")
    }

    async testPausingAudio(){
        const audio = new Audio("TEST AUDIO PAUSE 1/1")
        audio.play()

        await new Promise( (res)=>{
            setTimeout( ()=>{
                audio.pause()
                assert(audio.timeLeft < 250, "timeLeft should change")
                res()
            }, 50)
        })

        await new Promise( (res)=>{
            setTimeout( async ()=>{
                await audio.play()
                res()
            }, 50)
        })
        assert(audio.complete == true, "audio should be over")
    }

    async runTests(){
        for(var test of 
            [   
                this.testClick,
                this.testGameSceneReturn,
                this.testInteractableClick,
                this.testSceneAndFrameTransition,
                this.testMouseMove,
                this.testEventChange,
                this.testMovingBoundary,
                this.testMovingBoundary1,
                this.testBoundaryInGame,
                this.testPausingAudio,
            ])
        {
            console.log(this.split)
            await test()
        }
        
        console.log(`${this.split}\nALL TESTS SUCCEEDED!\n${this.split}`)
    }
}

const mygame = new TestGame()
mygame.runTests()
