import React, { Component } from 'react'

export default class Row extends Component {

  static propTypes = {
    className: React.PropTypes.string
  }

  render() {
    return (
      <li
        className={this.props.className}
        ref={(ref) => this.row = ref}
        style={{
          backgroundColor: this._getBackgroundColour()
        }}>
        {this.props.children}
      </li>
    )
  }

  getHeight() {
    return this.row.offsetHeight
  }

  _getBackgroundColour() {
    if (this.props.children.split(' ').pop() % 2 === 0) return '#eee'
    return '#fff'
  }

}
