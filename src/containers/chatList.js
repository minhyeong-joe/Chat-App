import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChats } from '../actions';
import _ from 'lodash';

class ChatList extends Component {

  constructor() {
    super();

    this.refreshChat = this.refreshChat.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);

    this.state={
      autoscroll: true
    }
  }

  componentWillMount() {
    this.refreshChat();
  }

  refreshChat() {
    this.props.fetchChats(() => {
      setTimeout(this.refreshChat, 2000);
    })
  }

  renderChatBubbles() {
    return _.map(this.props.chat, chat => {
      if (chat.username === sessionStorage.getItem("username")) {
        return (
          <div className="message w-75 mb-5 my-message" key={chat.id}>
            <div className="message-body text-left">
              {chat.message}
            </div>
            <div className="message-footer text-right text-muted">
              {chat.username} - {chat.timestamp}
            </div>
          </div>
        );
      }

      return (
        <div className="message w-75 mb-5" key={chat.id}>
          <div className="message-body text-left">
            {chat.message}
          </div>
          <div className="message-footer text-right text-muted">
            {chat.username} - {chat.timestamp}
          </div>
        </div>
      );
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    if(this.state.autoscroll) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate(prevProps) {
    const prevPropsLastID = Object.keys(prevProps.chat)[Object.keys(prevProps.chat).length-1];
    const thisPropsLastID = Object.keys(this.props.chat)[Object.keys(this.props.chat).length-1];
    if (prevPropsLastID !== thisPropsLastID && this.state.autoscroll) {
      this.scrollToBottom();
    }
  }

  onCheckChange() {
    this.setState(prevState => ({
      autoscroll: !prevState.autoscroll
    }));
  }

  render() {
    return(
      <div>
        <div className="chat-list p-2 mb-4">

          {this.renderChatBubbles()}
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>

        </div>
        <div className="form-inline">
          <button className="btn btn-info mr-4" onClick={this.scrollToBottom}>Scroll to Bottom</button>
          <div className="form-check">
            <input id="autoScrollCheckBox" type="checkbox" className="form-check-input d-block" defaultChecked={this.state.autoscroll} onChange={this.onCheckChange} />
            <label className="form-check-label" htmlFor="autoScrollCheckBox">Enable Auto Scroll</label>        
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chatLog
  };
}

export default connect(mapStateToProps, { fetchChats })(ChatList);
