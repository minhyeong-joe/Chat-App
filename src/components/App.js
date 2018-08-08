import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">React Project Boilerplate</h1>
          <p className="lead">Installed dependencies:</p>
          <ul className="list-group">
            <li className="list-group-item">React-Router</li>
            <li className="list-group-item">Redux</li>
            <li className="list-group-item">Redux-Thunk</li>
            <li className="list-group-item">Redux-Promise</li>
            <li className="list-group-item">Redux-Form</li>
            <li className="list-group-item">Lodash</li>
            <li className="list-group-item">Axios</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
