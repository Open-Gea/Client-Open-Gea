import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PerformanceMoreMenu from './PerformanceMoreMenu';
import { deletePerformance } from '../../../../../../../../redux/slices/actions/performanceActions';
import { useTranslation } from 'react-i18next';
import LotsDialog from '../../../../../components/LotsDialog';
import { useState } from 'react';

export default function PerformanceTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);

  const handleDelete = async id => {
    dispatch(deletePerformance(id));
  };

  const { i18n} = useTranslation();
  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, estimatedYield, year, harvestDate, cultivatedSpecies, finalYield, productDestiny, lot } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
          <TableCell align="center"><LotsDialog lots={lot} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>
          <TableCell align="center">{estimatedYield || '--'}</TableCell>
          <TableCell align="center">{year || '--'}</TableCell>
          <TableCell align="center">{harvestDate? new Date(harvestDate).toLocaleDateString(i18n.language): '--'}</TableCell>
          <TableCell align="center">{cultivatedSpecies || '--'}</TableCell>
          <TableCell align="center">{finalYield || '--'}</TableCell>
          <TableCell align="center">{productDestiny || '--'}</TableCell>

          <TableCell>
            <PerformanceMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

PerformanceTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
