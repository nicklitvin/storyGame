export default class Location{
    constructor(x=0,y=0){
        this.x = x
        this.y = y
    }

    addBy(location){
        const newX = this.x + location.x
        const newY = this.y + location.y
        return new Location(newX,newY)
    }

    subtractBy(location){
        const newX = this.x - location.x
        const newY = this.y - location.y
        return new Location(newX,newY)
    }

    dividedBy(value){
        const newX = this.x / value
        const newY = this.y / value
        return new Location(newX,newY)
    }

    multiplyBy(value){
        const newX = this.x * value
        const newY = this.y * value
        return new Location(newX,newY)
    }

    copy(){
        return new Location(this.x,this.y)
    }
}