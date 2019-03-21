import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VisitedText from './VisitedText';
import './App.css';
import './css_lib/animate.min.css';
import img from './images/nasa_logo.png';
//include TileGrid

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // JSON object returned from query to NASA image API
      data: {},
      // Visibility of advanced search fields
      isVisible: false,
      // Form data
      q: "",
      center: "",
      location: "",
      nasa_id: "",
      photographer: "",
      secondary_creator: "",
      title: "",
      year_start: new Date().getFullYear(),
      year_end: new Date().getFullYear()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  // request to server to validate info in MongoDB
  handleLogin(event) {

  }

  handleSubmit(event) {
    event.preventDefault();
    const start = parseInt(this.state.year_start);
    const end = parseInt(this.state.year_end);

    if(start <= end && end <= new Date().getFullYear()) {   // form validation
      const { data, isVisible, ...form } = this.state;
      fetch("/handleForm", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(res => this.setState({ data: JSON.parse(res) }));
    } else {
      alert("Make sure the years are valid!");
    }
  }

  toggleAdvanced() {
  	this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    return (
      <div className="App">
      <div id="top">
        <header>
          <img src={img} alt="Logo" />
          <h2>
            NASA<br />
            Image<br />
            Library
          </h2>
          <button id="login">Login</button>
          <VisitedText />
          <span id="heading">
            <h1>NASA Image Explorer</h1>
            <h3>Explore NASA's extensive collection of featured images!</h3>
          </span>
        </header>

        <form id="form" onSubmit={this.handleSubmit}>
          <section id="basic">
            <div>
              <label>Search terms:</label>
              <input type="text" value={this.state.q} onChange={this.handleChange} size="18" />
            </div>
            <div>
              <label><font color="red">*</font>Start year:</label>
              <input type="number" value={this.state.year_start} onChange={this.handleChange} required />
            </div>
            <div>
              <label><font color="red">*</font>End year:</label>
              <input type="number" value={this.state.year_end} onChange={this.handleChange} required />
            </div>
          </section>

          <h5 className="small_text">Fields marked with <font color="red">*</font> are required</h5>

          <h4 id="advancedBtn" className="anim_pulse small_text" onClick={this.toggleAdvanced}>Advanced search</h4>

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={350}
              transitionLeaveTimeout={350}>
              {this.state.isVisible &&
                <section id="advanced">
                  <div>
                    <label>Image title:</label><br />
                    <input type="text" value={this.state.title} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Image location:</label><br />
                    <input type="text" value={this.state.location} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Center:</label><br />
                    <input type="text" value={this.state.center} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>NASA ID:</label><br />
                    <input type="text" value={this.state.nasa_id} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Primary photographer:</label><br />
                    <input type="text" value={this.state.photographer} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Secondary photographer:</label><br />
                    <input type="text" value={this.state.secondary_creator} onChange={this.handleChange} size="15" />
                  </div>
                </section>
              }
            </ReactCSSTransitionGroup>
          <br />
          <input type="submit" className="anim_pulse" />
        </form>
      </div>
      <div>
        <TileGrid data={this.state.data} />
      </div>
      </div>
    );
  }
}

export default App;
