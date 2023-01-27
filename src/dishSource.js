
import {
    BASE_URL,
    API_KEY
} from "../src/apiConfig.js"



function treatHTTPResponseACB(response) {
    /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
    if (response.status !== 200)
        throw new Error("HTTP response wrong status: " + response.status);
    else
        return response.json();
}

function getDishDetails(dishID) {
    return fetch(BASE_URL + "recipes/" + dishID + "/information",

        { // object literal
            "method": "GET", // HTTP method
            "headers": { // HTTP headers, also object literal
                'X-Mashape-Key': API_KEY,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            } // end of headers object
        } /* end of second fetch parameter, object */)
        .then(treatHTTPResponseACB)
}

function transformResultACB(object) {
    return object.results;
}

function searchDishes(dishObject) {

    const query = new URLSearchParams(dishObject)
    return fetch(BASE_URL + "recipes/search?" + query.toString(),

        { // object literal
            "method": "GET", // HTTP method
            "headers": { // HTTP headers, also object literal
                'X-Mashape-Key': API_KEY,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            } // end of headers object
        } /* end of second fetch parameter, object */)
        .then(treatHTTPResponseACB).then(transformResultACB)
}




export {
    getDishDetails,
    searchDishes
}