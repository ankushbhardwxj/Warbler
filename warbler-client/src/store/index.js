//to create a store we require a rootReducer
import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
//thunk allows us to delay the evaluation of some expression
//essential to work with async functions of redux

//this code can be copied to configure the store
export function configureStore(){
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension(): f => f
    )
  );
    return store;
}
