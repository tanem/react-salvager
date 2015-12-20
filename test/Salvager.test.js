import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import Salvager from '../src/Salvager';

describe('Salvager', () => {

  it('should calculate the correct spacer height', () => {
    const salvager = ReactTestUtils.renderIntoDocument(
      <Salvager
        bufferSize={3}
        data={[1, 2, 3, 4, 5]}
        />
    );
    const spacer = ReactTestUtils.scryRenderedDOMComponentsWithClass(salvager, 'Salvager-spacer');
    console.log(spacer);
  });

  it('shouldn\'t update the row buffer if the scroll was insignificant');

  it('should update the row buffer if the scroll was significant');

  it('should allow specification of a custom row component');

});
