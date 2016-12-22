import React, { Component, PropTypes } from 'react'

export default class Row extends Component {

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
  }

  static defaultProps = {
    children: null,
    style: null
  }

  getHeight() {
    return this._row.offsetHeight
  }
  
  render() {
    const {
      children,
      style
    } = this.props

    return (
      <li
        ref={row => this._row = row}
        style={style}
      >
        {children}
      </li>
    )
  }

}
