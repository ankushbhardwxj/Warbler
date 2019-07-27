//setting up actions for login or logout
import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, //hopefully be true when the user logs in
  user: {} //all the user info when logged in
};

//handle one actionTypes
//for login
export default (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length, //!! not not ,
        //turns empty object into false or if there are keys, true
        //isAuthenticated: Object.keys(action.user).length>0
        user: action.user
      };
      default:
        return state;
  }
};
//for logout we pass {} into user.
