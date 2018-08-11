import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { authUser } from '../actions';
import loader from '../img/loader.gif';

class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      loggingIn: false,
    };

    this.renderLoginBtn = this.renderLoginBtn.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

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
    this.loggingIn();
    this.props.authUser(values, () => {
      this.loggingIn();
    });
  }

  renderError() {
    if(this.props.userInfo) {
      const { success, message, data } = this.props.userInfo;
      if (success === false) {
        return (
          <div className="alert alert-danger">
            {message}
          </div>
        );
      } else if (success === true && data) {
        sessionStorage.setItem("user_id", data[0].user_id);
        sessionStorage.setItem("username", data[0].username);
        sessionStorage.setItem("token", data[0].token);
      }

    }
  }

  loggingIn() {
    this.setState(prevState => ({
      loggingIn: !prevState.loggingIn
    }));
  }

  renderLoginBtn() {

    const { invalid, submitting, pristine } = this.props;

    if(this.state.loggingIn) {
      return (
        <img src={loader} alt="logging in..." className="loader"/>
      );
    }

    return (
      <button type="submit" className="btn btn-success" disabled={invalid || submitting || pristine}>
        <i className="fas fa-sign-in-alt"></i> LOG IN
      </button>
    );
  }

  render() {
    const { handleSubmit } = this.props;

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
        {this.renderLoginBtn()}
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
