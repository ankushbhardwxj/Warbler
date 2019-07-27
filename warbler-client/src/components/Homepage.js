import React from "react";
import {Link} from "react-router-dom";
import MessageTimeLine from "./MessageTimeline";


const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return(
      <div className = "home-hero">
        <h1>What Happening?</h1>
        <h4>New to Warbler?</h4>
          <Link to = "/signup" className="btn btn-primary">
            Sign Up here
          </Link>
      </div>
    );
  }
  return(
      <div>
        <MessageTimeLine
         profileImageUrl={currentUser.user.profileImageUrl}
         username={currentUser.user.username}/>
      </div>
  );
};
//we want to see if the person is logged in


export default Homepage;
