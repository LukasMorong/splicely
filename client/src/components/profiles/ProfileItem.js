import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-mg-4 col-8">
            <h3>{profile.user.username}</h3>
            <p>{profile.location}</p>
            <Link
              to={`/profile/${profile.user.username}`}
              className="btn btn-info"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skills</h4>
            <ul className="list-group">
              {profile.interests.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
