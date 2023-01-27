import React from "react";

export default

function Show(props) {
    const [hashState, setHash] = React.useState(window.location.hash); //  copy the value in component state

    function hashListenerACB() {
        setHash(window.location.hash); // when notified, update state with current value
    }

    //addEventListner to call acb if an event happens
    function componentWasCreatedACB() {
        window.addEventListener("hashchange",hashListenerACB);

        //We unsubscribe, in this case some browser we don't want to see. Otherwise our “dead” component will re-render uselessly whenever the hash changes!

        function isTakenDownACB() {
            window.removeEventListener("hashchange",hashListenerACB,);
        }
        
        return isTakenDownACB;
    }

    
    
    React.useEffect(componentWasCreatedACB, []);

    return (<div className={hashState === props.hash? " " : "hidden" }>{ props.children }</div>);
}