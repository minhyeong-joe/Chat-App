import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import _ from 'lodash';


class RegisterForm extends Component {

  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-control ${touched&&error? 'is-invalid': ''}`;
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className={field.faIcon}></i></span>
          </div>
          <input
            type={field.type}
            {...field.input}
            className={className}
            placeholder={field.label}
          />
        </div>
        <p className="text-danger">{touched? error: ''}</p>
      </div>
    );
  }


  onSubmit(values) {
    // remove passwordVerify value before passing into axios

    values = _.omit(values, 'passwordVerify');
    this.props.createUser(values, () => {
      this.props.registerComplete();
    });


  }

  renderError() {
    if(this.props.createUserResponse.payload) {
      const { success, message } = this.props.createUserResponse.payload.data;
      if (success === false) {
        return (
          <div className="alert alert-danger">
            {message}
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Username"
          faIcon="fas fa-user"
          type="text"
          name="username"
          component={this.renderField}
        />
        <Field
          label="Password"
          faIcon="fas fa-lock"
          type="password"
          name="password"
          component={this.renderField}
        />
        <Field
          label="Verify Password"
          faIcon="fas fa-lock"
          type="password"
          name="passwordVerify"
          component={this.renderField}
        />
        {this.renderError()}
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-sign-in-alt"></i> Sign Up
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.username || values.username.length < 5) {
    errors.username = "Username must be at least 5 characters long.";
  }
  if(!values.password || values.password.length < 5) {
    errors.password = "Password must be at least 5 characters long.";
  }
  if(values.passwordVerify !== values.password) {
    errors.passwordVerify = "Passwords do not match.";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    createUserResponse: state.createUser
  };
}

export default reduxForm({
  form: 'registerForm',
  validate: validate
})(
  connect(mapStateToProps, { createUser })(RegisterForm)
);
