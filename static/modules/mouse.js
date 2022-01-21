export default class Mouse{
    constructor(location=null){
        this.location = location
    }

    move(x,y){
        this.location.x = x
        this.location.y = y
    }
}