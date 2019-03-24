import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import ShareComponent from './ShareComponent';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Set url upon initialization
    fetch(this.props.item.href)
      .then(res => res.json())
      .then(res => {
        this.setState({ url_med: res[2], url_orig: res[0] });
      });
  }

  render() {
    const item = this.props.item;
    const data = item.data[0];
    const trigger = (
      <div className="grid-item">
        <h4>{data.title}</h4>
        <img src={item.links[0].href} alt="preview" />
      </div>
    );
    return (
      <Popup className="popup" trigger={trigger} modal>
        <div className="modal">
          <h3 className="center">{data.title}</h3>
          <div className="row">
            <div className="column left">
              <img src={this.state.url_med} />
              <h4 className="label small_text">NASA ID: {data.nasa_id}</h4>
              <h4 className="label small_text">Center: {data.center}</h4>
            </div>
            <div className="column">
              <p>{data.description}</p>
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
