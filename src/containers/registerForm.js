import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class RegisterForm extends Component {

  renderField(field) {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className={field.faIcon}></i></span>
        </div>
        <input
          type="text"
          {...field.input}
          className="form-control"
          placeholder={field.label}
        />
      </div>
    );
  }

  render() {
    return (
      <form className="form-group">
        <Field
          label="Username"
          faIcon="fas fa-user"
          name="username"
          component={this.renderField}
        />
        <Field
          label="Password"
          faIcon="fas fa-lock"
          name="password"
          component={this.renderField}
        />
        <Field
          label="Verify Password"
          faIcon="fas fa-lock"
          name="passwordVerify"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-sign-in-alt"></i> Sign Up
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registerForm'
})(RegisterForm);
