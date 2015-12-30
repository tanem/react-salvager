import React from 'react';
import ReactDOM from 'react-dom';
import Salvager from '../../src/Salvager';
import Row from './Row';

import './main.scss';

ReactDOM.render(
  <Salvager
    visibleAreaClassName={'Salvager-visibleArea'}
    bufferSize={50}
    data={getData(500000)}
    row={Row}
    />,
  document.querySelector('.Root')
);

function getData(size) {
  const data = [];
  for (let i = 1; i <= size; i++) data.push('Item ' + i);
  return data;
}
