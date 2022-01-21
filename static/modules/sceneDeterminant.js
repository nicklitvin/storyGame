export default class SceneDeterminant{
    constructor(events=null,decider=null, choices=null){
        this.events = events
        this.decider = decider
        this.choices = choices
    }

    decide(){
        return this.choices[this.events[this.decider]]
    }
}