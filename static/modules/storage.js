import Audio from "./audio.js"
import Scene from "./scene.js"
import Interactable from "./interactable.js"
import Interaction from "./interaction.js"
import Location from "./location.js"

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
        nextScene: "scene2"
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
    default: new Scene(sceneData.default)
}
