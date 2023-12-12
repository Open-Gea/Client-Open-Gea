import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './StaffInfoMoreMenu';
import { deleteStaffInfo } from '../../../../../../../../redux/slices/actions/staffInfoActions';
import { useState } from 'react';
import FileManager from '../../../../../../../../components/file-manager/FileManager';

export default function StaffInfoTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteStaffInfo(id));
  };

  const [openDialog, setOpenDialog] = useState('');

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, lastName, firstName, area, contractType, urls } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{lastName || '---'}</TableCell>
            <TableCell align="center">{firstName}</TableCell>
            <TableCell align="center">{area}</TableCell>
            <TableCell align="center">{contractType}</TableCell>
            <TableCell align="center">
              <FileManager readOnly={true} urls={urls} disabled={urls?.length ? false : true}/>
            </TableCell>
            <TableCell>
              <StaffInfoMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

StaffInfoTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
