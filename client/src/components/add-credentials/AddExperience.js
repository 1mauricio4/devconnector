import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// functional form components
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// profile action
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting...");
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onCheck(event) {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
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
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-cen">
                Add any job or position that you have had in the past or
                current.
              </p>
              <small className="d-block pb3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                  handleChange={this.handleChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  type="text"
                  name="title"
                  placeholder="* Job Title"
                  value={this.state.title}
                  handleChange={this.handleChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  handleChange={this.handleChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  handleChange={this.handleChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  handleChange={this.handleChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  name="description"
                  placeholder="Job Description"
                  value={this.state.description}
                  handleChange={this.handleChange}
                  info="Tell us a little about the position"
                  error={errors.description}
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
