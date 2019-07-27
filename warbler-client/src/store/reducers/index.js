//this is the root reducer that we will export
//bundles all our current users and errors in the root reducers
import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
const rootReducer = combineReducers({
  currentUser,
  errors,
  messages
});

export default rootReducer;
