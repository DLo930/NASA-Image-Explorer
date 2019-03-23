import React, { Component } from 'react';
//import './SignedInBtn.css';

class SignedInBtn extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleToggle(event) {
    this.setState({ toggled: !this.state.toggled });
  }

  handleLogout(event) {
    this.setState({ });
  }

  render() {
    <div>
      <button onClick={this.handleToggle}>Welcome, {props.user_id}</button>
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={350}
        transitionLeaveTimeout={350}>
        {this.state.toggled &&
          <button onClick={this.handleLogout} />
        }
      </ReactCSSTransitionGroup>
    </div>
  }
}

export default SignedInBtn;
