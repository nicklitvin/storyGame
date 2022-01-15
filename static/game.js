let game

function createGame(){
    game = new Game()
    game.run()
}

class Game{
    constructor(){}

    run(){
        console.log("starting")
    }
}