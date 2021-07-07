import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteSkill } from "../../actions/profileActions";

class Skills extends Component {
  onDeleteClick(id) {
    this.props.deleteSkill(id);
  }

  render() {
    const skills = this.props.skills.map(skl => (
      <tr key={skl._id}>
        <td>{skl.title}</td>
        <td>{skl.level}</td>
        <td>{skl.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, skl._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Skills</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>{skills}</tbody>
        </table>
      </div>
    );
  }
}

Skills.propTypes = {
  deleteSkill: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSkill }
)(Skills);
