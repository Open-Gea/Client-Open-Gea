import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ShowDetailsDialog from './ShowDetailsDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteCalc } from '../../../../../redux/slices/huellasCarbonoCooperativa';

import { useState } from 'react';

const CalcsTableBody = ({ isLoading, farmCalcs, emissions,farmId, year }) => {
  const { i18n, t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedCalcId, setSelectedCalcId] = useState(null);

  // Variable to control the total
  let totalCarbonFootprint = 0;

  // Filtering by year 
  farmCalcs = farmCalcs.filter(function(carboonFootprint){
    
    

  if(i18n.language === 'en') {
    if(year !== 'All Years'){
      return carboonFootprint.detail.year === year;
    }else{
      return true;
    }    
  }else{
    if(year !== 'Todos los Años'){
      return carboonFootprint.detail.year === year;
    }else{
      return true;
    }    
  }

  });

  // Order by year if the year is not specified
  if(year === 'All Years' || year === 'Todos los Años'){
    farmCalcs.sort((a, b) => parseInt(a.detail.year) - parseInt(b.detail.year));
  }
  
  const handleDelete = async id => {
    const data = {id,farmId}
    console.log('DATA '+data);
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
        totalCarbonFootprint += parseFloat(detail.result.toFixed(2));

        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="left">
              {new Date(fecha).toLocaleDateString(i18n.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell align="left">{factor.name}</TableCell>
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
      <br></br>
      <TableRow hover tabIndex={-1}>
            <TableCell align="left" colSpan={2}> { t('calcTable.totalMsg')+ year+' : '+' '+totalCarbonFootprint.toFixed(2)+' Kg CO2eq' }</TableCell>
      </TableRow>
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
