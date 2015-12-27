import React, { Component } from 'react';

export default class Row extends Component {

  render() {
    return (
      <li
        className={this.props.className}
        ref={(ref) => this.row = ref}>
        {this.props.children}
      </li>
    );
  }

  getHeight() {
    return this.row.offsetHeight;
  }

}
