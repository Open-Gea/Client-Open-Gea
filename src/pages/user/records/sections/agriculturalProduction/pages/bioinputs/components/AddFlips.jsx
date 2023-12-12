import { forwardRef, useState } from 'react';
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
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
// components
import useResponsive from '../../../../../../../../hooks/useResponsive';
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';

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

export const AddFlips = ({ flips, open, setOpen, setValue, watch }) => {

  const { t, i18n } = useTranslation('records');

  const handleAdd = flip => {
    // console.log(flip);
    if (flip.date !== '') {
      setValue('flipsDatesAndTemp', [...watch().flipsDatesAndTemp, flip]);
      setNewFlip({ date: '', temp: '' });
    }
  };
  const handleDelete = index => {
    setValue(
      'flipsDatesAndTemp',
      watch().flipsDatesAndTemp.filter((_,i) => i !== index)
    );
  };

  const [newFlip, setNewFlip] = useState({ date: '', temp: '' });
  const isDesktop = useResponsive('up', 'sm');

  return (
    <>
      <Chip label={flips.length ? t('buttons.editFlips') : t('buttons.addFlips')} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t('titles.flipsRecords')}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>{t('forms.date')}</StyledTableCell>
                  <StyledTableCell align="right">{t('forms.temp')}</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {flips.map((f, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                    {new Date(f.date).toLocaleDateString(i18n.language, { year: 'numeric', month: '2-digit', day: 'numeric' })}
                    </StyledTableCell>
                    <TableCell align="right">{f.temp ? `${f.temp}°C` : '---'}</TableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleDelete(i)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} mt={3} mx={1.5}>
            <DatePickerMUI
                  label={t('forms.flipDate')}
                  value={newFlip.date}
                  onChange={e => setNewFlip({ ...newFlip, date: e.$d})}
            />
            <TextField
              label={t('forms.tempC')}
              value={newFlip.temp}
              id="outlined-controlled"
              onChange={e => setNewFlip({ ...newFlip, temp: e.target.value })}
            />
            <Button variant="contained" onClick={() => handleAdd(newFlip)}>
              {t('buttons.add')}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            {flips.length ? 'OK' : t('buttons.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AddFlips.propTypes = {
  flips: PropTypes.array,
  quantity: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
};
