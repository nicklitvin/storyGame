import express from "express"
import Game from "./static/game.js"

const app = express()
const PORT = 5000

app.use(express.static("static"))
app.listen(PORT)

const mygame = new Game()
mygame.run()


// import * as components from "./static/components.js"
// const Audio = components.Audio
// const Interaction = components.Interaction
// const Interactable = components.Interactable
// const Scene = components.Scene

// // TEST
// const order = [
//     new Audio("hello"),
//     new Interaction(
//         [new Interactable(new Audio("phone")),new Interactable(new Audio("watch"))],1
//     ),
//     new Audio("bye")
// ]

// var a = new Scene(order)
// a.run()
