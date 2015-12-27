import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Salvager from '../../src/Salvager';

import './main.scss';

ReactDOM.render(
  <Salvager
    visibleAreaClassName={'Salvager-visibleArea'}
    bufferSize={50}
    data={getData(500000)}
    getRow={getRow}
    />,
  document.querySelector('.Root')
);

function getData(size) {
  const data = [];
  for (let i = 1; i <= size; i++) data.push('Item ' + i);
  return data;
}

function getRow() {
  return class Row extends Component {

    render() {
      return (
        <li
          className={this.props.className}
          ref={(ref) => this.row = ref}
          style={{
            backgroundColor: this._getBackgroundColour(),
            padding: 10
          }}>
          {this.props.children}
        </li>
      );
    }

    getHeight() {
      return this.row.offsetHeight;
    }

    _getBackgroundColour() {
      if (this.props.children.split(' ').pop() % 2 === 0) return '#eee';
      return '#fff';
    }

  };
}
