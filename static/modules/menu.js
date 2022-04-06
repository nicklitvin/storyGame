import Location from "./location.js"
import MenuItem from "./menuItem.js"

export default class Menu{
    constructor(globalEvents) {
        this.menuItems = [
            new MenuItem("test",true,globalEvents,"testEvent",new Location(1,1),1,1)
        ]
    }

    clickMouse(mouse) {
        for(var menuItem of this.menuItems){
            if (menuItem.isClickedOn(mouse)) {
                menuItem.clickMe()
            } 
        }
    }
}