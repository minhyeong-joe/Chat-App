import React, { Component } from 'react';

class ChatList extends Component {

  constructor() {
    super();

    this.onCheckChange = this.onCheckChange.bind(this);

    this.state={
      autoscroll: true
    }
  }

  renderChatBubbles() {
    return this.props.messages.map(message => {
      const date = new Date(message.timestamp);
      const localTime = date.toLocaleString();
      if (message.user === sessionStorage.getItem("username")) {
        return (
          <div className="message w-75 mb-5 my-message" key={message.id}>
            <div className="message-body text-left">
              {message.text}
            </div>
            <div className="message-footer text-right text-muted">
              {message.user} - {localTime}
            </div>
          </div>
        );
      }

      return (
        <div className="message w-75 mb-5" key={message.id}>
          <div className="message-body text-left">
            {message.text}
          </div>
          <div className="message-footer text-right text-muted">
            {message.user} - {localTime}
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
    if(this.state.autoscroll)
      this.scrollToBottom();
  }

  onCheckChange() {
    this.setState(prevState => ({
      autoscroll: !prevState.autoscroll
    }));
  }

  render() {
    return(
      <div className="chat-block">
        <div className="chat-list p-2">

          {this.renderChatBubbles()}
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>

        </div>
        <div className="form-inline mb-2">
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

export default ChatList;
