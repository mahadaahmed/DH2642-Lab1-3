export default DetailsView

function DetailsView(props) {




    //Rendering av ingredient, visar namnet, antal och mått
    function viewIngredients(ingredient){
        return(
            <div>
        <div>
            <th> {ingredient.name} {ingredient.amount} {ingredient.unit} </th>
        </div>
        
            </div>
        )
    }

    //Rendering av själva priset för maten beroende på antalet gäster
    function ourDishDataCB(props){
        return(
            <div>
                <th>Price:</th> {props.dishData.pricePerServing}
            <div>

                <th> For {props.guests} guests: {(props.guests * props.dishData.pricePerServing).toFixed(2)}</th>
            </div>
            
            </div>   
        )
    }

    function onEventClickACB(){
        props.addToMenu()
        window.location.hash="#search"
    }

    function onClickEventACB(){
        window.location.hash="#search"

    }

    return(
        
        //render image, Namn på rätten, kallar sedan ourDishDataCB, sedan skriver vi ut alla ingredienser
        //Sedan lägger vi instruktionerna, till slut knapparna
        <div>
        <img class = "image" src={props.dishData.image}></img>
        <th>{props.dishData.title}</th>
        {ourDishDataCB(props)}
        {props.dishData.extendedIngredients.map(viewIngredients)}
        <div>{props.dishData.instructions}</div>
        <div><a href={props.dishData.sourceUrl}> More information</a></div>
        <div>
        <button class="button" disabled = {props.isDishInMenu} onClick = {onEventClickACB}>Add to menu</button>
        <button class="button" onClick = {onClickEventACB}>Cancel</button>
        </div>
       
    </div>
    )
}
