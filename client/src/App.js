import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VisitedText from './VisitedText';
import TileGrid from './TileGrid';
//import LogInBtn from './LogInBtn';
//import SignedInBtn from './SignedInBtn';
import './App.css';
import './css_lib/animate.min.css';
import img from './images/nasa_logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // JSON object returned from query to NASA image API
      data: {},
      // Number of returned items
      no_pages: -1,
      // Current page number
      page: 1,
      // Visibility of advanced search fields
      isVisible: false,
      // Login information -- EDIT?
      user_id: "",
      password: "",
      // Form data
      form: {
        q: "",
        center: "",
        location: "",
        nasa_id: "",
        photographer: "",
        secondary_creator: "",
        title: "",
        year_start: new Date().getFullYear(),
        year_end: new Date().getFullYear()
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.myRef = React.createRef();
  }

  handleChange(event) {
    var form = JSON.parse(JSON.stringify(this.state.form));
    form[event.target.name] = event.target.value;
    this.setState({ form: form });
  }

  // request to server to validate info in MongoDB
  handleLogin(event) {

  }

  handleLogout(event) {

  }

  updateData(obj=this.state.form) {
    fetch("/handleForm", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(res => {
        const json = JSON.parse(res).collection;
        const hits = json.metadata.total_hits;
        const page =
        this.setState({
          data: json,
          page: (obj.page ? obj.page : 1),
          no_pages: Math.ceil(hits/100),
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const start = parseInt(this.state.form.year_start);
    const end = parseInt(this.state.form.year_end);

    if(start <= end && end <= new Date().getFullYear()) {
      this.updateData();
    } else {
      alert("Make sure the years are valid!");
    }
  }

  handlePrevPage(event) {
    var obj = JSON.parse(JSON.stringify(this.state.form));
    if(this.state.page > 1) {
      obj["page"] = this.state.page - 1;
      this.updateData(obj);
    }
  }

  handleNextPage(event) {
    const totalPages = Math.ceil(this.state.no_items/100);
    var obj = JSON.parse(JSON.stringify(this.state.form));
    if(this.state.page < this.state.no_pages) {
      obj["page"] = this.state.page + 1;
      this.updateData(obj);
    }
  }

  toggleAdvanced() {
  	this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    var loggedIn = localStorage.loggedIn ? localStorage.loggedIn : false;
    //var button = loggedIn ? <LogInBtn /> : <SignedInBtn />;
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
              <input name="q" type="text" value={this.state.form.q} onChange={this.handleChange} size="18" />
            </div>
            <div>
              <label><font color="red">*</font>Start year:</label>
              <input name="year_start" type="number" value={this.state.form.year_start} onChange={this.handleChange} required />
            </div>
            <div>
              <label><font color="red">*</font>End year:</label>
              <input name="year_end" type="number" value={this.state.form.year_end} onChange={this.handleChange} required />
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
                    <input name="title" type="text" value={this.state.form.title} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Image location:</label><br />
                    <input name="location" type="text" value={this.state.form.location} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Center:</label><br />
                    <input name="center" type="text" value={this.state.form.center} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>NASA ID:</label><br />
                    <input name="nasa_id" type="text" value={this.state.form.nasa_id} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Primary photographer:</label><br />
                    <input name="photographer" type="text" value={this.state.form.photographer} onChange={this.handleChange} size="15" />
                  </div>
                  <div>
                    <label>Secondary photographer:</label><br />
                    <input name="secondary_creator" type="text" value={this.state.form.secondary_creator} onChange={this.handleChange} size="15" />
                  </div>
                </section>
              }
            </ReactCSSTransitionGroup>
          <br />
          <input type="submit" className="anim_pulse" />
        </form>
      </div>
      <div className="results" ref={this.myRef}>
        {this.state.no_pages >= 0 &&
          <div>
            <h4 id="showing">Showing page {this.state.page} of {this.state.no_pages}</h4>
            <div className="buttons">
              <button onClick={this.handlePrevPage}>&lt;</button>
              <button onClick={this.handleNextPage}>&gt;</button>
            </div>
            <TileGrid data={this.state.data} />
            <h4 id="showing">Showing page {this.state.page} of {this.state.no_pages}</h4>
            <div className="buttons">
              <button onClick={this.handlePrevPage}>&lt;</button>
              <button onClick={this.handleNextPage}>&gt;</button>
            </div>
          </div>
        }
      </div>
      </div>
    );
  }
}

export default App;
