import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { authUser } from '../actions';

class LoginForm extends Component {

  componentWillMount() {
    if(sessionStorage.getItem("user_id")) {
      this.props.history.push('/public');
    }
  }
  componentDidUpdate() {
    if(sessionStorage.getItem("user_id")) {
      this.props.history.push('/public');
    }
  }

  renderField(field) {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className={field.faIcon}></i></span>
        </div>
        <input
          type={field.type}
          {...field.input}
          className="form-control"
          placeholder={field.label}
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.authUser(values);
  }

  renderError() {
    if(this.props.userInfo.payload) {
      const { success, message, data } = this.props.userInfo.payload.data;
      if (success === false) {
        return (
          <div className="alert alert-danger">
            {message}
          </div>
        );
      } else if (success === true){
        sessionStorage.setItem("user_id", data[0].user_id);
        sessionStorage.setItem("username", data[0].username);
      }
    }
  }

  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;

    return (
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Username"
          faIcon="fas fa-user"
          name="username"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password"
          faIcon="fas fa-lock"
          name="password"
          type="password"
          component={this.renderField}
        />
        {this.renderError()}
        <button type="submit" className="btn btn-success" disabled={invalid || submitting || pristine}>
          <i className="fas fa-sign-in-alt"></i> LOG IN
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

export default reduxForm({
  form: 'loginForm'
})(
  connect(mapStateToProps, { authUser })(LoginForm)
);
