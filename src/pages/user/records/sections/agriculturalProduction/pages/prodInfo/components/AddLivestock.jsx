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

export const AddLivestock = ({ livestock, open, setOpen, setValue, watch, lots }) => {
    const [newLivestock, setNewLivestock] = useState({id: '', specieInput: '', species: [], hectares: '', driving : '', otherDriving: '', lots: [] });
    const isDesktop = useResponsive('up', 'sm');
    
    const [livestockLots, setLivestockLot] = useState([]);
    //const [livestockSpecies, setLivestockSpecies] = useState([]);
    const [errors, setErrors] = useState({species:'', hectares:'', density:'', driving:'', lots:''});
    const [lotSelected, setLotSelected] = useState('');

    const { t } = useTranslation('records');

    const handleAdd = liv => {
    
    const newErrors = {
        species: !liv.species.length ? t('forms.errorRequired') : '',
        hectares: liv.hectares === '' ?t('forms.errorRequired') : '',
        density: liv.density === '' ? t('forms.errorRequired') : '',
        driving: liv.driving === '' ? t('forms.errorRequired') : '',
        lots: !liv.lots.length ? t('forms.errorRequired') : '',
    };
    
    setErrors(newErrors);

    if(Object.values(newErrors).every(error => error === '')){    
        setValue('livestock', [...watch().livestock, liv]);
        setNewLivestock({ species: [], hectares: '', driving : '', density:'', otherDriving: '', lots: []});
        setLivestockLot([])
        setLotSelected('');
    }
    };
   
    
    const handleDelete = liv => {
        setValue(
            'livestock',
            watch().livestock.filter(el => el.id !== liv.id)
            );
        };
    
    const addLivestockLot = (e) =>{
        setLotSelected(e.target.value);
        if(!livestockLots.find(l => l.id === e.target.value)){
            setLivestockLot([...livestockLots, lots.find(lot => lot.id ===e.target.value)]);
            setNewLivestock({...newLivestock, lots: [...livestockLots, lots.find(lot => lot.id ===e.target.value)]})
        }
    }

    const removeLivestockLot = (lot) => {
        setLotSelected('');
        setLivestockLot(livestockLots.filter(l => l.id !== lot.id))
        setNewLivestock({...newLivestock, lots: livestockLots.filter(l => l.id !== lot.id)})
    }

    const addSpecie = () => {
        if (newLivestock.specieInput.trim() !== '') {
            setNewLivestock({
                ...newLivestock,
                species: [...newLivestock.species, newLivestock.specieInput],
                specieInput: '' 
            });
        }
    }

    const removeSpecie = (s) => {
        setNewLivestock({
            ...newLivestock, 
            species : newLivestock.species.filter(e => e !== s)
        })
    }

  const drivingLivestockSelect = [
    { value: 'INTENSIVE', label: t('selectOptions.intensive') },
    { value: 'EXTENSIVE', label: t('selectOptions.extensive') },
    { value: 'MIXED', label: t('selectOptions.mixed') },
    { value: 'OTHER', label: t('selectOptions.other') },
  ];

  
  //const lotsSelectOptions = lots.map(lot => {return {id: lot.id, label: lot.name}})
  return (
    <>
      <Chip label={livestock.length ? t('buttons.edit') : t('buttons.addLivestock')} onClick={() => setOpen(true)} />
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
        <DialogTitle>{t('titles.livestock')}</DialogTitle>
        <DialogContent>
          {livestock.length ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>{t('forms.species')}</StyledTableCell>
                  <StyledTableCell>{t('forms.hectares')}</StyledTableCell>
                  <StyledTableCell>{t('forms.animalH')}</StyledTableCell>
                  <StyledTableCell>{t('forms.management')}</StyledTableCell>
                  <StyledTableCell>{t('recordsCommon.lots')}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {livestock.length && livestock.map((liv, i) => (
                  <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">
                      {liv.species.join('-')}
                    </StyledTableCell>
                    <TableCell align="left">{liv.hectares}</TableCell>
                    <TableCell align="left">{liv.density}</TableCell>
                    <TableCell align="left">{liv.driving !== 'OTHER' ? liv.driving : liv.otherDriving}</TableCell>
                    <TableCell align="left">{liv.lots.map(l => l.label).join('-')}</TableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleDelete(liv)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : <></>}
          <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} mt={3} mx={1.5}>
          <TextField
              label={t('forms.species')}
              type="text"
              value={newLivestock.specieInput}
              error={Boolean(errors.species)}
              aria-errormessage={errors.species}
              id="outlined-controlled"
              fullWidth
              onChange={(e) => {
                setNewLivestock({ ...newLivestock, specieInput: e.target.value });
              }}
            />
            <Chip label={t('buttons.add')} onClick={addSpecie} />
            <TextField
              label={t('forms.hectares')}
              type="number"
              value={newLivestock.hectares}
              error={Boolean(errors.hectares)}
              aria-errormessage={errors.hectares}
              id="outlined-controlled"
              fullWidth
              onChange={e => {
                if (!isNaN(e.target.value) && e.target.value !== 'e') setNewLivestock({ ...newLivestock, hectares: parseInt(e.target.value) });
              }}
            />
            <TextField
              label={t('forms.animalH')}
              type="number"
              value={newLivestock.density}
              error={Boolean(errors.density)}
              aria-errormessage={errors.density}
              id="outlined-controlled"
              fullWidth
              onChange={e => {
                if (!isNaN(e.target.value) && e.target.value !== 'e') setNewLivestock({ ...newLivestock, density: parseInt(e.target.value) });
              }}
            />
            <FormControl fullWidth error={Boolean(errors.driving)}>
                <InputLabel>{t('forms.management')}</InputLabel>
                <Select label={t('forms.management')} value={newLivestock.driving} onChange={(e) => setNewLivestock({...newLivestock, driving: e.target.value})}>
                    {drivingLivestockSelect.map(el => (
                        <MenuItem key={el.value} value={el.value}>
                        {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.lots)}>
                <InputLabel>{t('recordsCommon.lots')}</InputLabel>
                <Select fullWidth label={t('recordsCommon.lots')}  onChange={addLivestockLot} value={lotSelected}>
                    <MenuItem></MenuItem>
                    {lots.map(el => (
                        <MenuItem key={el.id} value={el.id}>
                        {el.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={() => handleAdd(newLivestock)}>
              {t('buttons.add')}
            </Button>
          </Stack>
          {newLivestock.species.length ? 
          <>
            <Typography variant="subtitle1" mt={3} mx={1.5}>
                  {t('titles.speciesAdded')}
            </Typography>
            <Stack direction="row" spacing={1} mx={1.5}>
                  {newLivestock.species && newLivestock.species.map((s) => (
                  <Stack key={s} direction="row" alignItems="center" spacing={1}>
                      <Typography>{s}</Typography>
                      <IconButton size="small" value={s} onClick={() => removeSpecie(s)}>
                      <CloseIcon fontSize="small" />
                      </IconButton>
                  </Stack>
                  ))}
            </Stack>
          </> : <></>
          } 
          {newLivestock.lots.length ? 
          <>
            <Typography variant="subtitle1" mt={3} mx={1.5}>
                  {t('titles.lotsAdded')}
            </Typography>
            <Stack direction="row" spacing={1} mx={1.5}>
                  {livestockLots.map((lot) => (
                  <Stack key={lot.id} direction="row" alignItems="center" spacing={1}>
                      <Typography>{lot.name}</Typography>
                      <IconButton size="small" onClick={() => removeLivestockLot(lot)}>
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
            {livestock.length ? 'Ok' : t('buttons.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AddLivestock.propTypes = {
  livestock: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  lots: PropTypes.array
};
