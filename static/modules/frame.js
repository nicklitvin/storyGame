export default class Frame{
    constructor(duration){
        this.startTime = null
        this.timeLeft = duration
        this.timerPromise = null
        this.timerTimeout = null
        this.complete = false
    }

    makeTimerPromise(){
        this.startTime = Date.now()
        this.timerPromise = () =>{
            return new Promise( (res)=>{
                this.timerTimeout = 
                    setTimeout( ()=>{
                        this.complete = true
                        res()
                    }, this.timeLeft)
            })
        }
    }

    pause(){
        this.timeLeft -= Date.now() - this.startTime
        clearTimeout(this.timerTimeout)
        this.timerPromise = null
    }
}