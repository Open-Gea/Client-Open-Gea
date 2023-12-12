import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; 
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
  DialogContent,
  DialogActions,
  Chip,
  Button,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

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

export const DetailsDialog = ({ info, openDialog, setOpenDialog, tGroup, t }) => {

  const {t : tCommon} = useTranslation('common'); 
  
  const {id, ...restInfo} = info;
  
  const details = Object.entries(restInfo).map(([label, value]) => ({label: t(`${tGroup}.${label}`), value }));

  return (
    <>
      <Chip label={t('recordsCommon.check')} onClick={() => setOpenDialog(id)} />
      <Dialog
        open={Boolean(openDialog === id)}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog('')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell colSpan={2}>{tCommon('details')}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {details.map((el, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                      {el.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{el.value || '---'}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog('')}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
DetailsDialog.propTypes = {
  info: PropTypes.object,
  openDialog: PropTypes.any,
  setOpenDialog: PropTypes.func,
};
