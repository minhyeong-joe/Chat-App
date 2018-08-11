import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../actions';

class Logout extends Component {

    logout() {
      sessionStorage.clear();
      this.props.userLogout();
      this.props.history.push('/');
    }

  render() {
    return (
      <div className="text-center ml-auto">
        <button className="btn btn-danger" onClick={this.logout.bind(this)}>LOG OUT</button>
      </div>
    );
  }
}

export default connect(null, { userLogout })(Logout);
