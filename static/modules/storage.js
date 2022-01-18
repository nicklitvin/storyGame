import Audio from "./audio.js"
import Scene from "./scene.js"
import Interactable from "./interactable.js"
import Interaction from "./interaction.js"

const sceneData = {
    scene1: {
        order: [
            new Audio("hello"),
            new Interaction(
                [
                    new Interactable(new Audio("phone")),
                    new Interactable(new Audio("watch"))
                ],1),
            new Audio("bye")
        ],
        nextScene: "scene2"
    }
}

export const storage = {
    defaultScene: new Scene(sceneData.scene1)
}
