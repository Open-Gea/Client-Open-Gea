import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { TableBody, TableCell, TableRow } from '@mui/material';
// components
import {BioInputsProcessRegister}  from './BioInputsProcessRegister';
import { BioInputsMaterialsDialog } from './BioInputsMaterialsDialog';
import BioInputsMoreMenu from './BioInputsMoreMenu';
// components
import { deleteBioInputs } from '../../../../../../../../redux/slices/actions/bioInputsActions';

export default function BioInputsTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();


  const { t, i18n } = useTranslation('records');
  
  const handleDelete = async id => {
    dispatch(deleteBioInputs(id));
  };
  
  const [openDialog, setOpenDialog] = useState('');
  const [openProcessDialog, setOpenProcessDialog] = useState('');
  

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const {
          id,
          elaborationDate,
          expirationDate,
          name,
          type,
          liquidSolid,
          materialAndQuantity,
          quantityProduced,
          unitProduced,
          productionCost,
          unitCost,
          processRegister,
        } = row;
        const types = type === 'PHYTOSANITARY' ? t('forms.phytosanitary') : type === 'FERTILIZER' ? t('forms.fertilizer') : '';
        const liqSolids = liquidSolid === 'LIQUID' ? t('recordsCommon.liquid') : liquidSolid === 'SOLID' ? t('recordsCommon.solid') : '';
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">
              {new Date(elaborationDate).toLocaleDateString(i18n.language, { year: 'numeric', month: '2-digit', day: 'numeric' })}
            </TableCell>
            <TableCell align="center">
              {new Date(expirationDate).toLocaleDateString(i18n.language, { year: 'numeric', month: '2-digit', day: 'numeric' }) || '--'}
            </TableCell>
            <TableCell align="center">{name || '---'}</TableCell>
            <TableCell align="center">{types}</TableCell>
            <TableCell align="center">{liqSolids}</TableCell>
            <TableCell align="center">{quantityProduced + ' ' + unitProduced}</TableCell>
            <TableCell align="center">{unitCost + ' ' + productionCost}</TableCell>
            <TableCell align="center">
              <BioInputsMaterialsDialog
                material={materialAndQuantity}
                recordInfo={row}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            </TableCell>
            <TableCell align="center">
              <BioInputsProcessRegister
                recordInfo={row}
                openDialog={openProcessDialog}
                setOpenDialog={setOpenProcessDialog}
                processInfo={processRegister}
              />
            </TableCell>

            <TableCell>
              <BioInputsMoreMenu editInfo={row} onDelete={() => handleDelete(id, type)} />
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

BioInputsTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
