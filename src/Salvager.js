import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import clamp from 'clamp'

export default class Salvager extends Component {

  static propTypes = {
    bufferSize: PropTypes.number,
    rowWrapperStyle: PropTypes.object,
    spacerStyle: PropTypes.object,
    visibleAreaStyle: PropTypes.object
  }

  static defaultProps = {
    bufferSize: 50,
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
    const { bufferSize } = this.props
    const { rowHeight } = this.state

    return (this._childrenArray.length - bufferSize) * rowHeight
  }

  handleScroll = () => {
    const { bufferSize } = this.props
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
      this._childrenArray.length - bufferSize
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

  renderRows(children) {
    const { bufferSize } = this.props
    const { bufferStart } = this.state

    if (!this._childrenArray) {
      this._childrenArray = React.Children.toArray(children)
    }

    return this._childrenArray
      .slice(bufferStart, bufferStart + bufferSize)
      .map((child) =>
        React.cloneElement(
          child,
          {
            ref: (rowInstance) => {
              if (!this._rowInstance) {
                this._rowInstance = rowInstance
              }
            }
          }
        )
      )
  }

  render() {
    const {
      children,
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
        <div
          ref={rowWrapper => this._rowWrapper = rowWrapper}
          style={{
            ...rowWrapperStyle,
            transform: this.state.rowWrapperTransform
          }}
        >
          {this.renderRows(children)}
        </div>
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
