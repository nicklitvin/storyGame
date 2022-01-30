import Audio from "./audio.js"
import Scene from "./scene.js"
import Interactable from "./interactable.js"
import Interaction from "./interaction.js"
import Location from "./location.js"
import SceneDeterminant from "./sceneDeterminant.js"
import { KeyPoint, BoundaryTest } from "./boundaryTest.js"

export default class GameSceneStorage{
    constructor(globalEvents = null){
        this.globalEvents = globalEvents
        this.scenes = {
            testDefault: {
                order: [
                    new Audio("TEST DEFAULT 1/4"),
                    new Interaction(
                        [
                            new Interactable(new Audio("TEST DEFAULT 2/4")),
                            new Interactable(new Audio("TEST DEFAULT 3/4"))
                        ],0.25),
                    new Audio("TEST DEFAULT 4/4")
                ],
                nextScene: "testDefaultDestination"
            },
            testClick: {
                order: [
                    new Interaction(
                        [
                            new Interactable(new Audio("TEST CLICK 1/2"), new Location(4,4),2),
                            new Interactable(new Audio("ERROR: SHOULDN'T BE PLAYED"), new Location(41.5,4),1)
                        ],0.25),
                    new Audio("TEST CLICK 2/2")
                ],
                nextScene: "testDefaultDestination"
            },
            testTransition:{
                order: [
                    new Interaction(
                        [
                            new Interactable(new Audio("ERROR: SHOULDN'T BE CLICKED"), new Location(4,4),2),
                        ],0.25),
                    new Audio("TEST TRANSITION 1/3")
                ],
                nextScene: "testTransition1"
            },
            testTransition1: {
                order: [
                    new Audio("TEST TRANSITION 2/3"),
                    new Interaction(
                        [
                            new Interactable(new Audio("TEST TRANSITION 3/3"), new Location(4,4),2),
                        ],0.25)
                ],
                nextScene: "testDefaultDestination"
            },
            testEventChange: {
                order: [
                    new Interaction(
                        [new Interactable(new Audio("TEST EVENT 1/1"), new Location(0,0),2,this.globalEvents,"testEvent")]
                        ,0.25
                    )
                ],
                nextScene: new SceneDeterminant(this.globalEvents,"testEvent",["testEventChange2","testDefaultDestination"]) 
            },
            testEventChange1: {
                order: [
                    new Interaction(
                        [new Interactable(new Audio("ERROR"), new Location(0,0),2,this.globalEvents,"testEvent")]
                        ,0.25
                    )
                ],
                nextScene: new SceneDeterminant(this.globalEvents,"testEvent",["testDefaultDestination","testEventChange2"]) 
            },
            testEventChange2: {
                order: [
                    new Audio("ERROR1")
                ],
                nextScene: "testDefaultDestination"
            },
            testBoundary: {
                order: [
                    new Audio("TEST BOUNDARY INGAME 1/2"),
                    new BoundaryTest(
                        new Location(1,1),
                        [
                            new KeyPoint(new Location(1.1,1.1),0.2),
                            new KeyPoint(new Location(0.1,0.1),0.2),
                        ],
                        1,
                        null,
                        this.globalEvents,
                        "testBoundary"
                    ),
                    new Audio("TEST BOUNDARY INGAME 2/2"),
                ],
                nextScene: "testDefaultDestination"
            },
            testPausingAudio: {
                order: [
                    new Audio("TEST AUDIO PAUSE INGAME 1/1")
                ],
                nextScene: "testDefaultDestination"
            },
            testPausingInteraction: {
                order: [
                    new Interaction(
                        [new Interactable(
                            new Audio("TEST PAUSING INTERACTION 1/1"),
                            new Location(0,0),
                            1,
                            this.globalEvents,
                            "testPause"
                        )],
                        0.25
                    )
                ],
                nextScene: "testDefaultDestination"
            },
            testDefaultDestination: {
                order: [],
                nextScene : "default"
            },
            default: {
                order: [
                    new Audio("GAMING 1/1")
                ],
                nextScene: "scene2"
            }
        }
    }

    getScene(sceneName=null){
        if(Object.keys(this.scenes).includes(sceneName)){
            return new Scene(this.scenes[sceneName])
        }
    }

    getDefaultScene(){
        return new Scene(this.scenes.default)
    }
}