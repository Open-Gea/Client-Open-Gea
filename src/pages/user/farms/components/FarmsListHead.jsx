import PropTypes from 'prop-types';
// @mui
import { useTranslation } from 'react-i18next';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import FilterCountry from './FilterCountry';
// ract-redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { setFilteredFarms, handleRequestSort } from '../../../../redux/slices/farms';

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

UserListHead.propTypes = {
  rowCount: PropTypes.number,
};
const headLabel = (t) => [
  { id: 'name', label: t('farmTable.nameHeader'), alignRight: false },
  { id: 'phone', label: t('farmTable.phoneHeader'), alignRight: false },
  // { id: 'owner', label: t('farmTable.ownerHeader'), alignRight: false },
  { id: 'country', label: t('farmTable.countryHeader'), alignRight: false },
  { id: 'location', label: t('farmTable.locationHeader'), alignRight: false },
  { id: 'certify', label: t('farmTable.certificateHeader'), alignRight: false },
  { id: 'more', label: t('farmTable.more'), alignRight: false },
  { id: '' },
];

export default function UserListHead({ rowCount }) {
  const { t } = useTranslation('farms');
  const dispatch = useDispatch();
  const createSortHandler = property => event => {
    dispatch(handleRequestSort(property));
  };

  const { order, orderBy, countries, filteredFamrs } = useSelector(s => s.farmSlice);

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
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              disabled={headCell.id === 'phone' /*|| headCell.id === 'owner'*/ || headCell.id === 'location'|| headCell.id === 'certify' || headCell.id === 'certificate'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? t('farmTable.sortDesc') : t('farmTable.sortAsc')}</Box>
              ) : null}
            </TableSortLabel>
            {headCell.id === 'country' && (
              <FilterCountry setFilteredFarms={setFilteredFarms} userList={filteredFamrs} />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
