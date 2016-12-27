import React from 'react'
import ReactDOM from 'react-dom'

import Salvager from '../src/Salvager'
import Row from './Row'

ReactDOM.render(
  <Salvager
    bufferSize={25}
    rowWrapperStyle={{
      listStyleType: 'none',
      marginBottom: 0,
      marginTop: 0,
      paddingLeft: 0
    }}
    visibleAreaStyle={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      height: 400,
      width: 300
    }}
  >
    {getRows(500000)}
  </Salvager>,
  document.querySelector('.Root')
)

function getRows(number) {
  return new Array(number)
    .fill(0)
    .map((v, i) =>
      <Row key={`${i + 1}`}>{`Item ${i + 1}`}</Row>
    )
}
