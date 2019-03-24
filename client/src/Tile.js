import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Set url upon initialization
    fetch(this.props.item.href)
      .then(res => res.json())
      .then(res => {
        this.setState({ url: res[0] });
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
      <Popup trigger={trigger} modal>
        <div>
          <h3>{data.title}</h3>
          <img src={this.state.url} />
          <h4 className="small_text">NASA ID: {data.nasa_id}</h4>
          <h4 className="small_text">Center: {data.center}</h4>
          <br />
          <p>{data.description}</p>
        </div>
      </Popup>
    );
  }
}

export default Tile;
