(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Salvager"] = factory(require("react"));
	else
		root["Salvager"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _clamp = __webpack_require__(3);

	var _clamp2 = _interopRequireDefault(_clamp);

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Row = __webpack_require__(2);

	var _Row2 = _interopRequireDefault(_Row);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Salvager = function (_Component) {
	  _inherits(Salvager, _Component);

	  function Salvager() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Salvager);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Salvager.__proto__ || Object.getPrototypeOf(Salvager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      bufferStart: 0,
	      isUpdating: false,
	      rowHeight: 0,
	      rowWrapperTransform: '',
	      visibleAreaOffsetHeight: 0
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Salvager, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          rowWrapperStyle = _props.rowWrapperStyle,
	          spacerStyle = _props.spacerStyle,
	          visibleAreaStyle = _props.visibleAreaStyle;


	      return _react2.default.createElement(
	        'div',
	        {
	          onScroll: this._scrollHandler.bind(this),
	          ref: function ref(_ref3) {
	            return _this2.visibleArea = _ref3;
	          },
	          style: _extends({
	            overflow: 'auto'
	          }, visibleAreaStyle)
	        },
	        _react2.default.createElement(
	          'ol',
	          {
	            ref: function ref(_ref2) {
	              return _this2.rowWrapper = _ref2;
	            },
	            style: _extends({}, rowWrapperStyle, {
	              transform: this.state.rowWrapperTransform
	            })
	          },
	          this._buildRows()
	        ),
	        _react2.default.createElement('div', {
	          style: _extends({}, spacerStyle, {
	            height: this._getSpacerHeight()
	          })
	        })
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (!(0, _lodash2.default)(this.row.getHeight)) {
	        throw new Error('Row component must define a getHeight method.');
	      }
	      this.setState({
	        rowHeight: this.row.getHeight(),
	        visibleAreaOffsetHeight: this.visibleArea.offsetHeight
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return nextState.bufferStart !== this.state.bufferStart || nextState.rowHeight !== this.state.rowHeight;
	    }
	  }, {
	    key: '_buildRows',
	    value: function _buildRows() {
	      var _this3 = this;

	      var _props2 = this.props,
	          bufferSize = _props2.bufferSize,
	          data = _props2.data,
	          Row = _props2.Row,
	          rowStyle = _props2.rowStyle;

	      var rows = [];

	      for (var i = 0, j = bufferSize; i < j; i++) {
	        rows.push(_react2.default.createElement(Row, {
	          key: i,
	          ref: function ref(_ref4) {
	            if (!_this3.row) {
	              _this3.row = _ref4;
	            }
	          },
	          style: rowStyle
	        }, data[this.state.bufferStart + i]));
	      }

	      return rows;
	    }
	  }, {
	    key: '_getSpacerHeight',
	    value: function _getSpacerHeight() {
	      return (this.props.data.length - this.props.bufferSize) * this.state.rowHeight;
	    }
	  }, {
	    key: '_scrollHandler',
	    value: function _scrollHandler() {
	      if (this.state.isUpdating) return;
	      this.setState({ isUpdating: true });

	      var midPoint = this.visibleArea.scrollTop + this.state.visibleAreaOffsetHeight / 2;
	      var bufferMidPoint = Math.floor(midPoint / this.state.rowHeight);
	      var bufferStart = (0, _clamp2.default)(Math.floor(bufferMidPoint - this.props.bufferSize / 2), 0, this.props.data.length - this.props.bufferSize);

	      this.setState({
	        bufferStart: bufferStart,
	        isUpdating: false,
	        rowWrapperTransform: 'translateY(' + bufferStart * this.state.rowHeight + 'px)'
	      });
	    }
	  }]);

	  return Salvager;
	}(_react.Component);

	Salvager.propTypes = {
	  bufferSize: _react.PropTypes.number,
	  data: _react.PropTypes.array,
	  Row: _react.PropTypes.func,
	  rowStyle: _react.PropTypes.object,
	  rowWrapperStyle: _react.PropTypes.object,
	  spacerStyle: _react.PropTypes.object,
	  visibleAreaStyle: _react.PropTypes.object
	};
	Salvager.defaultProps = {
	  bufferSize: 50,
	  data: [],
	  Row: _Row2.default,
	  rowStyle: null,
	  rowWrapperStyle: null,
	  spacerStyle: null,
	  visibleAreaStyle: null
	};
	exports.default = Salvager;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Row = function (_Component) {
	  _inherits(Row, _Component);

	  function Row() {
	    _classCallCheck(this, Row);

	    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
	  }

	  _createClass(Row, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          children = _props.children,
	          style = _props.style;


	      return _react2.default.createElement(
	        'li',
	        {
	          ref: function ref(row) {
	            return _this2._row = row;
	          },
	          style: style
	        },
	        children
	      );
	    }
	  }, {
	    key: 'getHeight',
	    value: function getHeight() {
	      return this._row.offsetHeight;
	    }
	  }]);

	  return Row;
	}(_react.Component);

	Row.propTypes = {
	  children: _react.PropTypes.any,
	  style: _react.PropTypes.object
	};
	Row.defaultProps = {
	  children: null,
	  style: null
	};
	exports.default = Row;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = clamp

	function clamp(value, min, max) {
	  return min < max
	    ? (value < min ? min : value > max ? max : value)
	    : (value < max ? max : value > min ? min : value)
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isFunction;


/***/ }
/******/ ])
});
;