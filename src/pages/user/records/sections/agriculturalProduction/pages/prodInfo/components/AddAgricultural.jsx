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
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
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

export const AddAgricultural = ({ agricultural, open, setOpen, setValue, watch, lots }) => {
    const [newAgricultural, setNewAgricultural] = useState({id: '', crop: '', hectares: '', driving : '', otherDriving: '', coverHectares: '', lots: [] });
    const isDesktop = useResponsive('up', 'sm');
    const [agriculturalLots, setAgriculturalLot] = useState([]);
    const [errors, setErrors] = useState({crop:'', hectares:'', driving:'', lots:''});
    const [lotSelected, setLotSelected] = useState('');
    const { t } = useTranslation('records');

    const handleAdd = agr => {
    
      const newErrors = {
          crop: agr.crop === '' ? t('forms.errorRequired') : '',
          hectares: agr.hectares === '' ? t('forms.errorRequired') : '',
          driving: agr.driving === '' ? t('forms.errorRequired'): '',
          lots: !agr.lots.length ? t('forms.errorRequired'): '',
      };
      
      setErrors(newErrors);

      if(Object.values(newErrors).every(error => error === '')){    
          agr.coverHectares = 0 || +agr.coverHectares;
          setValue('agricultural', [...watch().agricultural, agr]);
          setNewAgricultural({ crop: '', hectares: '', driving : '', otherDriving: '', coverHectares: '0', lots: []});
          setAgriculturalLot([])
          setLotSelected('')
      }
    };
   
    
    const handleDelete = agr => {
        setValue(
            'agricultural',
            watch().agricultural.filter(el => el.id !== agr.id)
            );
        };
    
    const addAgriculturalLot = (e) =>{
        setLotSelected(e.target.value);
        if(!agriculturalLots.length || !agriculturalLots.find(l => l.id === e.target.value)){
            setAgriculturalLot([...agriculturalLots, lots.find(lot => lot.id ===e.target.value)]);
            setNewAgricultural({...newAgricultural, lots: [...agriculturalLots, lots.find(lot => lot.id ===e.target.value)]})
        }
    }

  const removeAgriculturalLot = (lot) => {
    setLotSelected('');
    setAgriculturalLot(agriculturalLots.filter(l => l.id !== lot.id))
    setNewAgricultural({...newAgricultural, lots: agriculturalLots.filter(l => l.id !== lot.id)})
  }

  const drivingAgriculturalSelect = [
    { value: 'CONVENTIONAL', label: t('selectOptions.conventional') },
    { value: 'AGROECOLOGICAL', label: t('selectOptions.agro') },
    { value: 'AGROECOLOGICAL_TRANSITION', label: t('selectOptions.agroT') },
    { value: 'OTHER', label: t('selectOptions.other') },
  ];

  const cropAgriculturalSelect = [
    { value: 'FRUITY', label: t('selectOptions.fruity') },
    { value: 'HORTICULTURAL', label: t('selectOptions.hort') },
    { value: 'GRAIN', label: t('selectOptions.grain') },
    { value: 'FORAGES', label: t('selectOptions.forages') },
    { value: 'TIMBER', label: t('selectOptions.timber') },
    { value: 'OTHER', label: t('selectOptions.other') },
  ];

    
  return (
    <>
      <Chip label={agricultural.length ? t('buttons.edit') : t('buttons.addAgricultural')} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
            style: { maxWidth: '95%', width: 'auto' }
          }}
      >
        <DialogTitle>{t('titles.agricultural')}</DialogTitle>
        <DialogContent>
          {agricultural.length ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>{t('forms.crop')}</StyledTableCell>
                  <StyledTableCell>{t('forms.hectares')}</StyledTableCell>
                  <StyledTableCell>{t('forms.cover')}</StyledTableCell>
                  <StyledTableCell>{t('forms.management')}</StyledTableCell>
                  <StyledTableCell>{t('recordsCommon.lots')}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {agricultural.map((agr, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                      {agr.crop}
                    </StyledTableCell>
                    <TableCell align="left">{agr.hectares}</TableCell>
                    <TableCell align="left">{agr.coverHectares}</TableCell>
                    <TableCell align="left">{agr.driving !== 'OTHER' ? agr.driving : agr.otherDriving}</TableCell>
                    <TableCell align="left">{agr.lots.map(l => l.label).join('-')}</TableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleDelete(agr)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : <></>}
          <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} mt={3} mx={1.5}>
            <FormControl fullWidth error={Boolean(errors.crop)}>
                <InputLabel id="crop-label" >{t('forms.crop')}</InputLabel>
                <Select fullWidth labelId='crop-label' label={t('forms.crop')} value={newAgricultural.crop} onChange={(e) => setNewAgricultural({...newAgricultural, crop: e.target.value})}>
                    {cropAgriculturalSelect.map(el => (
                        <MenuItem key={el.value} value={el.value}>
                        {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
              label={t('forms.hectares')}
              type="number"
              value={newAgricultural.hectares}
              error={Boolean(errors.hectares)}
              aria-errormessage={errors.hectares}
              id="outlined-controlled"
              fullWidth
              onChange={e => {
                if (!isNaN(e.target.value) && e.target.value !== 'e') setNewAgricultural({ ...newAgricultural, hectares: parseInt(e.target.value) });
              }}
            />
            <TextField
              label={t('forms.cover')}
              type="number"
              value={newAgricultural.coverHectares}
              id="outlined-controlled"
              fullWidth
              onChange={e => {
                if (!isNaN(e.target.value) && e.target.value !== 'e') setNewAgricultural({ ...newAgricultural, coverHectares: parseInt(e.target.value) });
              }}
            />
            <FormControl fullWidth error={Boolean(errors.driving)}>
                <InputLabel>{t('forms.management')}</InputLabel>
                <Select label={t('forms.crop')}value={newAgricultural.driving} onChange={(e) => setNewAgricultural({...newAgricultural, driving: e.target.value})}>
                    {drivingAgriculturalSelect.map(el => (
                        <MenuItem key={el.value} value={el.value}>
                        {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.lots)}>
                <InputLabel>{t('recordsCommon.lots')}</InputLabel>
                <Select fullWidth label={t('recordsCommon.lots')}  onChange={addAgriculturalLot} value={lotSelected} >
                    {lots.map(el => (
                        <MenuItem key={el.id} value={el.id}>
                        {el.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={() => handleAdd(newAgricultural)}>
            {t('buttons.add')} 
            </Button>
          </Stack>
          {newAgricultural.lots.length ?
          <>
            <Typography variant="subtitle1" mt={3} mx={1.5}>
              {t('titles.lotsAdded')}
            </Typography>
            <Stack direction="row" spacing={1} mx={1.5}>
                  {agriculturalLots.map((lot) => (
                  <Stack key={lot.id} direction="row" alignItems="center" spacing={1}>
                      <Typography>{lot.name}</Typography>
                      <IconButton size="small" onClick={() => removeAgriculturalLot(lot)}>
                      <CloseIcon fontSize="small" />
                      </IconButton>
                </Stack>
                  ))}
            </Stack>
          </> : <></>
          }
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            {agricultural.length ? 'Ok' : 'Cerrar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AddAgricultural.propTypes = {
  agricultural: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  lots: PropTypes.array
};
