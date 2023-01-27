// Add relevant imports here
import React from "react";
import App from "../views/app.js";
import {firebaseModelPromise, updateFirebaseFromModel,updateModelFromFirebase,} from "../firebaseModel.js";
import resolve1 from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.js";

// Define the ReactRoot component
export default function ReactRoot() {
  const [promiseState] = React.useState({});
  const [, reRender] = React.useState();

  function notifyACB() {
    const newProm = {};
    reRender(newProm);
    if (promiseState.data) {
      updateFirebaseFromModel(promiseState.data);
      updateModelFromFirebase(promiseState.data);
    }
  }

  function wasCreatedACB() {
    resolve1(firebaseModelPromise(), promiseState, notifyACB);

    return function isTakenDownACB() {};
  }

  React.useEffect(wasCreatedACB, []);

  return (
    <div>
      {promiseNoData(promiseState) || <App model={promiseState.data} />};
    </div>
  );
}