import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Button,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const MoreInfoFarm = ({ recordInfo, openDialog, handleClose, handleOpen }) => {
  
  const { id, name, owner, lat, lng, totalSurface,country, perimetralFence, infrastructure, hidricRes, start} = recordInfo;
  
    const { t: tR } = useTranslation('records');
    const { t } = useTranslation('farms');
    const rows = [
        { name: 'Propietario', value: owner },
        {
          name: 'Fecha de inicio',
          value: new Date(parseInt(start)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
        },
        { name: 'País', value: country },
        { name: 'Superficie', value: `${totalSurface} ha.` },
        { name: 'Tipo de cerco perimetral', value: perimetralFence || '--' },
        { name: 'Número de infraestructuras', value: infrastructure || '--' },
        { name: 'Recursos Hídricos', value: hidricRes?.join(', ') || '--' },
      ];

  const title =  tR('recordsCommon.details') + ' ' + name ;
  return (
    <>
      <Chip label={tR('recordsCommon.check')} onClick={() => handleOpen(id)} />
      <Dialog
        open={Boolean(openDialog === id)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{tR('recordsCommon.details')}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.value || '---'}</StyledTableCell>
                  </StyledTableRow>
                ))}
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
MoreInfoFarm.propTypes = {
  recordInfo: PropTypes.object,
  openDialog: PropTypes.any,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  lotsName: PropTypes.string,
};