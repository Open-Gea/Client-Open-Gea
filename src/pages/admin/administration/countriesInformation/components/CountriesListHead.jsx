import PropTypes from 'prop-types';
// @mui
import { useTranslation } from 'react-i18next';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
// ract-redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { setFilteredCountries, handleRequestSort } from '../../../../../redux/slices/countriesAdmin';

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

CountriesListHead.propTypes = {
  rowCount: PropTypes.number,
};
const headLabel = (t) => [
  { id: 'code', label: t('countriesTable.codeHeader'), alignRight: false },
  { id: 'name', label: t('countriesTable.nameHeader'), alignRight: false },
  { id: '', label: t('countriesTable.accions'), alignRight: false}
];

export default function CountriesListHead({ rowCount }) {
  const { t } = useTranslation('countries');
  const dispatch = useDispatch();
  const createSortHandler = property => event => {
    dispatch(handleRequestSort(property));
  };

  const { order, orderBy, countries, filteredCountries, filterName } = useSelector(s => s.countriesAdminSlice);

  return (
    <TableHead>
      <TableRow>
        {headLabel(t).map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={filterName !== '' ? false : orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              disabled={filterName === '' ? headCell.id === 'code' : headCell.id === 'name' || headCell.id === 'code'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? t('countriesTable.sortDesc') : t('countriesTable.sortAsc')}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
