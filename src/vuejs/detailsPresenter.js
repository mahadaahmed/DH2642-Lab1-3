import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData.js";

export default
function Details(props){
    

    function aCB(currentDish){
        if(props.model.currentDish === currentDish.id) {
            return true;
        }
    }

    // Vad ska in här?
    function addingToMenuACB(){ 
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }


    
    return promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data} isDishInMenu = {props.model.dishes.filter(aCB).length > 0} guests = {props.model.numberOfGuests} addToMenu = {addingToMenuACB}/>;
} 