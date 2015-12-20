import React, { Component } from 'react';

export default class Row extends Component {

  render() {
    return (
      <div
        className={this.props.className}
        ref={(ref) => this.row = ref}>
        {this.props.children}
      </div>
    );
  }

  getHeight() {
    return this.row.offsetHeight;
  }

}
