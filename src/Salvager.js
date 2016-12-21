import React, { Component, PropTypes } from 'react'
import clamp from 'clamp'
import isFunction from 'lodash.isfunction'

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

  render() {
    const {
      rowWrapperStyle,
      spacerStyle,
      visibleAreaStyle
    } = this.props

    return (
      <div
        onScroll={this._scrollHandler.bind(this)}
        ref={ref => this.visibleArea = ref}
        style={{
          overflow: 'auto',
          ...visibleAreaStyle
        }}
      >
        <ol
          ref={ref => this.rowWrapper = ref}
          style={{
            ...rowWrapperStyle,
            transform: this.state.rowWrapperTransform
          }}
        >
          {this._buildRows()}
        </ol>
        <div
          style={{
            ...spacerStyle,
            height: this._getSpacerHeight()
          }}
        />
      </div>
    )
  }

  componentDidMount() {
    if (!isFunction(this.row.getHeight)) {
      throw new Error('Row component must define a getHeight method.')
    }
    this.setState({
      rowHeight: this.row.getHeight(),
      visibleAreaOffsetHeight: this.visibleArea.offsetHeight
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.bufferStart !== this.state.bufferStart ||
      nextState.rowHeight !== this.state.rowHeight
    )
  }

  _buildRows() {
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
            ref: (ref) => {
              if (!this.row) {
                this.row = ref
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

  _getSpacerHeight() {
    return (this.props.data.length - this.props.bufferSize) * this.state.rowHeight
  }

  _scrollHandler() {
    if (this.state.isUpdating) return
    this.setState({ isUpdating: true })

    const midPoint = this.visibleArea.scrollTop + this.state.visibleAreaOffsetHeight / 2
    const bufferMidPoint = Math.floor(midPoint / this.state.rowHeight)
    let bufferStart = clamp(Math.floor(bufferMidPoint - this.props.bufferSize / 2), 0, this.props.data.length - this.props.bufferSize)

    this.setState({
      bufferStart,
      isUpdating: false,
      rowWrapperTransform: `translateY(${bufferStart * this.state.rowHeight}px)`
    })
  }

}
