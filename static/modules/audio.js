export default class Audio{
    constructor(txt){
        this.txt = txt

        this.startTime = null
        this.timeLeft = 250
        this.timerPromise = null
        this.timerTimeout = null
        this.complete = false
    }
 
    async play(){
        this.makeTimerPromise()
        await this.timerPromise()
        console.log(this.txt)
        return
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