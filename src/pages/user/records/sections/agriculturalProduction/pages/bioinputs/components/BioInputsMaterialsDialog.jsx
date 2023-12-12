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

export const BioInputsMaterialsDialog = ({ recordInfo, openDialog, setOpenDialog, material }) => {
  const { id } = recordInfo;

  const { t } = useTranslation('records');
  
  return (
    <>
      {material.length ? <Chip label={t('recordsCommon.check')} onClick={() => setOpenDialog(id)} /> : <p>---</p>}
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
                  <StyledTableCell colSpan={3} align="center">
                    {t('forms.usedMaterials')}
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {material?.map((mat, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                      {mat.material}
                    </StyledTableCell>
                    <StyledTableCell align="center">{mat.qty || '---'}</StyledTableCell>
                    <StyledTableCell align="right">{mat.unit || '---'}</StyledTableCell>
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
BioInputsMaterialsDialog.propTypes = {
  recordInfo: PropTypes.object,
  openDialog: PropTypes.any,
  setOpenDialog: PropTypes.func,
  quantity: PropTypes.array,
  material: PropTypes.array,
};
