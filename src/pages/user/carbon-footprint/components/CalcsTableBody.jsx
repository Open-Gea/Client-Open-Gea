import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ShowDetailsDialog from './ShowDetailsDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteCalc } from '../../../../redux/slices/huellaCarbono';

import { useState, useEffect } from 'react';

const CalcsTableBody = ({ isLoading, farmCalcs, emissions,farmId }) => {
  const { i18n, t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedCalcId, setSelectedCalcId] = useState(null);

  
  const handleDelete = async id => {
    const data = {id,farmId}
    await dispatch(deleteCalc(data));
    setDeleteConfirmationOpen(false);
  };

  const handleOpenDeleteConfirmation = (id) => {
    setSelectedCalcId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };


  return (
    <TableBody>
      {farmCalcs.map(row => {
        const { id,emissionFactor, detail,fecha } = row;
        const factor = emissions.find(prod => prod.id === emissionFactor);
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="left">
              {new Date(fecha).toLocaleDateString(i18n.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            {/* Se traducen los factores de emision debido a que por su defecto se encuentran en Español */}
            <TableCell align="left"> {i18n.language === 'es' ? factor.name :  t('inputs.emissionFactors.'+factor.name) }</TableCell>
            <TableCell align="left">{detail.result.toFixed(2) +' Kg CO2eq'} </TableCell>
            <TableCell align="left">{detail.year} </TableCell>
            <TableCell align="left">{<ShowDetailsDialog details={detail} fecha={fecha} factor={factor} />}</TableCell>
            <TableCell align="left">
            <IconButton aria-label={tCommon('delete')} color="error" onClick={() => handleOpenDeleteConfirmation(id)}>                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
       <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>{t('dialogs.deleteCalcTitle')}</DialogTitle>
        <DialogContent>{t('dialogs.deleteCalcDescription')}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>{tCommon('cancel')}</Button>
          <Button onClick={() => handleDelete(selectedCalcId)} color="error" autoFocus>
            {tCommon('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </TableBody>
  );
};

CalcsTableBody.propTypes = {
  isLoading: PropTypes.bool,
  farmCalcs: PropTypes.array,
  emissions: PropTypes.array,
};

export default CalcsTableBody;
