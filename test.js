import Mouse from "./static/modules/mouse.js"
import Interactable from "./static/modules/interactable.js"
import Audio from "./static/modules/audio.js"
import Location from "./static/modules/location.js"
import { strict as assert } from "assert"
import Game from "./static/game.js"
import { BoundaryTest, KeyPoint} from "./static/modules/boundaryTest.js"
import Interaction from "./static/modules/interaction.js"

class TestGame{
    constructor(){
        this.split = "----------------------------"
    }

    async testClick(){
        const myMouse1 = new Mouse(new Location(0,0.5))
        const myMouse2 = new Mouse(new Location(4,1.2))
        const myInter = new Interactable(new Audio("TEST CLICK 1/1"),new Location(0,0),1)
        
        const click1 = myInter.isClickedOn(myMouse1)
        if(click1){await myInter.clickMe()}
        const click2 = myInter.isClickedOn(myMouse2)
        
        assert(click1 == true, "should be clicked")
        assert(click2 == false, "should not be clicked")
    }

    async testGameSceneReturn(){
        const testScene = "testDefault"
        const expectedScene = "testDefaultDestination"
        const myGame = new Game(testScene)
        await myGame.runAndClickAll()

        assert(myGame.currentScene.order == myGame.gameScenes.getScene(expectedScene).order,
            "should be next scene (same order)")
    }

    async testInteractableClick(){
        const testScene = "testClick"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(new Location(4,4.2))
        myGame.run()

        const clicked = await myGame.clickMouse()
        assert(clicked == 1, "should be clicked")
        
        return new Promise( (res)=>{
            setTimeout(res,500)
        })
    }

    async testSceneAndFrameTransition(){
        const testScene = "testTransition"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(new Location(4,4.2))
        await myGame.run()

        myGame.run()
        const beforeClick = await myGame.clickMouse()
        assert(beforeClick == 0, "should not be pressed during audio")
        assert(myGame.currentScene.currentFrame instanceof Audio,"should be Audio Frame")
        await new Promise( (res)=>setTimeout(res,350))

        assert(myGame.currentScene.currentFrame instanceof Interaction,
            "should be Interaction Frame")
        const afterClick = await myGame.clickMouse()
        assert(afterClick == 1, "should be clicked during Interaction")

        return new Promise( (res)=>{
            setTimeout(res,500)
        })
    }

    async testMouseMove(){
        const testScene = "testClick"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(new Location(0,0))
        myGame.run()
        
        const beforeMove = await myGame.clickMouse()
        assert(beforeMove == 0, "should miss target")
        
        myGame.moveMouse(4,4.1)
        const afterMove = await myGame.clickMouse()
        assert(afterMove == 1, "should hit target")
        
        return new Promise( (res)=>{
            setTimeout(res,250)
        })
    }

    async testEventChange(){
        const testScene = "testEventChange"
        const expectedScene = "testDefaultDestination"
        const myGame = new Game(testScene)
        const expectedSceneOrder = myGame.gameScenes.getScene(expectedScene).order

        await myGame.runAndClickAll()
        assert(myGame.globalState.testEvent == 1, "event should change")
        assert(myGame.currentScene.order == expectedSceneOrder,
            "should have transitioned to next scene")

        myGame.globalState.testEvent = 0

        const testScene0 = "testEventChange1"
        const myGame1 = new Game(testScene0)

        await myGame1.run()
        assert(myGame.globalState.testEvent == 0, "event shouldnt change")
        assert(myGame.currentScene.order == expectedSceneOrder,
            "should have transitioned to next scene")
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
        const testScene = "testBoundary"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(new Location(0.5,0.5))

        await myGame.run()
        assert(myGame.globalState.testBoundary == 1, "mouse should always be within boundary")
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
        assert(audio.complete == false, "audio should NOT be over")

        await new Promise( (res)=>{
            setTimeout( async ()=>{
                await audio.play()
                res()
            }, 50)
        })
        assert(audio.complete == true, "audio should be over")
    }

    async testPausingAudioInGame(){
        const testScene = "testPausingAudio"
        const expectedScene = "testDefaultDestination"
        const myGame = new Game(testScene)
        myGame.run()

        await new Promise( (res)=>{
            setTimeout( ()=>{
                myGame.pause()
                res()
            }, 50)
        })

        assert(myGame.globalState.paused == true, "game should be paused")

        await new Promise( async (res)=>{
            await myGame.resume()
            res()
        })
        assert(myGame.globalState.paused == false, "game should be unpaused")
        assert(myGame.currentScene.order == myGame.gameScenes.getScene(expectedScene).order,
            "should be next scene")
    }

    async testInteractionPausing(){
        const testScene = "testPausingInteraction"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(10,0.1)
        myGame.run()

        await new Promise( (res)=>{
            setTimeout( ()=>{
                myGame.pause()
                res()
            }, 150)
        })
        assert(myGame.globalState.testPause == 0, "should not be pressed")
        assert(myGame.globalState.paused == true, "should be paused")
        
        const timeLeft = myGame.currentScene.currentFrame.timeLeft

        await new Promise( async (res)=>{
            myGame.mouse.location = new Location(0.1,0)
            await myGame.clickMouse()
            res()
        })
        assert(myGame.globalState.testPause == 0, "should not be pressed during pause")
        assert(myGame.globalState.paused == true, "should be paused")
        assert(myGame.currentScene.currentFrame.timeLeft == timeLeft, "should be same timeLeft")

        await new Promise( (res)=>{
            myGame.resume()
            res()
        })

        const expectedSceneOrder = myGame.gameScenes.getScene("testDefaultDestination").order

        assert(myGame.globalState.paused == false, "should be unpaused")
        assert(myGame.currentScene.order != expectedSceneOrder, "should not be next scene")

        await new Promise( async (res)=>{
            myGame.mouse.location = new Location(0.1,0)
            await myGame.clickMouse()
            res()
        })

        assert(myGame.globalState.testPause == 1, "should be pressed")
        assert(myGame.currentScene.order == expectedSceneOrder, "should be next scene")
    }

    // start playing, pause, click, change global variable
    async testMenuClick() {
        const testScene = "testMenuClick"
        const myGame = new Game(testScene)
        myGame.mouse = new Mouse(new Location(1,1.1))
        myGame.run()

        await myGame.clickMouse()
        assert(myGame.globalState.testEvent == 0, "should not be pressed")

        await new Promise( (res)=>{
            setTimeout( ()=>{
                myGame.pause()
                res()
            }, 150)
        })

        assert(myGame.globalState.paused == true, "should be paused")
        await myGame.clickMouse()
        assert(myGame.globalState.testEvent == 1, "should be pressed")
        await myGame.resume()
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
                this.testPausingAudioInGame,
                this.testInteractionPausing,
                this.testMenuClick
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
