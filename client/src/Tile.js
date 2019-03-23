import React, { Component } from 'react';
import './Tile.css';

class Tile extends Component {
  render() {
    const item = this.props.item;
    const data = item.data[0];
    return (
      <div className="grid-item">
        <h4>{data.title}</h4>
        <img src={item.links[0].href} alt="preview" />
      </div>
    );
  }
}

export default Tile;
