//we add login and sign up here
//we use bootstrap to style the application
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth"
import Logo from "../images/Mpire-White-Logo.png";

class Navbar extends Component{
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  render(){
    return(
      <nav className= "navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src= {Logo} alt="Warbler Home" />
            </Link>
          </div>

          {this.props.currentUser.isAuthenticated ? (
           <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to ={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
            </li>
            <li>
              <a onClick = {this.logout}>Log out</a>
            </li>
           </ul>
          ):(
          <ul className ="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
          )}
        </div>
      </nav>
    )
  }
}
//if a user has already logged in we dont want him to encounter the above
function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(Navbar);
