export default SearchResultsView;


function SearchResultsView(props) {
    
    


function returnResultsCB(dish) {

    function searchResultACB() {
        props.chosenDish(dish);
        window.location.hash="#details"
    }
    return(
        <span onClick={searchResultACB} key = {dish.id} className="searchResult">
                <img src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"></img>
                <div>
                    {dish.title}
                </div>
            </span>
    )
} 


return(
    <div>{props.searchResults.map(returnResultsCB)} </div>
 );

}