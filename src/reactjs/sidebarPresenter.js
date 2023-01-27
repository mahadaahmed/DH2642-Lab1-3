import SidebarView from "../views/sidebarView.js";
import React from "react";

export default
    function Sidebar(props) {
    const [, copyNumber] = React.useState(props.model.numberOfGuests);
    const [, copyDishes] = React.useState(props.model.dishes);

    function observerACB() {    // no need for payload
        copyNumber(props.model.numberOfGuests);    // when notified, update state with current value
        copyDishes(props.model.dishes);
    }

    function wasCreatedACB() {                            // 1. the component has been created
        props.model.addObserver(observerACB);

        function isTakenDownACB() {
            props.model.removeObserver(observerACB);
        } // 2. the component is being taken down 

        return isTakenDownACB;
    }

  

    function updatingNumberACB(number) {
        props.model.setNumberOfGuests(number)
    }

    function removeDishACB(dishToRemove) {
        props.model.removeFromMenu(dishToRemove)
    }

    function dishNameACB(dish) {
        props.model.setCurrentDish(dish.id)
    }
    React.useEffect(wasCreatedACB, []);
    
    return <SidebarView number={props.model.numberOfGuests}
        onNumberChange={updatingNumberACB}
        dishes={props.model.dishes}
        removeDish={removeDishACB}
        dishName={dishNameACB} />;
}