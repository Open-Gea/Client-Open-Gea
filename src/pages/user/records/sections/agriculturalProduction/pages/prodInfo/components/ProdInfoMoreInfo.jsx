import { forwardRef, useState} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Button,
} from '@mui/material';
import GenericTableHead from '../../../../../../../../components/utils/GenericTableHead';
import { useTranslation } from 'react-i18next';
import LotsDialog from '../../../../../components/LotsDialog';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const ProdInfoMoreInfo = ({ info, t , id ,openDialog, handleClose, setOpenDialog }) => {

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const [openLots, setOpenLots] = useState(false);


  const headLabel = 
  [
    id.includes('agricultural') ? { id: 'crop', label: 'Cultivo', alignRight: false } : { id: 'species', label: 'especies', alignRight: false },
    { id: 'hectares',alignRight: false },
    { id: 'driving', alignRight: false },
    { id: 'coverHectares',  alignRight: false },
    { id: 'lots',  alignRight: false },
    {id: 'density', alignRight: false}
  ]

  
  return (
    <>
      <Chip label={t('recordsCommon.check')} onClick={() => setOpenDialog(id)} />
      <Dialog
        open={Boolean(openDialog === id)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: { maxWidth: '95%', width: 'auto' }
        }}
      >
        <DialogTitle>{id.includes('agricultural') ? currentFarm.name + ` - ${t('titles.agricultural')}` : currentFarm.name + ` - ${t('titles.livestock')}`}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ minWidth: 600, my: 1, p: 0 }}>
            <Table stickyHeader>
              <GenericTableHead t={t} headLabel={headLabel} translateGroup='prodInfoRecordsInputs.' />
              <TableBody>
              {info.map(row => {
                
              const { id, hectares, crop, driving, otherDriving, coverHectares, density, lots} = row;
              const species = row.species?.join(' - ');
              //const lots = row.lots.map((lot)=> lot.label).join(' - ');
              //console.log(lots);
              return(
              <TableRow hover key={id} tabIndex={-1}>
                <TableCell align="center">
                  {crop || species}
                </TableCell>
                <TableCell align="center">
                  {hectares}
                </TableCell>
                <TableCell align="center">
                  {driving !== 'OTHER' ? driving : otherDriving}
                </TableCell>
                <TableCell align="center">
                  {coverHectares || '-'}
                </TableCell>
                <TableCell align="center">
                  <LotsDialog lots={lots} currentFarm={currentFarm} openDialog={openLots} setOpenDialog={setOpenLots} handleClose={() => setOpenLots(false)}></LotsDialog>
                </TableCell>
                <TableCell align="center">
                  {density || '-'}
                </TableCell>
              </TableRow>  
                )
             })}
              </TableBody>
            </Table>
          </TableContainer>
     
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ProdInfoMoreInfo.propTypes = {
  info: PropTypes.array,
  id: PropTypes.string,
  openDialog: PropTypes.any,
  handleClose: PropTypes.func,
  setOpenDialog: PropTypes.func,
};
