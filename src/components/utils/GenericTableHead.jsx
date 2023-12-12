import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------
export default function GenericTableHead({ headLabel, t, translateGroup }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map(headCell => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'center'}>
            <TableSortLabel hideSortIcon disabled>
              {headCell.id === 'moreMenu' ? '' : t(translateGroup + headCell.id)}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

GenericTableHead.propTypes = {
  t: PropTypes.func,
  headLabel: PropTypes.array,
  translateGroup: PropTypes.string,
};
