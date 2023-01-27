

//gets a new parameter "notify" which is a function
function ResolvePromise(promise, promiseState, notify) {

    /* Från lecture slides*/
    promiseState.promise = promise; 
    promiseState.data = null; //Så användare inte ser data från förra sökningen
    promiseState.error = null;

    //If it is defined then we call it
    if(notify) {
        notify();
    }
    
    function saveDataACB(result)  {
        if(promiseState.promise !== promise) { //Return om promise ändrats
            return;
        }
        promiseState.data = result; //Spara om promise är samma som förut
    
        //when we save the data we notify again
        if(notify) {
            notify();
        }
    }


    function saveErrorACB(err) {
        if(promiseState.promise !== promise) { //Return om promise ändrats
            return;
        }
        promiseState.error = err; //Spara om promise är samma som förut
   
        //same goes for this one
        if(notify) {
            notify();
        }
    }

    /* 
        Anledning varför vi sparar promise i callbacks ovanför endast om promise är samma som förut
        är för att undvika en condition som kallas race condition
        Från lecture slides: A race condition or race hazard is the condition of an electronics, 
        software, or other system where the system's substantive behavior is dependent on the sequence or 
        timing of other uncontrollable events. It becomes a bug when one or more of the possible 
        behaviors is undesirable. 
    */
    if(promise !== null) { //gör Callbacks ovan endast om promise inte är null
        promise.then(saveDataACB).catch(saveErrorACB);
    }
    
}
export default ResolvePromise;