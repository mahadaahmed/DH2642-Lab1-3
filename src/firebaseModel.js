// Add relevant imports here 
import firebaseConfig from "/src/firebaseConfig.js";
import {getDishDetails} from "./dishSource.js"
import DinnerModel from "./DinnerModel";


/* This file will update our firebase with the relavant data.
    Before the implementation of firebase, all data history would
    not be saved after refereshing. But doing this will keep our data 
    stored and not disapear.....*/


// Initialise firebase
firebase.initializeApp(firebaseConfig); 
const REF="dinnerModel52";
// firebase.database(ref(REF+"/test").set("dummy");
// firebase.database().ref(REF+"/test").set(null);

/* This function console logs our payload.  */
function observerRecap(model) {

    function logPayloadsObserverACB(payload){
        console.log(payload);
    }

    model.addObserver(logPayloadsObserverACB);
}


/* To avoid the user seeing dishes popping up one by one, we want to resolve a promise before we load the app. 
We call it “big promise” because it should only resolve when all dishes have been retrieved (all dish details promises have resolved) based on their IDs from Firebase.
*/
function firebaseModelPromise() {
    
    function aBigPromiseACB(firebaseData) {        
           
        function makeAllPromisesCB(dishId){ return getDishDetails(dishId); }

        const dishArray = firebaseData.val()?.dishes ?? [];
        const guests = firebaseData.val()?.guests ?? 2;

        const arrayPromises = Object.keys(dishArray).map(makeAllPromisesCB);

        function newModelACB(dishes){ return new DinnerModel(guests, dishes);}
        
        return Promise.all(arrayPromises).then(newModelACB);
        
    }
    
        return firebase.database().ref(REF).once("value").then(aBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function presistanceObsACB(payload) {
        if (payload) {

            if (payload.hasOwnProperty('setNumber')) {
                firebase.database().ref(REF + "/guests").set(model.numberOfGuests);
            }

            if (payload.hasOwnProperty('setDish')) {
                firebase.database().ref(REF + "/currentDish").set(model.currentDish);
            }

            if (payload.hasOwnProperty('addDish')) {
                firebase.database().ref(REF + "/dishes/" + payload.addDish.id).set(payload.addDish.title);
            }

            if (payload.hasOwnProperty('removeDish')) {
                firebase.database().ref(REF + "/dishes/" + payload.removeDish.id).set(null);
            }

        }
    }
    model.addObserver(presistanceObsACB)

}

/* Får in en model och prenumernerar till firebase databasen. Så vi basically säger "on value" gör detta.
    Med detta menas funktionerna uppdaterar guests och currentdish. */
function updateModelFromFirebase(model) {

    firebase.database().ref(REF+"/guests").on("value", 
   function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());});

   firebase.database().ref(REF+"/currentDish").on("value", 
   function guestsChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());});

   /* Istället för "onValue" kör vi "on.child_added" samt "on.child_removed". Detta samma sak fast för arrays. 
     Vi säger helt enkelt att om något händer gör något vilket i detta fall är getDishDetails (fetch api). 
    Men innan detta görs så kollar vi om just denna dish är något vi har hanterat redan för att inte fetcha api i onödan.
       */
   
   firebase.database().ref(REF+"/dishes/").on("child_added",
   function dishAddedInFirebaseACB(firebaseData){
        function hasNotSameIDCB(dish){
            if (dish.id === +firebaseData.key)
                return true;
            else
            return false;    
        }
        if(!model.dishes.filter(hasNotSameIDCB).length > 0)
        getDishDetails(+firebaseData.key).then(function addFetchedDish(dish){model.addToMenu(dish)})});
   
   firebase.database().ref(REF+"/dishes/").on("child_removed",
   function dishRemovedInFirebaseACB(firebaseData){
    const dishToRemove = {id : +firebaseData.key }
    model.removeFromMenu(dishToRemove);
   });
}

export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};