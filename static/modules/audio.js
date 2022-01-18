export default class Audio{
    constructor(txt){
        this.txt = txt
    }

    play(){
        return new Promise( (res)=>{
            setTimeout( ()=>{
                console.log(this.txt)
                res()                
            }, 250)
        })
    }
}