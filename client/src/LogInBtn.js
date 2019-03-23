import React, { Component } from 'react';
//import './LogInBtn.css';

class LogInBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      password: "",
      passwordField: ""
    };
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserIdChange(event) {
    this.setState({ user_id: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value,
                    passwordField: hidePassword(event.target.value) });
  }

  hidePassword(password) {
    var len = password.length;
    var res = "";
    while(len--) res += "•";
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form>
          <label>Search terms:</label>
          <input name="user_id" type="text" value={this.state.user_id} onChange={this.handleChange} size="18" />
          <label>Search terms:</label>
          <input name="password" type="text" value={this.state.passwordField} onChange={this.handleChange} size="18" />
        </form>
        <button onClick={props.onClick}>Login</button>
      </div>
    );
  }
}

export default LogInBtn;
