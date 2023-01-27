import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props){
    function updatingNumberACB(number){
        props.model.setNumberOfGuests(number)
    }

    function removeDishACB(dishToRemove){
        props.model.removeFromMenu(dishToRemove)
    }

    function dishNameACB(dishText){
        props.model.setCurrentDish(dishText)
    }
    return <SidebarView number={props.model.numberOfGuests} 
    onNumberChange = {updatingNumberACB} 
    dishes= {props.model.dishes} 
    removeDish = {removeDishACB} 
    dishName = {dishNameACB}/>;
}