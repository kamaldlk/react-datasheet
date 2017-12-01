import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { filterCellExtraAttributes } from './utils/utils';

export default class DataCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {updated: false}
    this.clearTimeoutIdForSizesUpdater = null;
  }

  componentDidMount() {
    this.checkWidth();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({updated: true});
      this.timeout = setTimeout(() => this.setState({updated: false}), 700);
    }
  }

  componentDidUpdate(prevProps) {
    this.checkWidth();

    if (prevProps.editing === true && this.props.editing === false && this.props.reverting === false) {
      this.onChange(this._input.value);
    }

    if (prevProps.editing === false && this.props.editing === true) {
      if (this.props.clear) {
        this._input.value = '';
      } else {
        this._input.value = this.props.data === null ? this.props.value : this.props.data;
      }
      this._input.focus();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  checkWidth() {
    const { onWidthChange } = this.props;

    if (onWidthChange && this.clearTimeoutIdForSizesUpdater === null) {
      this.clearTimeoutIdForSizesUpdater = setTimeout(() => {
        this.clearTimeoutIdForSizesUpdater = null;

        const { width, row, col } = this.props;
        const bcr = this.cellDomNode.getBoundingClientRect();

        if (width != bcr.width + 'px') {
          onWidthChange(row, col, bcr.width);
        }
      }, 5);
    }
  }

  onChange(value) {
    const initialData = this.props.data === null ? this.props.value : this.props.data;
    (value === '' || initialData !== value) && this.props.onChange(this.props.row, this.props.col, value);
  }

  render() {
    const {
      row, col, rowSpan, readOnly, colSpan, width, overflow,
      value, className, editing, selected, onMouseDown, onMouseOver,
      onDoubleClick, onContextMenu, minWidth, extraAttributes
    } = this.props;
    const style = { width };
    const filteredExtraAttribs = filterCellExtraAttributes(extraAttributes);

    if (minWidth) {
      style.minWidth = minWidth;
    }

    return (
      <td
        ref={ ref => this.cellDomNode = ref }
        className={[
          className,
          'cell', overflow,
          selected && 'selected',
          editing && 'editing',
          readOnly && 'read-only',
          this.state.updated && 'updated'
        ].filter(a => a).join(' ') }
        onMouseDown={()=> onMouseDown(row,col)}
        onDoubleClick={()=> onDoubleClick(row,col)}
        onMouseOver={()=> onMouseOver(row,col)}
        onContextMenu={(e) => onContextMenu(e, row, col)}
        colSpan={colSpan || 1}
        rowSpan={rowSpan || 1}
        style={style}
        { ...filteredExtraAttribs }
      >
        <span style={{display: (editing && selected) ? 'none':'block'}}>
          {value}
        </span>
        <input style={{display: (editing && selected) ? 'block' : 'none'}} ref={(input) => this._input = input}/>
      </td>
    );
  }
}

DataCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  overflow: PropTypes.oneOf(['wrap', 'nowrap', 'clip']),
  selected: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  updated: PropTypes.bool,
  extraAttributes: PropTypes.object,
  onWidthChange: PropTypes.func
};
