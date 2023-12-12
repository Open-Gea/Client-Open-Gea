import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import SuppliersMoreMenu from './SuppliersMoreMenu';
import { deleteSuppliers } from '../../../../../../../../redux/slices/actions/suppliersActions';

export default function SuppliersTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteSuppliers(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, name, phone, email, service, state } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{name || '---'}</TableCell>
            <TableCell align="center">{phone || '---'}</TableCell>
            <TableCell align="center">{email || '---'}</TableCell>
            <TableCell align="center">{service || '---'}</TableCell>
            <TableCell align="center">{state || '---'}</TableCell>
            <TableCell>
              <SuppliersMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  );
}

SuppliersTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
