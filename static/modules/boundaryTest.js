export class KeyPoint{
    constructor(destination=null,time=null){
        this.destination = destination
        this.time = time * 1000
    }
}

export class BoundaryTest{
    constructor(location=null,keyPoints=null,radius=null,mouse=null,events=null,affectedEvent=null){
        this.location = location
        this.keyPoints = keyPoints
        this.radius = radius
        this.refreshRate = 100
        this.mouse = mouse
        this.events = events
        this.affectedEvent = affectedEvent
    }

    async runUntilFail(){
        for(let move of this.keyPoints){
            if(!await this.moveBoundary(move)){
                return false
            }
        }
        return this.isMouseWithinBoundary()
    }

    async play(mouse){
        this.mouse = mouse
        const result = await this.runUntilFail()
        if(result){
            this.events[this.affectedEvent] = 1
        }
    }

    async moveBoundary(keyPoint){
        return new Promise( (res)=>{
            const copy = this.location.copy()
            const diffTime = keyPoint.time
            const startTime = Date.now() 
            const endTime = startTime + diffTime
            const trajectory = (keyPoint.destination.subtractBy(this.location)).
                dividedBy(diffTime)
    
            var lastTime = startTime
    
            var movement = setInterval(()=>{
                const currentTime = Date.now()
                this.location = this.location.addBy(
                    trajectory.multiplyBy(currentTime - lastTime)
                )
    
                if(currentTime >= endTime){
                    this.location = copy.addBy(trajectory.multiplyBy(diffTime))
                    clearInterval(movement)
                    return res(this.isMouseWithinBoundary())
                }

                if(!this.isMouseWithinBoundary()){
                    return false
                }
    
                lastTime = currentTime
    
            },1000/this.refreshRate)
        })
    }

    isMouseWithinBoundary(){
        const distance = ((this.location.x-this.mouse.location.x)**2 +
            (this.location.y-this.mouse.location.y)**2)**0.5
        return distance <= this.radius 
    }
}