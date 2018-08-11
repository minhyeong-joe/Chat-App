import React, { Component } from 'react';
import Logout from '../containers/logout';
import ChatList from '../containers/chatList';
import NewChat from '../containers/newChat';
import firebase from 'firebase/app';
import 'firebase/database';


class PublicChat extends Component {

  constructor() {
    super();

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCiMxr-LiTQQ1ZRljTvvyggmpweOr5LO6s",
      authDomain: "itok-chat.firebaseapp.com",
      databaseURL: "https://itok-chat.firebaseio.com",
      projectId: "itok-chat",
      storageBucket: "itok-chat.appspot.com",
      messagingSenderId: "160859330147"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.state = {
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('messages/').on('value', snapshot => {
      const currentMessages = snapshot.val();
      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        });
      }
    });
  }

  componentWillMount() {
    if(!sessionStorage.getItem("user_id")) {
      this.props.history.push('/');
    }
  }

  sendMessage(data) {
    const nextMessage = {
      id: data.id,
      text: data.text,
      user: data.user,
      timestamp: data.timestamp
    }
    firebase.database().ref('messages/'+nextMessage.id).set(nextMessage);
  }

  render() {

    return(
      <div className="container-fluid public-chat">
        <h1 className="text-center">iTok</h1>
        <ChatList messages={this.state.messages}/>
        <NewChat sendMessage={this.sendMessage} messages={this.state.messages}/>
        <Logout history={this.props.history} />
      </div>
    );
  }
}

export default PublicChat;
