import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import ShareComponent from './ShareComponent';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch(this.props.item.href)
      .then(res => res.json())
      .then(res => {
        const id = this.props.item.data[0].nasa_id;
        this.setState({
          favorited: (id in this.props.favorites),
          url_med: res[2],
          url_orig: res[0]
        });
      });

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(JSON.stringify(this.props.item) !== JSON.stringify(prevProps.item)) {
      fetch(this.props.item.href)
        .then(res => res.json())
        .then(res => {
          this.setState({ url_med: res[2], url_orig: res[0] });
        });
    }
  }

  handleFavorite() {
    if(this.props.loggedIn) {
      this.setState({ favorited: !this.state.favorited });
      this.props.toggleFavorite(this.props.item.nasa_id);
    }
  }

  render() {
    const item = this.props.item;
    const data = item.data[0];
    const fav = this.state.favorited ? "grid-item fav" : "grid-item";
    const trigger = (
      <div className={fav}>
        <h4>{data.title}</h4>
        <img src={item.links[0].href} alt="preview" />
      </div>
    );
    return (
      <Popup className="popup" trigger={trigger} modal>
        <div className="modal">
          <h3 className="title">{data.title}</h3>
          <div className="row">
            <div className="column left">
              <img src={this.state.url_med} alt="" />
              <h4 className="label small_text">NASA ID: {data.nasa_id}</h4>
              <h4 className="label small_text">Center: {data.center}</h4>
            </div>
            <div className="column">
              <p>{data.description}</p>
              {this.props.loggedIn &&
                <button className="fav" onClick={this.handleFavorite}>Favorite</button>
              }
            </div>
          </div>
          <div className="share">
            <ShareComponent url_orig={this.state.url_orig}/>
          </div>
        </div>
      </Popup>
    );
  }
}

export default Tile;
