import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// i18
import { useTranslation } from 'react-i18next';
// MUI
import { TableBody, TableCell, TableRow } from '@mui/material';
// components
import SowingMoreMenu from './SowingMoreMenu';
// actions
import { deleteSowing } from '../../../../../../../../redux/slices/actions/sowingActions';
import LotsDialog from '../../../../../components/LotsDialog';
import { useState } from 'react';

export default function SowingTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);

  const { t , i18n} = useTranslation('records');

  const handleDelete = async id => {
    dispatch(deleteSowing(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, species, varietySown, dateOfSowing, sowingDensity, seedsInKg, sowingOrigin, predecessorCrop, lot } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center"><LotsDialog lots={lot} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>
            <TableCell align="center">{species || '--'}</TableCell>
            <TableCell align="center">{varietySown || '--'}</TableCell>
            <TableCell align="center">{dateOfSowing ? new Date(dateOfSowing).toLocaleDateString(i18n.language) : '--'}</TableCell>
            <TableCell align="center">{sowingDensity || '--'}</TableCell>
            <TableCell align="center">{seedsInKg || '--'}</TableCell>
            <TableCell align="center">{sowingOrigin || '--'}</TableCell>
            <TableCell align="center">{predecessorCrop || '--'}</TableCell>
            <TableCell>
              <SowingMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

SowingTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};


            