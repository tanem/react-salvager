import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import $ from 'jquery';
import Salvager from '../src/Salvager';

import './styles.scss';

function getRow() {
  return class Row extends Component {
    render() {
      return (
        <div>{this.props.children}</div>
      );
    }

    getHeight() {
      return 20;
    }
  };
}

describe('Salvager', () => {

  let root;
  let visibleArea;
  let rowWrapper;
  let spacer;
  let scroll;
  let getHeight;
  let getTransform;

  beforeEach((done) => {
    root = document.createElement('div');
    document.body.appendChild(root);
    render(
      <Salvager
        visibleAreaClassName={'Salvager-visibleArea'}
        rowWrapperClassName={'Salvager-rowWrapper'}
        spacerClassName={'Salvager-spacer'}
        bufferSize={4}
        data={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
        getRow={getRow}
      />,
      root,
      () => {
        visibleArea = $(root).find('.Salvager-visibleArea').get(0);
        rowWrapper = $(root).find('.Salvager-rowWrapper').get(0);
        spacer = $(root).find('.Salvager-spacer').get(0);
        scroll = (amount) => {
          visibleArea.scrollTop = amount;
          ReactTestUtils.Simulate.scroll(visibleArea);
        };
        getHeight = (el) => el.style.height;
        getTransform = () => rowWrapper.style.transform;
        done();
      }
    );
  });

  afterEach(() => document.body.removeChild(root));

  it('should calculate the correct spacer height', () => {
    expect(getHeight(spacer)).to.equal('40px');
  });

  it('shouldn\'t update the row buffer if the scroll was insignificant', () => {
    const orglTransform = getTransform();
    scroll(10);
    expect(getTransform()).to.equal(orglTransform);
  });

  it('should update the row buffer if the scroll was significant', () => {
    scroll(40);
    expect(getTransform()).to.equal('translateY(20px)');
  });

});
