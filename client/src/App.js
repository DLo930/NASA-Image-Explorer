import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VisitedText from './VisitedText';
import TileGrid from './TileGrid';
import './App.css';
import './css_lib/animate.min.css';
import img from './images/nasa_logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // JSON object returned from query to NASA API
      data: {},
      no_pages: -1,
      // Current page number
      page: 1,
      // Visibility of advanced search fields
      isVisible: false,
      // Login information
      loggedIn: sessionStorage.getItem("loggedIn"),
      profile: {
        email: sessionStorage.getItem("email"),
        password: "",
        favorites: {}
      },
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
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
  }

  handleLoginChange(event) {
    var profile = JSON.parse(JSON.stringify(this.state.profile));
    profile[event.target.name] = event.target.value;
    this.setState({ profile: profile });
  }

  handleFormChange(event) {
    var form = JSON.parse(JSON.stringify(this.state.form));
    form[event.target.name] = event.target.value;
    this.setState({ form: form });
  }

  handleLogin(event) {
    event.preventDefault();
    if(this.state.profile.password.length < 8) {
      alert("Password must be at least 8 characters in length.");
    } else {
      fetch("/handleLogin", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.profile)
      })
        .then(res => res.json())
        .then(res => {
          if(Object.entries(res).length !== 0) {
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("email", this.state.profile.email);
            this.setState({
              loggedIn: true,
              profile: res
            });
          } else {
            alert("Password incorrect.");
          }
        });
    }
  }

  handleLogout(event) {
    event.preventDefault();
    const profile = {
      email: "",
      password: "",
      first: "",
      last: "",
      favorites: {}
    };
    sessionStorage.setItem("loggedIn", false);
    sessionStorage.setItem("email", "");
    this.setState({ loggedIn: false, profile: profile });
  }

  // To be passed to Tile
  toggleFavorite(id) {
    var copy = Object.assign({}, this.state.profile.favorites);
    if(id in this.state.profile.favorites) delete copy[id];
    else copy[id] = true;  // true is just a placeholder for the value

    this.setState({
      profile: {
        email: this.state.profile.email,
        password: this.state.profile.password,
        favorites: copy
      }
    });
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.profile)
    });
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
        this.setState({
          data: json,
          page: (obj.page ? obj.page : Math.min(hits, 1)),
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
    const login = (
      <form id="login" onSubmit={this.handleLogin}>
        <label>Email:</label>
        <input name="email" type="email" value={this.state.profile.email} onChange={this.handleLoginChange} size="18" />
        <label>Password:</label>
        <input name="password" type="password" value={this.state.profile.password} onChange={this.handleLoginChange} size="18" />
        <input type="submit" className="anim_pulse" value="Login" />
      </form>
    );
    const loggedIn = (
      <div id="welcome">
        <h3>Welcome back, {this.state.profile.email}!</h3>
        <button className="anim_pulse" onClick={this.handleLogout}>Logout</button>
      </div>
    );
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
          {this.state.loggedIn ? loggedIn : login};
          <VisitedText loggedIn={this.state.loggedIn} />
          <span id="heading">
            <h1>NASA Image Explorer</h1>
            <h3>Explore NASA's extensive collection of featured images!</h3>
          </span>
        </header>

        <form id="form" onSubmit={this.handleSubmit}>
          <section id="basic">
            <div>
              <label>Search terms:</label>
              <input name="q" type="text" value={this.state.form.q} onChange={this.handleFormChange} size="18" />
            </div>
            <div>
              <label><font color="red">*</font>Start year:</label>
              <input name="year_start" type="number" value={this.state.form.year_start} onChange={this.handleFormChange} required />
            </div>
            <div>
              <label><font color="red">*</font>End year:</label>
              <input name="year_end" type="number" value={this.state.form.year_end} onChange={this.handleFormChange} required />
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
                  <input name="title" type="text" value={this.state.form.title} onChange={this.handleFormChange} size="15" />
                </div>
                <div>
                  <label>Image location:</label><br />
                  <input name="location" type="text" value={this.state.form.location} onChange={this.handleFormChange} size="15" />
                </div>
                <div>
                  <label>Center:</label><br />
                  <input name="center" type="text" value={this.state.form.center} onChange={this.handleFormChange} size="15" />
                </div>
                <div>
                  <label>NASA ID:</label><br />
                  <input name="nasa_id" type="text" value={this.state.form.nasa_id} onChange={this.handleFormChange} size="15" />
                </div>
                <div>
                  <label>Primary photographer:</label><br />
                  <input name="photographer" type="text" value={this.state.form.photographer} onChange={this.handleFormChange} size="15" />
                </div>
                <div>
                  <label>Secondary photographer:</label><br />
                  <input name="secondary_creator" type="text" value={this.state.form.secondary_creator} onChange={this.handleFormChange} size="15" />
                </div>
              </section>
            }
          </ReactCSSTransitionGroup>
          <br />
          <input type="submit" className="anim_pulse" />
        </form>
      </div>
      <div className="results">
        {this.state.no_pages >= 0 &&
          <div>
            <h4 id="showing">Showing page {this.state.page} of {this.state.no_pages}</h4>
            <div className="buttons">
              <button onClick={this.handlePrevPage}>&lt;</button>
              <button onClick={this.handleNextPage}>&gt;</button>
            </div>
            <TileGrid
              loggedIn={this.state.loggedIn}
              data={this.state.data}
              favorites={this.state.profile.favorites}
              toggleFavorite={this.toggleFavorite}
            />
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
