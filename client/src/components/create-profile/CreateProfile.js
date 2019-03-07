import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubusername: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submit");
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            icon="fab fa-twitter"
            type="text"
            name="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
            handleChange={this.handleChange}
            error={errors.twitter}
          />
          <InputGroup
            icon="fab fa-facebook"
            type="text"
            name="facebook"
            placeholder="Facebook Profile URL"
            value={this.state.facebook}
            handleChange={this.handleChange}
            error={errors.facebook}
          />
          <InputGroup
            icon="fab fa-linkedin"
            type="text"
            name="linkedin"
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
            handleChange={this.handleChange}
            error={errors.linkedin}
          />
          <InputGroup
            icon="fab fa-youtube"
            type="text"
            name="youtube"
            placeholder="YouTube Profile URL"
            value={this.state.youtube}
            handleChange={this.handleChange}
            error={errors.youtube}
          />
          <InputGroup
            icon="fab fa-instagram"
            type="text"
            name="instagram"
            placeholder="Instagram Profile URL"
            value={this.state.instagram}
            handleChange={this.handleChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Lets get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  name="handle"
                  placeholder="* Profile Handle"
                  value={this.state.handle}
                  handleChange={this.handleChange}
                  info="A unique handle for your profile URL. Your full name, company name, nickname."
                  error={errors.handle}
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  handleChange={this.handleChange}
                  options={options}
                  info="Give us an idea of where you are in your career"
                  error={errors.status}
                />
                <TextFieldGroup
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  handleChange={this.handleChange}
                  info="Could be your own or one you work for"
                  error={errors.company}
                />
                <TextFieldGroup
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  handleChange={this.handleChange}
                  info="Could be your own or company website"
                  error={errors.website}
                />
                <TextFieldGroup
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  handleChange={this.handleChange}
                  info="City & state (e.g. Philadelphia, PA)"
                  error={errors.location}
                />
                <TextFieldGroup
                  type="text"
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  handleChange={this.handleChange}
                  info="Please use comma separated values (e.g. HTML,CSS,JavaScript,PHP)"
                  error={errors.skills}
                />
                <TextFieldGroup
                  type="text"
                  name="githubusername"
                  placeholder="Github Username"
                  value={this.state.githubusername}
                  handleChange={this.handleChange}
                  info="If you want to show your latest repos and a Github link, include your username"
                  error={errors.githubusername}
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  value={this.state.bio}
                  handleChange={this.handleChange}
                  info="Tell us a little about yourself"
                  error={errors.bio}
                />

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const maspStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(maspStateToProps)(CreateProfile);
