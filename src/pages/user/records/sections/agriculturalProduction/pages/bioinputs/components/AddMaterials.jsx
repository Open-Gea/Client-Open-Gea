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


const unitQtyOptions = [
  { id: 'LTS', label: 'Lts' },
  { id: 'TON', label: 'Ton' },
  { id: 'KG', label: 'Kg' },
  { id: 'M3', label: 'M3' },
];

export const AddMaterials = ({ materials, open, setOpen, setValue, watch }) => {
  
  const { t } = useTranslation('records');
  
  const handleAdd = mat => {
    if (mat.material && mat.qty > 0 && mat.unit) {
      setValue('materialAndQuantity', [...watch().materialAndQuantity, mat]);
      setNewMaterial({ material: '', qty: '', unit: '' });
    }
  };
  const handleDelete = mat => {
    setValue(
      'materialAndQuantity',
      watch().materialAndQuantity.filter(el => el.material !== mat)
    );
  };

  const [newMaterial, setNewMaterial] = useState({ material: '', qty: '', unit: '' });
  const isDesktop = useResponsive('up', 'sm');

  return (
    <>
      <Chip label={materials.length ? t('buttons.editMaterials') : t('buttons.addMaterials')} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Materiales</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>{t('recordsCommon.details')}</StyledTableCell>
                  <StyledTableCell align="center">{t('recordsCommon.quantity')}</StyledTableCell>
                  <StyledTableCell align="right">{t('forms.unit')}</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {materials.map((mat, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                      {mat.material}
                    </StyledTableCell>
                    <TableCell align="center">{mat.qty}</TableCell>
                    <TableCell align="right">{mat.unit}</TableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleDelete(mat.material)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} mt={3} mx={1.5}>
            <TextField
              label={t('forms.newMat')}
              value={newMaterial.material}
              id="outlined-controlled"
              onChange={e => setNewMaterial({ ...newMaterial, material: e.target.value })}
            />
            <TextField
              label={t('recordsCommon.quantity')}
              type="number"
              value={newMaterial.qty}
              id="outlined-controlled"
              sx={{width:'20%'}}
              onChange={e => {
                if (!isNaN(e.target.value) && e.target.value !== 'e') setNewMaterial({ ...newMaterial, qty: parseInt(e.target.value) });
              }}
            />
            <TextField select SelectProps={{ native: true }} sx={{width:'20%'}} label={t('forms.unit')}
            onChange={e => setNewMaterial({ ...newMaterial, unit: e.target.value })} value={newMaterial.unit}>
              <option></option>
                {unitQtyOptions.map(el => (
                  <option key={el.id} value={el.id}>
                    {el.label}
                  </option>
                ))}
            </TextField>
            <Button variant="contained" onClick={() => handleAdd(newMaterial)}>
              {t('buttons.add')}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            {materials.length ? 'OK' : t('buttons.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AddMaterials.propTypes = {
  materials: PropTypes.array,
  quantity: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
};
