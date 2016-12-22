import React, { Component, PropTypes } from 'react'

export default class Row extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  getHeight() {
    return this._row.offsetHeight
  }

  getBackgroundColour() {
    if (this.props.children.split(' ').pop() % 2 === 0) {
      return '#eee'
    }

    return '#fff'
  }

  render() {
    return (
      <li
        ref={row => this._row = row}
        style={{
          backgroundColor: this.getBackgroundColour(),
          padding: 10
        }}>
        {this.props.children}
      </li>
    )
  }

}
