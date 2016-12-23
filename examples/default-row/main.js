import React from 'react'
import ReactDOM from 'react-dom'
import Salvager from '../../src/Salvager'

ReactDOM.render(
  <Salvager
    bufferSize={25}
    data={getData(500000)}
    rowStyle={{
      padding: 10
    }}
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
  />,
  document.querySelector('.Root')
)

function getData(size) {
  return new Array(size)
    .fill(0)
    .map((v, i) => `Item ${i + 1}`)
}
