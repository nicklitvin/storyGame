let game

function createGame(){
    game = new Game()
    game.run()
}

class Game{
    constructor(startScene=null){
        this.currentScene = startScene
    }

    run(){
        while(true){
            nextScene = this.currentScene.run()
            this.currentScene = nextScene
        }
    }
}