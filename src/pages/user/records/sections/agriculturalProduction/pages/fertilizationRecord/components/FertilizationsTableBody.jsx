import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DetailsDialog } from '../../../../../components/DetailsDialog';
import FertilizationsMoreMenu from './FertilizationsMoreMenu';
import { date } from 'yup';
import LotsDialog from '../../../../../components/LotsDialog';


export default function FertilizationsTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);

  const {t, i18n} = useTranslation('records')
  const {t: tCommon} = useTranslation('common')

  const handleDelete = async id => {
    dispatch(deletePhyto(id));
  };

  const [openDetails, setOpenDetails] = useState('');

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id,type, crop, dosePlant, dosePlantUnit, doseArea, doseAreaUnit, responsibleName, dateOfUse, recipe, machineryUsed } = row;

        const {lots, farmId, deleted, ...details} = row;

        details.dateOfUse = new Date(dateOfUse).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric',hour: 'numeric', minute: 'numeric' })
  
        details.dosePlant = `${dosePlant} ${dosePlantUnit}`;
        delete details['dosePlantUnit'];

        details.doseArea = `${doseArea} ${doseAreaUnit}`;
        delete details['doseAreaUnit'];

        if(recipe || recipe===false) details.recipe = recipe ? tCommon('yes') : tCommon('no')

        Object.keys(details).forEach((key) => {
          if (details[key] === null || details[key] === undefined || details[key]=='') {
            delete details[key];
          }
        });

        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{ `${new Date(dateOfUse).toLocaleDateString(i18n.language,{hour: '2-digit', minute:'2-digit'})}` || '---'}</TableCell>
            <TableCell align="center"><LotsDialog lots={lots} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>
            <TableCell align="center">{type || '---'}</TableCell>
            <TableCell align="center">{crop || '---'}</TableCell>
            <TableCell align="center">{`${dosePlant} ${dosePlantUnit}` || '---'}</TableCell>
            <TableCell align="center">{`${doseArea} ${doseAreaUnit}/mts2` || '---'}</TableCell>
            <TableCell align="center">{responsibleName || '---'}</TableCell>
            <TableCell align="center">
              <DetailsDialog
                info={details}
                openDialog={openDetails}
                setOpenDialog={setOpenDetails}
                t={t}
                tGroup={'fertilizationRecordsInputs'}
              />
            </TableCell>
            <TableCell>
              <FertilizationsMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

FertilizationsTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
