import React, { Component } from 'react';
import Tile from './Tile';
import './TileGrid.css';

class TileGrid extends Component {
  render() {
    const items = (!this.props.data.items) ? [] :
      this.props.data.items.map(item => <Tile item={item} /> );
    return (
      <div className="grid-container">
      { items }
      </div>
    );
  }
}

export default TileGrid;
