import SearchResultsView from "../views/searchResultsView.js";
import SearchFormView from "../views/searchFormView.js";
import promiseNoData from "../views/promiseNoData.js";

function Presenter(props) {

    
    if(!props.model.searchResultsPromiseState.promise) {
        props.model.doSearch(props.model.searchParams);
    }

    function searchTextACB(text){
         props.model.setSearchQuery(text); 

    }
    function searchTypeACB(type){ 
        props.model.setSearchType(type); 
    }
    function searchNowACB(){ 
        props.model.doSearch(props.model.searchParams); 
    }

    function usersChosenDishACB(dish)
    {props.model.setCurrentDish(dish.id)}
   
    
    return (
        <div>
            <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                            userSearched={searchTextACB} 
                            choosingOps={searchTypeACB}
                            searchNow={searchNowACB}
                            ></SearchFormView>
            {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults = {props.model.searchResultsPromiseState.data} chosenDish = {usersChosenDishACB}></SearchResultsView>} 
        </div>
       
    )
}

export default Presenter;
