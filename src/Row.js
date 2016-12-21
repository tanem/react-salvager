import React, { Component, PropTypes } from 'react'

export default class Row extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <li
        className={this.props.className}
        ref={(ref) => this.row = ref}>
        {this.props.children}
      </li>
    )
  }

  getHeight() {
    return this.row.offsetHeight
  }

}
