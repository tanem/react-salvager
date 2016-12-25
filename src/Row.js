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

  render() {
    const {
      children,
      style
    } = this.props

    return (
      <li style={style}>
        {children}
      </li>
    )
  }

}
