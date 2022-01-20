import express from "express"
import Game from "./static/game.js"

const app = express()
const PORT = 5000

app.use(express.static("static"))
app.listen(PORT)

const mygame = new Game()
mygame.run()
