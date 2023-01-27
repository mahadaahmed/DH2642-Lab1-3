
import  {sortDishes,menuPrice,dishType} from "../utilities.js"


function SidebarView(props) {
    function incrementingButtonACB() {
        //props.number++;.
        props.onNumberChange(props.number + 1);
    }

    function decrementingButtonACB() {
       // props.number--;
        props.onNumberChange(props.number - 1);
    }
   
    return (
        <div >
            <button onClick={decrementingButtonACB} disabled={props.number == 1}>-</button>{props.number}
            <button onClick={incrementingButtonACB}>+</button>
            {
                renderDishes(props.dishes,props.number) 
            }

        </div>
    );

    function renderDishes(dishArray, people){
        function TableDishRowCB(dish){
            return <tr class="sidebarRow" key={dish.id}>
                <td><button onClick={userRemoveDishACB}>x</button></td>
                <td> <a onClick ={dishNameIsPressedACB} href="#details">{dish.title}</a></td> 
                <td className = "Styling">{dishType(dish)}</td>
                <td className ="Styling">{(dish.pricePerServing * people).toFixed(2)}</td>
          </tr>;
    
    function userRemoveDishACB(){
        props.removeDish(dish);
    }
    
    function dishNameIsPressedACB(){
        props.dishName(dish);
    }

        }
        
        
        return <table>
           
            <tbody>
    
               {sortDishes(dishArray).map(TableDishRowCB)}
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td class="Styling">{(menuPrice(dishArray) * people).toFixed(2)}</td>
                </tr>
    
            </tbody>
            </table>;
    }
}

export default SidebarView;