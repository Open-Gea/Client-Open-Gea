import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLabors } from '../../../../../../../../redux/slices/actions/laborsActions';
import LaborsNotesDialog from './LaborsNotesDialog';
import { useTranslation } from 'react-i18next';
import LaborsMoreMenu from './LaborsMoreMenu';
import LotsDialog from '../../../../../components/LotsDialog';
import { useState } from 'react';

export default function CulturalTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);

  const { t, i18n } = useTranslation('records');

  const handleDelete = async id => {
    dispatch(deleteLabors(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, dateOfLabor, crop, labor, responsibleName, notes, lot } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">
              {new Date(dateOfLabor).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
            </TableCell>
            <TableCell align="center"><LotsDialog lots={lot} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>
            <TableCell align="center">{crop}</TableCell>
            <TableCell align="center">{labor}</TableCell>

            <TableCell align="center">{responsibleName}</TableCell>
            <TableCell align="center">
              <LaborsNotesDialog t={t} notes={notes} responsibleName={responsibleName} />
            </TableCell>

            <TableCell>
              <LaborsMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

CulturalTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
