import React, { Component, PropTypes } from 'react'

export default class Row extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {
    children: null
  }

  getBackgroundColour() {
    return this.props.children.split(' ').pop() % 2 === 0 ?
      '#eee' :
      '#fff'
  }

  render() {
    return (
      <li style={{
        backgroundColor: this.getBackgroundColour(),
        padding: 10
      }}>
        {this.props.children}
      </li>
    )
  }

}
