import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
//we need these to make sure that we are correctly passing props to our
//components so that we can specify the current route we are on and Redirect later
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors"
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";
//***This is for Route exact path below***
//syntax is tricky. When router's path is / , it renders all props
//on the Homepage component. props is parameter and Homepage is returned.
const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return(
    <div className="container">
      <Switch>
        <Route exact path="/" render = {props=><Homepage currentUser={currentUser} {...props}/>} />
        <Route exact path="/signin" render = {props=>{
          return(
              <AuthForm errors={errors} onAuth={authUser} buttonText="Log in" heading="Welcome Back" {...props} />
          );
        }} />
        <Route exact path="/signup" render={props=>{
          return(
              <AuthForm errors={errors} onAuth={authUser} signUp buttonText="Sign me up" heading="Join Warbler today." {...props}/>
          );
        }} />
        <Route path ="/users/:id/messages/new" component={withAuth(MessageForm)} />
      </Switch>
    </div>
  );
};
function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
