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
      rowWrapperTransform: '',
      visibleAreaOffsetHeight: 0
    };
  }

  render() {
    return (
      <div
        className={this.props.visibleAreaClassName}
        onScroll={this._scrollHandler.bind(this)}
        ref={(ref) => this.visibleArea = ref}
        style={{ overflow: 'auto' }}>
        <ol
          className={this.props.rowWrapperClassName}
          ref={(ref) => this.rowWrapper = ref}
          style={{
            listStyleType: 'none',
            marginBottom: 0,
            marginTop: 0,
            paddingLeft: 0,
            transform: this.state.rowWrapperTransform
          }}>
          {this._buildRows()}
        </ol>
        <div
          className={this.props.spacerClassName}
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.bufferStart !== this.state.bufferStart ||
      nextState.rowHeight !== this.state.rowHeight
    );
  }

  _buildRows() {
    const rows = [];
    for (let i = 0, j = this.props.bufferSize; i < j; i++) {
      rows.push(
        <this.props.row
          className={this.props.rowClassName}
          key={i}
          ref={(ref) => { if (!this.row) this.row = ref; }}>
          {this.props.data[this.state.bufferStart + i]}
        </this.props.row>
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

    this.setState({
      bufferStart,
      isUpdating: false,
      rowWrapperTransform: `translateY(${bufferStart * this.state.rowHeight}px)`
    });
  }

}

Salvager.propTypes = {
  bufferSize: React.PropTypes.number,
  data: React.PropTypes.array,
  row: React.PropTypes.func,
  rowClassName: React.PropTypes.string,
  rowWrapperClassName: React.PropTypes.string,
  spacerClassName: React.PropTypes.string,
  visibleAreaClassName: React.PropTypes.string
};

Salvager.defaultProps = {
  bufferSize: 50,
  data: [],
  row: Row
};
