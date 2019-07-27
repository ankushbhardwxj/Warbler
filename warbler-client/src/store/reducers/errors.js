//we need to create actionTypes first
//cases for errors in adding and removing account
//cases for login and logout
import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

//error messages corresponding to the actionTypes
export default (state = { message: null }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
