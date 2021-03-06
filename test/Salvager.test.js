import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import $ from 'jquery'

import Salvager from '../src/Salvager'

const getRows = (number) =>
  new Array(number)
    .fill(0)
    .map((v, i) =>
      <div
        key={`${i + 1}`}
        style={{ height: 20 }}
      >
        {`Item ${i + 1}`}
      </div>
    )

describe('Salvager', () => {
  let root
  let visibleArea
  let rowWrapper
  let spacer
  let scroll
  let getHeight
  let getTransform

  beforeEach((done) => {
    root = document.createElement('div')
    document.body.appendChild(root)
    render(
      <Salvager
        visibleAreaStyle={{
          height: 40,
          width: 100
        }}
        bufferSize={4}
      >
        {getRows(6)}
      </Salvager>,
      root,
      () => {
        visibleArea = $(root).find('> div').get(0)
        rowWrapper = $(root).find('> div > div:first-child').get(0)
        spacer = $(root).find('> div > div:last-child').get(0)
        scroll = (amount) => {
          visibleArea.scrollTop = amount
          ReactTestUtils.Simulate.scroll(visibleArea)
        }
        getHeight = (el) => el.style.height
        getTransform = () => rowWrapper.style.transform
        done()
      }
    )
  })

  afterEach(() => document.body.removeChild(root))

  it('should calculate the correct spacer height', () => {
    expect(getHeight(spacer)).to.equal('40px')
  })

  it('shouldn\'t update the row buffer if the scroll was insignificant', () => {
    const orglTransform = getTransform()
    scroll(10)
    expect(getTransform()).to.equal(orglTransform)
    expect(
      [ ...$(root).find('> div > div:first-child > div') ].map((row) => $(row).text())
    ).to.deep.equal(
      [ 'Item 1', 'Item 2', 'Item 3', 'Item 4' ]
    )
  })

  it('should update the row buffer if the scroll was significant', () => {
    scroll(40)
    expect(getTransform()).to.equal('translateY(20px)')
    expect(
      [ ...$(root).find('> div > div:first-child > div') ].map((row) => $(row).text())
    ).to.deep.equal(
      [ 'Item 2', 'Item 3', 'Item 4', 'Item 5' ]
    )
  })

})
