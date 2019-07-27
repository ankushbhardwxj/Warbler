import React from 'react';
import {Provider} from "react-redux";
//so that we can wrap entire Component using redux
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar"
import Main from "./Main";
import {setAuthorizationToken, setCurrentUser} from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();//created the store and pass it in app
//creating a stateless functional Component

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent from manually tempering key of jwt in localStorage
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  //pass store using provider
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);



export default App;
