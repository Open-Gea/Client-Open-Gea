import PropTypes from 'prop-types';
// @mui
import { useTranslation } from 'react-i18next';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import FilterColumn from './FilterColumn';
// actions

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

FilterOrderTableHead.propTypes = {
  rowCount: PropTypes.number,
  headLabels: PropTypes.array,
  disableOptions: PropTypes.array,
  filterCells: PropTypes.array,
  handleRequestSort: PropTypes.func,
  handleFilter: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  translateGroup: PropTypes.string,
  allData: PropTypes.array,
};

export default function FilterOrderTableHead({
  headLabels,
  handleRequestSort,
  handleFilter,
  order,
  orderBy,
  disableOptions = [],
  filterCells = [],
  translateGroup,
  allData,
}) {
  const { t } = useTranslation('records');

  return (
    <TableHead>
      <TableRow>
        {headLabels.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'center'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => handleRequestSort(headCell.id)}
              disabled={Boolean(disableOptions.find(el => el === headCell.id))}
            >
              {headCell.id === 'moreMenu' ? '' : t(translateGroup + headCell.id)}
              {orderBy === headCell.id ? <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'desc' : 'asc'}</Box> : null}
            </TableSortLabel>
            {filterCells.find(el => el === headCell.id) && (
              <FilterColumn allData={allData} handleFilter={handleFilter} param={headCell.id} translateGroup={translateGroup} />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
