/**
 * Stateless component which render a header cell for the Datasheet
 * header rows.
 *
 * @param {object} props Component props
 * @param {int | float | bool | string} props.value Header cell value (label)
 * @param {ReactElement} Cell component to render instead of the value.
 * @param {int} props.row Row of the header.
 * @param {int} props.col Col of the row.
 * @param {int} props.rowSpan Table cell row span.
 * @param {int} props.colSpan Table cell row span.
 * @param {string} props.overflow Cell overflow className. One of - wrap,
 *                                nowrap or clip
 * @param {string} props.className Cell custom className.
 * @return {ReactElement} The header table cell  with the
 *                        user custom component inside
 */
export default HeaderCell = props => {
  const {
    row, col, rowSpan, colSpan, width,
    overflow, className, selected
  } = props;
  const style = { width };

  return (
    <th
      className={[
        className, 'header-cell', 'cell',
        'read-only', overflow
      ].filter(a => a).join(' ')}
      colSpan={ colSpan || 1 }
      rowSpan={ rowSpan || 1 }
      style={ style }
    >
      {
        props.component ?
          props.component :
          (
            <span style={{display: 'block'}}>
              { value }
            </span>
          )
      }
    </th>
  );
}