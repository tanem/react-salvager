# react-salvager

[![build status](https://img.shields.io/travis/tanem/react-salvager/master.svg?style=flat-square)](https://travis-ci.org/tanem/react-salvager)
[![coverage status](https://img.shields.io/coveralls/tanem/react-salvager.svg?style=flat-square)](https://coveralls.io/github/tanem/react-salvager)
[![npm version](https://img.shields.io/npm/v/react-salvager.svg?style=flat-square)](https://www.npmjs.com/package/react-salvager)
[![npm downloads](https://img.shields.io/npm/dm/react-salvager.svg?style=flat-square)](https://www.npmjs.com/package/react-salvager)

[![sauce test status](https://saucelabs.com/browser-matrix/react-salvager.svg)](https://saucelabs.com/u/react-salvager)

A [React](http://facebook.github.io/react/) port of [salvager](https://github.com/tanem/salvager):

> Reuse row elements when displaying large datasets. This is beneficial to performance since the number of row elements rendered to the DOM is fixed, no matter how big the dataset is.

The algorithm used in this port is simpler than the one used in the original salvager module. This came about after thinking more carefully about [the minimal set of mutable state](https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) this port needed.

It's also worth noting that I'm not personally using this port in a production situation yet :smirk:

## Installation

```
$ npm install react-salvager --save
```

There are also UMD builds available via [unpkg](https://unpkg.com/):

- https://unpkg.com/react-salvager/dist/react-salvager.js
- https://unpkg.com/react-salvager/dist/react-salvager.min.js

If you use these, make sure you have already included React as a dependency.

## Usage

There is a working example contained in the `example/` dir. To view it, start the server via `npm start`, then point a browser at `http://localhost:3000/example/`.

Note that the server itself is actually a [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with [react hot loading](https://github.com/gaearon/react-hot-loader) enabled, so you can use this setup for development too.

## API

__Props__

- `bufferSize` - *Optional* Number of row rendered to the DOM. Defaults to `50`.
- `rowWrapperStyle` - *Optional* Extra style added to the row wrapper.
- `spacerStyle` - *Optional* Extra style added to the spacer.
- `visibleAreaStyle` - *Optional* Extra style added to the visible area (root node).

__Example__

```js
// Note that row items can be any valid React element.

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
  <div key="1">Item 1</div>
  <div key="2">Item 2</div>
  ...
  <div key="9999">Item 9999</div>
  <div key="10000">Item 10000<div>
</Salvager>
```

## Testing

[Karma](http://karma-runner.github.io/0.13/index.html) is used to run the tests in real browsers, since we need to read `offsetHeight` and something like [jsdom](https://github.com/tmpvar/jsdom) [doesn't implement what we need yet](https://github.com/tmpvar/jsdom/issues/135).

To run the tests locally using Chrome:

```
$ npm test -- local
```

Travis will also run the tests via [Sauce Labs](https://saucelabs.com/) when changes are pushed. To view the code coverage report, open `coverage/html/index.html` in a browser.

## License

MIT
