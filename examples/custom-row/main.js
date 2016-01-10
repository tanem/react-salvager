import React from 'react';
import ReactDOM from 'react-dom';
import Salvager from '../../src/Salvager';
import Row from './Row';

import './main.scss';

ReactDOM.render(
  <Salvager
    bufferSize={25}
    data={getData(500000)}
    row={Row}
    rowClassName={'CustomRowExample-salvagerRow'}
    rowWrapperClassName={'CustomRowExample-salvagerRowWrapper'}
    visibleAreaClassName={'CustomRowExample-salvager'}
    />,
  document.querySelector('.Root')
);

function getData(size) {
  const data = [];
  for (let i = 1; i <= size; i++) data.push('Item ' + i);
  return data;
}
