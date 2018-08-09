import React, { Component } from 'react';
import Logout from '../containers/logout';
import ChatList from '../containers/chatList';
import NewChat from '../containers/newChat';


class PublicChat extends Component {

  componentWillMount() {
    if(!sessionStorage.getItem("user_id")) {
      this.props.history.push('/');
    }
  }

  render() {

    return(
      <div className="container-fluid public-chat">
        <h1 className="text-center">iTok</h1>
        <ChatList />
        <NewChat />
        <Logout history={this.props.history} />
      </div>
    );
  }
}

export default PublicChat;
