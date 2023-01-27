import SummaryView from "../views/summaryView.js";
import {shoppingList} from "../utilities.js"


export default
function Summary(props){
    const [, copyNumber]=React.useState(props.model.numberOfGuests);
    const [, copyDishes]=React.useState(props.model.dishes);
    

    function observerACB(){    // no need for payload
        copyNumber(props.model.numberOfGuests);    // when notified, update state with current value
        copyDishes(props.model.dishes);
        }

    function wasCreatedACB(){                            // 1. the component has been created
            props.model.addObserver(observerACB);      
            
            function isTakenDownACB(){
                props.model.removeObserver(observerACB);
            } // 2. the component is being taken down 
            
            return isTakenDownACB;
        }
    

        React.useEffect(wasCreatedACB, []); 
        

    return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes)} />;
}

