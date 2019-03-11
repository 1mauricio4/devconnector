import React from "react";
import { Link } from "react-router-dom";

const ProfileButtonActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"> Edit Profile</i>
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"> Add Experience</i>
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"> Add Education</i>
      </Link>
    </div>
  );
};

export default ProfileButtonActions;
