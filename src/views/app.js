/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import. sS
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
const Details=require("../"+PREFIX+"/detailsPresenter.js").default;
const Show=require("../"+PREFIX+"/show.js").default;
export default
function App(props){
    return (<div className= "flexParent">
    <Show hash="#search">
    <div class="sidebar"><Sidebar model={props.model}  /></div>
    <Search model={props.model} />
    </Show> 
    
    <Show hash="#details"><Details model={props.model} /> </Show> 
    
    <Show hash="#summary">
        <div class="sidebar"><Sidebar model={props.model}  /></div>
        <Summary model={props.model} />
    </Show> 
</div>
);
}








// return (<div class= "flexParent">
// <Show hash = "#sidebar"class="sidebar"><Sidebar model={props.model} /></Show>
// <Show hash = "#summary" class ="mainContent"><Summary model={props.model} /></Show> 
// <Show hash = "#search" class="search"><Search model={props.model} /></Show>
// <Show hash="#details"><Details model={props.model} /></Show>

// </div>
// );
// }
