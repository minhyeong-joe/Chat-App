import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { sendChat } from '../actions';

const lineHeight = 20;

class NewChat extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      rows: 1,
      error: false,
      error_message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderMessageArea = this.renderMessageArea.bind(this);
  }

  handleChange(e) {
    const oldRows = e.target.rows;
    e.target.rows = 1;
    const newRows = ~~(e.target.scrollHeight/lineHeight);

    if (newRows === oldRows) {
      e.target.rows = newRows;
    }

    this.setState({
      value: e.target.value,
      rows: newRows
    });
  }

  renderMessageArea(field) {
    return (
      <textarea
        {...field.input}
        className="form-control"
        name="message"
        rows={field.rows}
        style={{lineHeight: `${lineHeight}px`}}
        onKeyDown={field.onKeyDown}
      />
    );
  }

  onSubmit(values) {
    const { message } = values;
    const MAX_LENGTH = 250;
    if(message.length > MAX_LENGTH) {
      this.setState({
        error: true,
        error_message: "Each message cannot be more than " + MAX_LENGTH + " characters."
      })
    } else {
      this.setState({
        error: false,
        error_message: ""
      });
      const { user_id, username, token } = sessionStorage;

      const dataToSend = {
        message: message,
        user_id: user_id,
        username: username,
        token: token
      }
      this.props.sendChat(dataToSend);

      this.setState({
        value: '',
        rows: 1
      });
      this.props.reset();
    }
  }

  renderError() {
    return (
      <div className="alert alert-danger">
        {this.state.error_message}
      </div>
    );
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.mySubmitBtn.click();
    }
  }


  render() {

    const { handleSubmit, invalid, submitting, pristine } = this.props;

    return(
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        {this.state.error && this.renderError()}
        <div className="new-chat input-group">
          <Field
            value={this.state.value}
            rows={this.state.rows}
            name="message"
            component={this.renderMessageArea}
            onChange={this.handleChange}
            onKeyDown={this.onEnterPress}

          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary h-100" disabled={pristine || invalid || submitting} ref={el => this.mySubmitBtn = el}>Send Message</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessageForm',
})(
  connect(null, { sendChat })(NewChat)
);
