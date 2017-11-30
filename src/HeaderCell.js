import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class HeaderCell extends PureComponent {
  constructor(props) {
    super(props);
    this.clearTimeoutIdForSizesUpdater = null;
  }

  componentDidMount() {
    this.checkWidth();
  }

  componentDidUpdate() {
    this.checkWidth();
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

  render() {
    const {
      row, col, rowSpan, colSpan, width, minWidth,
      overflow, className, value, component
    } = this.props;
    const style = { width };
    const fullCN = [
      className, 'header-cell', 'cell',
      'read-only', overflow
    ].filter(a => a).join(' ');

    if (minWidth) {
      style.minWidth = minWidth;
    }

    return (
      <th
        ref={ ref => this.cellDomNode = ref }
        className={ fullCN }
        colSpan={ colSpan || 1 }
        rowSpan={ rowSpan || 1 }
        style={ style }
      >
        {
          component ?
            component :
            (
              <span style={{display: 'block'}}>
                { value }
              </span>
            )
        }
      </th>
    );
  }
}

HeaderCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  overflow: PropTypes.oneOf(['wrap', 'nowrap', 'clip']),
  className: PropTypes.string,
  component: PropTypes.element,
  onWidthChange: PropTypes.func
};

export default HeaderCell;