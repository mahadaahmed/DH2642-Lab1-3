export default SearchFormView;
function SearchFormView(props) {
    return(
        <div>
            
            <input onChange={searchedACB} placeholder="Search"  type="search"></input>
            <select onChange={choosingACB}>
            <option value= "">Choose:</option>
                {props.dishTypeOptions.map(choosing)}
            </select>
            <button onClick={searchNowACB} >Search!</button>
            <button onClick ={someEventACB}>Summary</button>
            
        </div>
        
        
    )

    function searchedACB(event){
        props.userSearched(event.target.value); //fixa sen
    }

    function choosing(string) {
        return <option value={string}>{string}</option>

    }
    function choosingACB(event){
        props.choosingOps(event.target.value);
    }

    function searchNowACB(){
        props.searchNow()
    }
    function someEventACB(){
        window.location.hash="#summary"
    }
}