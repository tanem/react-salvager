import React, { Component } from 'react';

export default class Row extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div
        className="Salvager-row"
        ref={(ref) => this.row = ref}>
        {this.props.children}
      </div>
    );
  }

  getHeight() {
    return this.row.offsetHeight;
  }

}
