import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// i18
import { useTranslation } from 'react-i18next';
// MUI
import { TableBody, TableCell, TableRow } from '@mui/material';
// components
import SoilsMoreMenu from './SoilsMoreMenu';
import SoilsNotesDialog from './SoilsNotesDialog';
// actions
import { deleteSoils } from '../../../../../../../../redux/slices/actions/soilsActions';
import { useState } from 'react';
import LotsDialog from '../../../../../components/LotsDialog';
import FileManager from '../../../../../../../../components/file-manager/FileManager';

export default function SoilTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);
  const [openDialog, setOpenDialog] = useState('');

  const { t, i18n } = useTranslation('records');

  const handleDelete = async id => {
    dispatch(deleteSoils(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, year, usage, notes, lot, urls } = row;
        console.log(urls)
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{new Date(year).toLocaleDateString(i18n.language, { year: 'numeric' })}</TableCell>
            <TableCell align="center">{usage}</TableCell>
            <TableCell align="center"><LotsDialog lots={lot} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>

            <TableCell align="center">
              <SoilsNotesDialog t={t} notes={notes} lot={lot[0].name} />
            </TableCell>
            <TableCell align="center">
              <FileManager readOnly={true} urls={urls} disabled={urls?.length ? false : true}/>
            </TableCell>
            <TableCell>
              <SoilsMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

SoilTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number
};
