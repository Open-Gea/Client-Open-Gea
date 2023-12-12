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

export const BioInputsProcessRegister = ({ recordInfo, openDialog, setOpenDialog, processInfo }) => {
  const { id,  responsibleName} = recordInfo;
  const { startDateOfProduction, endDateOfProduction, notes, flipsDatesAndTemp } = processInfo;

  const { t, i18n } = useTranslation('records');
  const rows =
      [
          {name: t('forms.person'), value: responsibleName},
          {
            name: t('forms.startProd'),
            value: startDateOfProduction ? new Date(startDateOfProduction).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' }) : '---',
          },
          {
            name: t('forms.endProd'),
            value: endDateOfProduction ? new Date(endDateOfProduction).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' }) : '---',
          },
          { name: t('forms.notes'), value: notes },
        ]

  if(flipsDatesAndTemp){ 
    flipsDatesAndTemp.forEach((f,i) => {
      rows.push( {
        name: `${t('forms.flip')} N° ${i+1}`,
        value: `${new Date(f.date).toLocaleDateString(i18n.language, { year: 'numeric', month: '2-digit', day: 'numeric' })}`.concat(f.temp? ` - ${f.temp}°C`: '')
        //  f.temp ? ` ${f.temp}°C` : ''
      })
    })
  }

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
                  <StyledTableCell colSpan={2}>{t('titles.processRecord')}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map((el, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                      {el.name}
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
BioInputsProcessRegister.propTypes = {
  recordInfo: PropTypes.object,
  openDialog: PropTypes.any,
  setOpenDialog: PropTypes.func,
  processInfo: PropTypes.object,
};
