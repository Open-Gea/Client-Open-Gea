import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProdInfoMoreInfo } from './ProdInfoMoreInfo';
import ProdInfoMoreMenu from './ProdInfoMoreMenu';
import {deleteProdInfo} from '../../../../../../../../redux/slices/actions/prodInfoActions'

export default function ProdInfoTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation('records');

  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = async id => {
    dispatch(deleteProdInfo(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, agricultural, createdAt, livestock, agriculturalHectares, livestockHectares, dateProdInfo} = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">
              {new Date(dateProdInfo).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' })}
            </TableCell>
            
            <TableCell align="center">
              {
                agricultural?.length ?
                <ProdInfoMoreInfo
                id={"agricultural_"+id}
                t={t}
                info={agricultural}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                handleClose={() => setOpenDialog(false)}>
                </ProdInfoMoreInfo> :
                <p>--</p> 
              }
            </TableCell> 

            <TableCell align="center">{agriculturalHectares}</TableCell>
                 
            <TableCell align="center"> 
             { 
             livestock?.length ?
                <ProdInfoMoreInfo
                id={"livestock_"+id}
                t={t}
                info={livestock}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                handleClose={() => setOpenDialog(false)}>
                </ProdInfoMoreInfo> :
                <p>--</p> 
              }
            </TableCell>

            <TableCell align="center">{livestockHectares}</TableCell>
            <TableCell>
              <ProdInfoMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

ProdInfoTableBody.propTypes = {
  fRecords: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
