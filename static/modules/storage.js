import Audio from "./audio.js"
import Scene from "./scene.js"
import Interactable from "./interactable.js"
import Interaction from "./interaction.js"
import Location from "./location.js"
import SceneDeterminant from "./sceneDeterminant.js"

export const events = {
    testEvent: 0
}

const testSceneData = {
    testDefault: {
        order: [
            new Audio("TEST DEFAULT 1/4"),
            new Interaction(
                [
                    new Interactable(new Audio("TEST DEFAULT 2/4")),
                    new Interactable(new Audio("TEST DEFAULT 3/4"))
                ],1),
            new Audio("TEST DEFAULT 4/4")
        ],
        nextScene: "nextDefaultScene"
    },
    testClick: {
        order: [
            new Interaction(
                [
                    new Interactable(new Audio("TEST CLICK 1/2"), new Location(4,4),2),
                    new Interactable(new Audio("ERROR: SHOULDN'T BE PLAYED"), new Location(41.5,4),1)
                ],1),
            new Audio("TEST CLICK 2/2")
        ],
        nextScene: "test2"
    },
    testTransition:{
        order: [
            new Interaction(
                [
                    new Interactable(new Audio("ERROR: SHOULDN'T BE CLICKED"), new Location(4,4),2),
                ],1),
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
                ],1)
        ],
        nextScene: "nextDefaultScene"
    },
    testEventChange: {
        order: [
            new Interaction(
                [new Interactable(new Audio("TEST EVENT 1/1"), new Location(0,0),2,events,"testEvent")]
                ,1
            )
        ],
        nextScene: new SceneDeterminant(events,"testEvent",["testEventChange2","testEventChange1"]) 
    },
    testEventChangeExtra: {
        order: [
            new Interaction(
                [new Interactable(new Audio("ERROR"), new Location(0,0),2,events,"testEvent")]
                ,1
            )
        ],
        nextScene: new SceneDeterminant(events,"testEvent",["testEventChange2","testEventChange1"]) 
    },
    testEventChange1: {
        order: [
            new Audio("ERROR")
        ],
        nextScene: "nextDefaultScene"
    },
    testEventChange2: {
        order: [
            new Audio("ERROR")
        ],
        nextScene: "nextDefaultScene"
    }
}

const sceneData = {
    default: {
        order: [
            new Audio("GAMING 1/1")
        ],
        nextScene: "scene2"
    }
}

export const storage = {
    testDefaultScene: new Scene(testSceneData.testDefault),
    testClick: new Scene(testSceneData.testClick),
    testTransition: new Scene(testSceneData.testTransition),
    testTransition1: new Scene(testSceneData.testTransition1),
    testEventChange: new Scene(testSceneData.testEventChange),
    testEventChangeExtra: new Scene(testSceneData.testEventChangeExtra),
    testEventChange1: new Scene(testSceneData.testEventChange1),
    testEventChange2: new Scene(testSceneData.testEventChange2),

    default: new Scene(sceneData.default),
    nextDefaultScene: "nextDefaultScene"
}

