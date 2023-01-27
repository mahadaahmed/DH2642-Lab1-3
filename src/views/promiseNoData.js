
function promiseNoData(promiseState){
   
    //Om promise är false, returneras no data
    if( !promiseState.promise) {
        return <div>no data</div>
    }
     
    //Om data är falsy och error är falsy, returneras en bild
    if(!promiseState.data && !promiseState.error)

    return <img class = "imageForLoading" src= "https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"></img>

    //om promise är truthy och error är truthy, returneras en error text
    if(promiseState.promise && promiseState.error){
    return  <div>{promiseState.error.toString()}</div>
    }

    
    if(promiseState.promise == true || promiseState.data == true || promiseState.error == false){
    return false;
    }
}

export default promiseNoData;

