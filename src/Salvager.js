import React, { Component } from 'react';
import clamp from 'clamp';
import isFunction from 'lodash.isfunction';
import Row from './Row';

export default class Salvager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bufferStart: 0,
      isUpdating: false,
      rowHeight: 0,
      rowWrapperTransform: ''
    };
  }

  render() {
    return (
      <div
        className={this.props.className}
        onScroll={this._scrollHandler.bind(this)}
        ref={(ref) => this.visibleArea = ref}
        style={{ position: 'relative' }}>
        <div
          ref={(ref) => this.rowWrapper = ref}
          style={{ transform: this.state.rowWrapperTransform }}>
          {this._buildRows()}
        </div>
        <div
          style={{ height: this._getSpacerHeight() }}
        />
      </div>
    );
  }

  componentDidMount() {
    if (!isFunction(this.row.getHeight)) {
      throw new Error('Row component must define a getHeight method.');
    }
    this.setState({
      rowHeight: this.row.getHeight(),
      visibleAreaOffsetHeight: this.visibleArea.offsetHeight
    });
  }

  _buildRows() {
    let RenderedRow = Row;
    if (this.props.getRow) RenderedRow = this.props.getRow();
    const rows = [];
    for (let i = 0, j = this.props.bufferSize; i < j; i++) {
      rows.push(
        <RenderedRow
          key={i}
          ref={(ref) => { if (!this.row) this.row = ref; }}>
          {this.props.data[this.state.bufferStart + i]}
        </RenderedRow>
      );
    }
    return rows;
  }

  _getSpacerHeight() {
    return (this.props.data.length - this.props.bufferSize) * this.state.rowHeight;
  }

  _scrollHandler() {
    if (this.state.isUpdating) return;
    this.setState({ isUpdating: true });

    const midPoint = this.visibleArea.scrollTop + this.state.visibleAreaOffsetHeight / 2;
    const bufferMidPoint = Math.floor(midPoint / this.state.rowHeight);
    let bufferStart = clamp(Math.floor(bufferMidPoint - this.props.bufferSize / 2), 0, this.props.data.length - this.props.bufferSize);

    if (bufferStart === this.state.bufferStart) {
      return this.setState({ isUpdating: false });
    }

    this.setState({
      bufferStart,
      isUpdating: false,
      rowWrapperTransform: `translateY(${bufferStart * this.state.rowHeight}px)`
    });
  }

}
