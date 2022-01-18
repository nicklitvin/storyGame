import express from "express"
const app = express()
const PORT = 5000

app.use(express.static("static"))
app.listen(PORT)

import * as components from "./static/components.js"
const Audio = components.Audio
const Interaction = components.Interaction
const Interactable = components.Interactable
const Scene = components.Scene

// TEST
const order = [
    new Audio("hello"),
    new Interaction(
        [new Interactable(new Audio("phone")),new Interactable(new Audio("watch"))],1
    ),
    new Audio("bye")
]

var a = new Scene(order)
a.run()

// function timeout(ms) {
//     return new Promise(resolve => 
//         setTimeout( ()=>{
//             return resolve()
//         }, ms)
//     )
// }

// async function a(){
//     for(let b=0; b<10; b++){
//         var time = Date.now()
//         await timeout(1000)
//         console.log(Date.now()-time)
//     }
// }

// a()
