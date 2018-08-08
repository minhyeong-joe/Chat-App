import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../actions';


class PublicChat extends Component {

  componentWillMount() {
    if(!sessionStorage.getItem("user_id")) {
      this.props.history.push('/');
    }
  }

  logout() {
    sessionStorage.clear();
    this.props.userLogout();
    this.props.history.push('/');
  }

  render() {
    const username = sessionStorage.getItem('username');
    const user_id = sessionStorage.getItem('user_id');
    console.log(username);
    console.log(user_id);

    return(
      <div>
        <h1>Main Page</h1>
        <p>{username}</p>
        <button className="btn btn-danger" onClick={this.logout.bind(this)}>LOG OUT</button>
      </div>
    );
  }
}

export default connect(null, {userLogout})(PublicChat);
