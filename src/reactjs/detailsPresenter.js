import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData.js";

export default
function Details(props){



    const [, copyNumber]=React.useState(props.model.numberOfGuests);
    const [, copyDishes]=React.useState(props.model.dishes);
    const [, promise]=React.useState(props.model.currentDishPromiseState.promise);
    const [, promiseData]=React.useState(props.model.currentDishPromiseState.data);
    const [, promiseError]=React.useState(props.model.currentDishPromiseState.error);

    

    function observerACB(){    // no need for payload
        copyNumber(props.model.numberOfGuests);    // when notified, update state with current value
        copyDishes(props.model.dishes);
        promise(props.model.currentDishPromiseState.promise)
        promiseData(props.model.currentDishPromiseState.data)
        promiseError(props.model.currentDishPromiseState.error)
        }

    function wasCreatedACB(){                            // 1. the component has been created
            props.model.addObserver(observerACB);      
            
            function isTakenDownACB(){
                props.model.removeObserver(observerACB);
            } // 2. the component is being taken down 
            
            return isTakenDownACB;
        }
    

        React.useEffect(wasCreatedACB, []); 

    

    function DishInMenuACB(currentDish){
        if(props.model.currentDish === currentDish.id) {
            return true;
        }
    }

   
    function addingToMenuACB(){ 
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }


    
    return promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data} isDishInMenu = {props.model.dishes.filter(DishInMenuACB).length > 0} guests = {props.model.numberOfGuests} addToMenu = {addingToMenuACB}/>;
} 