import React, { Component } from 'react';
import './VisitedText.css';

class VisitedText extends Component {
  constructor(props) {
    super(props);
    var timesVisited = localStorage.timesVisited ? localStorage.timesVisited : 0;
    var res = (timesVisited === 0) ?
      "It's your first time here. Welcome!" :
      (timesVisited === 1) ?
        "You've visited once before. Welcome back!" :
        `You've visited ${timesVisited} times before. Welcome back!`;
    this.state = { text: res };
    timesVisited++;
    localStorage.timesVisited = timesVisited;
  }

  render() {
    return (
      <div className="visitedtext">
        <h5 className="small_text">
          {this.state.text}
        </h5>
      </div>
    );
  }
}

export default VisitedText;
