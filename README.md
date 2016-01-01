# react-salvager

[![build status](https://img.shields.io/travis/tanem/react-salvager/master.svg?style=flat-square)](https://travis-ci.org/tanem/react-salvager)
[![coverage status](https://img.shields.io/coveralls/tanem/react-salvager.svg?style=flat-square)](https://coveralls.io/github/tanem/react-salvager)
[![npm version](https://img.shields.io/npm/v/react-salvager.svg?style=flat-square)](https://www.npmjs.com/package/react-salvager)
[![npm downloads](https://img.shields.io/npm/dm/react-salvager.svg?style=flat-square)](https://www.npmjs.com/package/react-salvager)
[![dependency status](https://david-dm.org/tanem/react-salvager.svg?style=flat-square)](https://david-dm.org/tanem/react-salvager)
[![devDependency status](https://david-dm.org/tanem/react-salvager/dev-status.svg?style=flat-square)](https://david-dm.org/tanem/react-salvager#info=devDependencies)
[![peerDependency status](https://david-dm.org/tanem/react-salvager/peer-status.svg?style=flat-square)](https://david-dm.org/tanem/react-salvager#info=peerDependencies)

[![sauce test status](https://saucelabs.com/browser-matrix/react-salvager.svg)](https://saucelabs.com/u/react-salvager)

A [React](http://facebook.github.io/react/) port of [salvager](https://github.com/tanem/salvager):

> Reuse row elements when displaying large datasets. This is beneficial to performance since the number of row elements rendered to the DOM is fixed, no matter how big the dataset is.

The algorithm used in this port is simpler than the one used in the original salvager module. This came about after thinking more carefully about [the minimal set of mutable state](https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) this port needed.

It's also worth noting that I'm not personally using this port in a production situation yet :smirk:

## Installation

```
$ npm install react-salvager --save
```

You can also use the [UMD](https://github.com/umdjs/umd) build by including `dist/Salvager.js` in your page. If you use this, make sure you have already included React as a dependency.

## Usage

Two usage examples are contained in the `examples/` dir. In order to view them, you'll first need to kick off the server via `npm start`. Note that the server itself is actually a [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with [react hot loading](https://github.com/gaearon/react-hot-loader) enabled, so you can use this setup for development too.

- The default example uses the built-in `Row` component, and can be viewed at `http://localhost:3000/examples/default/`
- The custom example uses a custom `Row` component, and can be viewed at `http://localhost:3000/examples/custom/`

## Testing

[Karma](http://karma-runner.github.io/0.13/index.html) is used to run the tests in real browsers, since we need to read `offsetHeight` and something like [jsdom](https://github.com/tmpvar/jsdom) [doesn't implement what we need yet](https://github.com/tmpvar/jsdom/issues/135).

To run the tests locally using Chrome:

```
$ npm run test:local
```

Travis will also run the tests via [Sauce Labs](https://saucelabs.com/) when changes are pushed. To view the code coverage report, open `coverage/html/index.html` in a browser.

## License

MIT
