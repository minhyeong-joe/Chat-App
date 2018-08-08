import React, { Component } from 'react';
import LoginForm from '../containers/loginForm';
import RegisterForm from '../containers/registerForm';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "login" : true
    }
  }

  renderForm() {
    if(this.state.login) {
      return (
        <div>
          <LoginForm />
          <p className="form-changer" onClick={()=>this.setState({"login":false})}>
            Sign Up
          </p>
        </div>
      );
    }

    return (
      <div>
        <RegisterForm />
        <p className="form-changer" onClick={()=>this.setState({"login":true})}>
          Log In
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="landing-bg">
        <div className="landing-box text-center">
          <h3>Welcome To The Chat App</h3>
          <hr />
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default Landing;
