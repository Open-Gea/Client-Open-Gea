import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PhytoMoreMenu from './PhytoMoreMenu';
import { deletePhyto } from '../../../../../../../../redux/slices/actions/phytoActions';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DetailsDialog } from './../../../../../components/DetailsDialog';
import LotsDialog from '../../../../../components/LotsDialog';


export default function PhytoTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { currentFarm } = useSelector(s => s.recordsSlice);

  const [openLots, setOpenLots] = useState(false);

  const {t,i18n} = useTranslation('records')
  const {t: tCommon} = useTranslation('common')

  const handleDelete = async id => {
    dispatch(deletePhyto(id));
  };

  const [openDetails, setOpenDetails] = useState('');

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, createdAt, type, productName, brand, activeSubstance, phytoClass, toxicologicType, appDate, crop, pestToCombat, dose, doseUnit, machineryUsed, safetyReturnDate, gracePeriod, responsibleName, elaborationType, recipe  } = row;


        const {lots, farmId, deleted, ...details} = row;

        details.appDate = new Date(appDate).toLocaleDateString(i18n.language, { year: 'numeric', month: 'numeric', day: 'numeric',hour: 'numeric', minute: 'numeric' })
        details.dose = `${dose} ${doseUnit}`;
        delete details['doseUnit'];
        if(safetyReturnDate) details.safetyReturnDate = new Date(safetyReturnDate).toLocaleDateString(i18n.language, { year: 'numeric', month: 'numeric', day: 'numeric'})
        if(recipe || recipe===false) details.recipe = recipe ? tCommon('yes') : tCommon('no')

        Object.keys(details).forEach((key) => {
          if (details[key] === null || details[key] === undefined || details[key]=='') {
            delete details[key];
          }
        });


        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center"><LotsDialog lots={lots} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)} /></TableCell>
            <TableCell align="center">{type || '---'}</TableCell>
            <TableCell align="center">{productName || '---'}</TableCell>
            <TableCell align="center">{new Date(appDate).toLocaleDateString(i18n.language, { year: 'numeric', month: 'numeric', day: 'numeric',hour: 'numeric', minute: 'numeric' }) || '---'}</TableCell>
            <TableCell align="center">{crop || '---'}</TableCell>
            <TableCell align="center">{safetyReturnDate ? new Date(safetyReturnDate).toLocaleDateString(i18n.language, { year: 'numeric', month: 'numeric', day: 'numeric' }) : '---'}</TableCell>
            <TableCell align="center">
              <DetailsDialog
                info={details}
                openDialog={openDetails}
                setOpenDialog={setOpenDetails}
                t={t}
                tGroup={'phytoRecordsInputs'}
              />
            </TableCell>
            <TableCell>
              <PhytoMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

PhytoTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
