'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComponentCell = function (_PureComponent) {
  _inherits(ComponentCell, _PureComponent);

  function ComponentCell(props) {
    _classCallCheck(this, ComponentCell);

    var _this = _possibleConstructorReturn(this, (ComponentCell.__proto__ || Object.getPrototypeOf(ComponentCell)).call(this, props));

    _this.state = { updated: false };
    return _this;
  }

  _createClass(ComponentCell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkWidth();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var _this2 = this;

      if (nextProps.value !== this.props.value) {
        this.setState({ updated: true });
        this.timeout = setTimeout(function () {
          _this2.setState({ updated: false });
        }, 700);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.checkWidth();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'checkWidth',
    value: function checkWidth() {
      var _props = this.props,
          onWidthChange = _props.onWidthChange,
          width = _props.width,
          row = _props.row,
          col = _props.col;


      if (onWidthChange) {
        var bcr = this.cellDomNode.getBoundingClientRect();

        if (width != bcr.width + 'px') {
          onWidthChange(row, col, bcr.width);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          row = _props2.row,
          col = _props2.col,
          readOnly = _props2.readOnly,
          forceComponent = _props2.forceComponent,
          rowSpan = _props2.rowSpan,
          colSpan = _props2.colSpan,
          width = _props2.width,
          overflow = _props2.overflow,
          value = _props2.value,
          className = _props2.className,
          editing = _props2.editing,
          selected = _props2.selected,
          _onMouseDown = _props2.onMouseDown,
          _onMouseOver = _props2.onMouseOver,
          _onDoubleClick = _props2.onDoubleClick,
          _onContextMenu = _props2.onContextMenu,
          minWidth = _props2.minWidth,
          extraAttributes = _props2.extraAttributes;

      var style = { width: width };
      var filteredExtraAttribs = (0, _utils.filterCellExtraAttributes)(extraAttributes);

      if (minWidth) {
        style.minWidth = minWidth;
      }

      return _react2.default.createElement(
        'td',
        _extends({
          ref: function ref(_ref) {
            return _this3.cellDomNode = _ref;
          },
          className: [className, 'cell', overflow, editing && 'editing', selected && 'selected', this.state.updated && 'updated'].filter(function (a) {
            return a;
          }).join(' '),
          onMouseDown: function onMouseDown() {
            return _onMouseDown(row, col);
          },
          onDoubleClick: function onDoubleClick() {
            return _onDoubleClick(row, col);
          },
          onMouseOver: function onMouseOver() {
            return _onMouseOver(row, col);
          },
          onContextMenu: function onContextMenu(e) {
            return _onContextMenu(e, row, col);
          }, colSpan: colSpan || 1,
          rowSpan: rowSpan || 1,
          style: style
        }, filteredExtraAttribs),
        editing && !readOnly || forceComponent ? this.props.component : value
      );
    }
  }]);

  return ComponentCell;
}(_react.PureComponent);

exports.default = ComponentCell;


ComponentCell.propTypes = {
  row: _propTypes2.default.number.isRequired,
  col: _propTypes2.default.number.isRequired,
  colSpan: _propTypes2.default.number,
  rowSpan: _propTypes2.default.number,
  width: _propTypes2.default.string,
  minWidth: _propTypes2.default.string,
  overflow: _propTypes2.default.oneOf(['wrap', 'nowrap', 'clip']),
  className: _propTypes2.default.string,
  selected: _propTypes2.default.bool.isRequired,
  editing: _propTypes2.default.bool.isRequired,
  onMouseDown: _propTypes2.default.func.isRequired,
  onDoubleClick: _propTypes2.default.func.isRequired,
  onMouseOver: _propTypes2.default.func.isRequired,
  onContextMenu: _propTypes2.default.func.isRequired,
  updated: _propTypes2.default.bool,
  forceComponent: _propTypes2.default.bool,
  extraAttributes: _propTypes2.default.object,
  onWidthChange: _propTypes2.default.func
};