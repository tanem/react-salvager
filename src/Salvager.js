import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import clamp from 'clamp'

import Row from './Row'

export default class Salvager extends Component {

  static propTypes = {
    bufferSize: PropTypes.number,
    data: PropTypes.array,
    Row: PropTypes.func,
    rowStyle: PropTypes.object,
    rowWrapperStyle: PropTypes.object,
    spacerStyle: PropTypes.object,
    visibleAreaStyle: PropTypes.object
  }

  static defaultProps = {
    bufferSize: 50,
    data: [],
    Row,
    rowStyle: null,
    rowWrapperStyle: null,
    spacerStyle: null,
    visibleAreaStyle: null
  }

  state = {
    bufferStart: 0,
    isUpdating: false,
    rowHeight: 0,
    rowWrapperTransform: '',
    visibleAreaOffsetHeight: 0
  }

  componentDidMount() {
    this.setState({
      rowHeight: this.getRowHeight(ReactDOM.findDOMNode(this._rowInstance)),
      visibleAreaOffsetHeight: this._visibleArea.offsetHeight
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.bufferStart !== this.state.bufferStart ||
      nextState.rowHeight !== this.state.rowHeight
    )
  }

  getSpacerHeight() {
    const {
      bufferSize,
      data
    } = this.props

    return (data.length - bufferSize) * this.state.rowHeight
  }

  handleScroll = () => {
    const {
      bufferSize,
      data
    } = this.props

    const {
      rowHeight,
      visibleAreaOffsetHeight
    } = this.state

    if (this.state.isUpdating) {
      return
    }

    this.setState({
      isUpdating: true
    })

    const midPoint = this._visibleArea.scrollTop + visibleAreaOffsetHeight / 2
    const bufferMidPoint = Math.floor(midPoint / rowHeight)
    let bufferStart = clamp(
      Math.floor(bufferMidPoint - bufferSize / 2),
      0,
      data.length - bufferSize
    )

    this.setState({
      bufferStart,
      isUpdating: false,
      rowWrapperTransform: `translateY(${bufferStart * rowHeight}px)`
    })
  }

  getRowHeight(rowDOMNode) {
    return rowDOMNode.offsetHeight
  }

  renderRows() {
    const {
      bufferSize,
      data,
      Row,
      rowStyle
    } = this.props
    const rows = []

    for (let i = 0, j = bufferSize; i < j; i++) {
      rows.push(
        React.createElement(
          Row,
          {
            key: i,
            ref: (rowInstance) => {
              if (!this._rowInstance) {
                this._rowInstance = rowInstance
              }
            },
            style: rowStyle
          },
          data[this.state.bufferStart + i]
        )
      )
    }

    return rows
  }

  render() {
    const {
      rowWrapperStyle,
      spacerStyle,
      visibleAreaStyle
    } = this.props

    return (
      <div
        onScroll={this.handleScroll}
        ref={visibleArea => this._visibleArea = visibleArea}
        style={{
          overflow: 'auto',
          ...visibleAreaStyle
        }}
      >
        <ol
          ref={rowWrapper => this._rowWrapper = rowWrapper}
          style={{
            ...rowWrapperStyle,
            transform: this.state.rowWrapperTransform
          }}
        >
          {this.renderRows()}
        </ol>
        <div
          style={{
            ...spacerStyle,
            height: this.getSpacerHeight()
          }}
        />
      </div>
    )
  }

}
