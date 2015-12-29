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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	var Salvager = (function (_Component) {
	  _inherits(Salvager, _Component);

	  function Salvager(props) {
	    _classCallCheck(this, Salvager);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Salvager).call(this, props));

	    _this.state = {
	      bufferStart: 0,
	      isUpdating: false,
	      rowHeight: 0,
	      rowWrapperTransform: '',
	      visibleAreaOffsetHeight: 0
	    };
	    return _this;
	  }

	  _createClass(Salvager, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.props.visibleAreaClassName,
	          onScroll: this._scrollHandler.bind(this),
	          ref: function ref(_ref2) {
	            return _this2.visibleArea = _ref2;
	          },
	          style: { overflow: 'auto' } },
	        _react2.default.createElement(
	          'ol',
	          {
	            className: this.props.rowWrapperClassName,
	            ref: function ref(_ref) {
	              return _this2.rowWrapper = _ref;
	            },
	            style: {
	              listStyleType: 'none',
	              marginBottom: 0,
	              marginTop: 0,
	              paddingLeft: 0,
	              transform: this.state.rowWrapperTransform
	            } },
	          this._buildRows()
	        ),
	        _react2.default.createElement('div', {
	          className: this.props.spacerClassName,
	          style: { height: this._getSpacerHeight() }
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

	      var RenderedRow = _Row2.default;
	      if (this.props.getRow) RenderedRow = this.props.getRow();
	      var rows = [];
	      for (var i = 0, j = this.props.bufferSize; i < j; i++) {
	        rows.push(_react2.default.createElement(
	          RenderedRow,
	          {
	            className: this.props.rowClassName,
	            key: i,
	            ref: function ref(_ref3) {
	              if (!_this3.row) _this3.row = _ref3;
	            } },
	          this.props.data[this.state.bufferStart + i]
	        ));
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
	})(_react.Component);

	exports.default = Salvager;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Row = (function (_Component) {
	  _inherits(Row, _Component);

	  function Row() {
	    _classCallCheck(this, Row);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
	  }

	  _createClass(Row, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'li',
	        {
	          className: this.props.className,
	          ref: function ref(_ref) {
	            return _this2.row = _ref;
	          } },
	        this.props.children
	      );
	    }
	  }, {
	    key: 'getHeight',
	    value: function getHeight() {
	      return this.row.offsetHeight;
	    }
	  }]);

	  return Row;
	})(_react.Component);

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
	 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isFunction;


/***/ }
/******/ ])
});
;