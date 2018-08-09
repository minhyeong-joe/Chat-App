import React, { Component } from 'react';
import LoginForm from '../containers/loginForm';
import RegisterForm from '../containers/registerForm';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "login" : true
    }
    this.registerComplete = this.registerComplete.bind(this);
  }

  registerComplete() {
    this.setState({
      "login" : true
    });
  }

  renderForm() {
    if(this.state.login) {
      return (
        <div>
          <LoginForm history={this.props.history} />
          <p className="form-changer d-inline" onClick={()=>this.setState({"login":false})}>
            Sign Up
          </p>
        </div>
      );
    }

    return (
      <div>
        <RegisterForm registerComplete={this.registerComplete}/>
        <p className="form-changer d-inline" onClick={()=>this.setState({"login":true})}>
          Log In
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="landing-bg">
        <div className="landing-box text-center">
          <h3>Welcome To iTok</h3>
          <hr />
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default Landing;
