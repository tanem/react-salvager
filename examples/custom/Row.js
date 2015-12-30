import React, { Component } from 'react';

export default class Row extends Component {

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

}
