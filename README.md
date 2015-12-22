# react-salvager

[![build status](https://img.shields.io/travis/tanem/react-salvager/master.svg?style=flat-square)](https://travis-ci.org/tanem/react-salvager)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/react-salvager.svg)](https://saucelabs.com/u/react-salvager)

_Work in progress_

A React port of [salvager](https://github.com/tanem/salvager).

## Examples

Two examples are contained in the `examples/` dir. In order to view them, you'll first need to kick off the server via `npm start`. Note that the server itself is actually a [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with [react hot loading](https://github.com/gaearon/react-hot-loader) enabled, so you can use this setup for development too.

- The default example uses the built-in `Row` component, and can be viewed at `http://localhost:3000/examples/default/`
- The custom example uses a custom `Row` component, and can be viewed at `http://localhost:3000/examples/custom/`

## Testing

[Karma](http://karma-runner.github.io/0.13/index.html) is used to run the tests in real browsers, since we need to read `offsetHeight` and something like [jsdom](https://github.com/tmpvar/jsdom) [doesn't cut the mustard yet](https://github.com/tmpvar/jsdom/issues/135).

To run the tests locally using Chrome:

```
$ npm run test:local
```

Travis will also run the tests via [Sauce Labs](https://saucelabs.com/) when changes are pushed.

## License

MIT
