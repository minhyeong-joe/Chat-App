import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

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
        <button type="submit" className="btn btn-success">
          <i className="fas fa-sign-in-alt"></i> LOG IN
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
