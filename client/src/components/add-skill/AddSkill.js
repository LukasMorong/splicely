import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSkill } from "../../actions/profileActions";

class AddSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      level: "",
      isActual: false,
      description: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      title: this.state.title,
      level: this.state.level,
      isActual: this.state.isActual,
      description: this.state.description
    };

    this.props.addSkill(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      isActual: !this.state.isActual
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Skill</h1>
              <p className="lead text-center">Add any skill you find usefull</p>
              <small className="d-bock pb-3">* = required fields</small>
              <div style={{ marginBottom: "20px" }} />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Skill"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Name of skill"
                />
                <TextFieldGroup
                  placeholder="Level"
                  name="level"
                  type="text"
                  value={this.state.level}
                  onChange={this.onChange}
                  error={errors.level}
                  info="Your level of skill (1 - beginner, 10 - expert)"
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isActual"
                    value={this.state.isActual}
                    checked={this.state.isActual}
                    onChange={this.onCheck}
                    id="isActual"
                  />
                  <label htmlFor="isActual" className="form-check-label">
                    Skill currently in use
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="More details about skill"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddSkill.propTypes = {
  addSkill: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addSkill }
)(withRouter(AddSkill));
