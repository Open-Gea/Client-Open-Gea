import PropTypes from 'prop-types';
// @mui
import { useTranslation } from 'react-i18next';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
// ract-redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { handleRequestSort } from '../../../../../redux/slices/organizationsUser';

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

OrganizationsListHead.propTypes = {
  rowCount: PropTypes.number,
};
const headLabel = (t) => [
  { id: 'name', label: t('invitesTable.organization'), alignRight: false },
  { id: 'email', label: t('organizationsTable.email'), alignRight: false },
  { id: 'country', label: t('organizationsTable.country'), alignRight: false },
  { id: 'descripcion', label: t('organizationsTable.description'), alignRight: false },
  { id: 'actions', label: t('invitesTable.actions'), alignRight: false },
];

export default function OrganizationsListHead({ rowCount }) {
  const { t } = useTranslation('invites');
  const dispatch = useDispatch();
  const createSortHandler = property => event => {
    dispatch(handleRequestSort(property));
  };

  const { order, orderBy, filterName} = useSelector(s => s.organizationsUserSlice);

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
              disabled={filterName === '' ? headCell.id === 'email' || headCell.id === 'country' ||  headCell.id === 'actions' || headCell.id === 'descripcion'   : headCell.id === 'name'  || headCell.id === 'email' || headCell.id === 'country' ||  headCell.id === 'actions' || headCell.id === 'descripcion'   }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? t('farmTable.sortDesc') : t('farmTable.sortAsc')}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
