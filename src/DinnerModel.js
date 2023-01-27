/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import { searchDishes,getDishDetails } from "./dishSource.js";
import ResolvePromise from "./resolvePromise.js";

/* Model is called observable. Meaning it is the one notifying. The views are called observers*/ 

class DinnerModel{
    constructor(nrGuests=2, dishArray=[]) {
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState= {};
        this.searchParams= {};
        this.currentDishPromiseState= {};
    }
    setNumberOfGuests(nr){
        if(this.numberOfGuests === nr) {
            return;
        }

        if(nr < 1|| Number.isInteger(nr) == false){
            throw 'number of guests not a positive integer';
        }
        
        else{
            this.numberOfGuests = nr;
        }
        
        this.notifyObservers({setNumber: nr});

    }
    addToMenu(dishToAdd){
    
        function dishCheckerCB(dish) {
            return dish.id === dishToAdd.id;
        }
        if(this.dishes.filter(dishCheckerCB).length > 0) { 
            return;
        }                                           
        this.dishes= [...this.dishes, dishToAdd]; 
        //addDish is a payload. Payload shows what has happend i.e we added a dish.
        this.notifyObservers({addDish: dishToAdd});
    }
    
    removeFromMenu(dishToRemove){

        function dishCheckerRemoveCB(dish) {
            return dish.id === dishToRemove.id;
        }

        if(this.dishes.filter(dishCheckerRemoveCB).length <= 0) {
            return;
        }

        function hasSameIdCB(dish){
            if(dish.id != dishToRemove.id){
                return true;
            }   
        }
        
        this.dishes= this.dishes.filter(hasSameIdCB);
        this.notifyObservers({removeDish: dishToRemove});
        
    }


    
    setCurrentDish(id){
        function notifyACB() {
            this.notifyObservers();
        }

        if(id!==undefined && this.currentDish !== id){
            if(this.currentDish === id) {
                return;
            }

            this.currentDish = id;
            ResolvePromise(getDishDetails(this.currentDish),this.currentDishPromiseState,notifyACB.bind(this));
            this.notifyObservers({setDish: id}); 
        }
    }
    
    setSearchQuery(q){
    this.searchParams.query = q
    }

    setSearchType(t){
    this.searchParams.type = t
    }

   
//This wil resolve our promise and then send back our data. This will also send a notification.
//We need to bind the notifyACB with this. Gives us when our promise was resolved.
    doSearch(queryAndType){
        function notifyACB() {
            //Notifying all the observers in the model
            this.notifyObservers();
        }

        this.searchParams = queryAndType;
        ResolvePromise(searchDishes(this.searchParams),this.searchResultsPromiseState,notifyACB.bind(this));
    }

    

    addObserver(observerACB) { 
        this.observers = [...this.observers, observerACB]; //Lägger till observer i arrayen
    }

    //if the parameter is the same as the ACB then we will remove it
    removeObserver(observerACB) {
        function isObserver() { 
            if(!observerACB) {
                return true;
            }
        }
        this.observers = this.observers.filter(isObserver); //Raderar observerACB från arrayen
    }

    //We will call this notify when something happens in the model with payload as argument.
    notifyObservers(payload) {
        //Goes through each of these functions using forEach. Get a function obs then call it beacause you want to call all the functions in obs
       
        function invokeObserverCB(obs) {
                obs(payload);
        } 

    //if when of the obervers fail, then we continue to the next one
        try {
           this.observers.forEach(invokeObserverCB); 
        } catch(err) {
            console.error(err);
        }
    }
    
}



export default DinnerModel;