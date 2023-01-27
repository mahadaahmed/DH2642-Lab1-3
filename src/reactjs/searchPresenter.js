import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
//import React from "react";
import ResolvePromise from "../resolvePromise.js";
import { searchDishes } from "../dishSource.js";
import promiseNoData from "../views/promiseNoData.js";


/* Compomnet state is like a mini model of a specific component. As in the application state all components(presenters) rely on shared state.
So we have removed some properties from the model to the searchPresenter*/
 


export default
    function Search(props) {
    
    // Vi skaper en state där vi kan ändra, type, query. Istället för att fråga modellen
    const [searchP, setSearchP] = React.useState({});
    const [promiseState] = React.useState({}); //No setter, fixed
    const [, reRender] = React.useState(); //reRender(new value) will update the component


    if (!promiseState.promise) {
        
        ResolvePromise(searchDishes(searchP), promiseState, notifyACB);
    }

    //Här re-render vi alltså uppdatera.
    function notifyACB() {
        const newPromise = {};
        reRender(newPromise);
    }


    //Custom events som modifierar beroende på vad användaren
    // väljer för type.
    function handlingACB1(string) {
        const obj = {};
        obj.query = string;
        obj.type = searchP.type;
        setSearchP(obj);
    }

    //Custom events som modifierar beroende på vad användaren
    // söker efter.
    function handlingACB2(string) {

        const obj = {};
        obj.query = searchP.query;
        obj.type = string;
        setSearchP(obj)
    }

    //Hitta vad användaren vi vill söka efter. 
    function handlingACB3() {
        ResolvePromise(searchDishes(searchP), promiseState, notifyACB);
    }

    function handlingACB4(obj) {
        props.model.setCurrentDish(obj.id)
    }

    

    return (
        <div>
            <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                userSearched={handlingACB1}
                choosingOps={handlingACB2}
                searchNow={handlingACB3}
            ></SearchFormView>
            {promiseNoData(promiseState) || <SearchResultsView searchResults={promiseState.data} chosenDish={handlingACB4}></SearchResultsView>}
        </div>

    )
}