import PropTypes from 'prop-types';
// @mui
import { useTranslation } from 'react-i18next';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import FilterCountry from './FilterCountry';
// ract-redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { setFilteredUsers, handleRequestSort } from '../../../../../redux/slices/systemUsers';

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
  { id: 'status', label: t('usersTable.statusHeader'), alignRight: false },
  { id: 'displayName', label: t('usersTable.nameHeader'), alignRight: false },
  { id: 'country', label: t('usersTable.countryHeader'), alignRight: false },
  { id: 'email', label: t('usersTable.emailHeader'), alignRight: false },
  { id: 'phone', label: t('usersTable.phoneHeader'), alignRight: false },
  { id: 'registrationDate', label: t('usersTable.registrationDate'), alignRight: false },
  { id: 'actions', label: t('usersTable.actions'), alignRight: false },
];

export default function UserListHead({ rowCount }) {
  const { t } = useTranslation('users-management');
  const dispatch = useDispatch();
  const createSortHandler = property => event => {
    dispatch(handleRequestSort(property));
  };

  const { order, orderBy, countries, filteredUsers, filterName } = useSelector(s => s.systemUsersSlice);

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
              disabled={filterName === '' ? headCell.id === 'status' ||  headCell.id === 'registrationDate' || headCell.id === 'country' || headCell.id === 'email'|| headCell.id === 'phone' || headCell.id === 'actions' : headCell.id === 'status' || headCell.id === 'name' ||  headCell.id === 'registrationDate' ||  headCell.id === 'country' || headCell.id === 'email'|| headCell.id === 'phone' || headCell.id === 'actions' }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? t('usersTable.sortDesc') : t('usersTable.sortAsc')}</Box>
              ) : null}
            </TableSortLabel>
            {headCell.id === 'country' && (
              <FilterCountry  setFilteredUsers={setFilteredUsers} userList={filteredUsers} />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
