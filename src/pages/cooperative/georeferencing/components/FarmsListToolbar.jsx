import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { Toolbar, InputAdornment, Button, Stack, Box } from '@mui/material';
// components
import Iconify from '../../../../components/utils/Iconify';
import InputStyle from '../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName, setFilteredFarms  } from '../../../../redux/slices/farmsCooperativa';
import FilterChip from './FilterChip';
import { useState } from 'react';
import InformationDialog from './InformationDialog';
// Adding for the users field
import { getUsersByCooperative } from '../utils/getFarms';


import FilterCountry from './FilterCountry';


// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

FarmsListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function FarmsListToolbar() {
  const { t } = useTranslation('georeferencing');
  const {  countries, filterName, filteredFamrs } = useSelector(state => state.farmsCooperativaSlice);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cooperative } = useSelector(state => state.authSlice);


  const handleClickOpen = () => {
    // Loading the available users list
    dispatch(getUsersByCooperative(cooperative.id));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 20, sm: 2 }} sx={{ justifyContent: 'center' }} >
    

        <Button variant="contained" onClick={handleClickOpen}>
          <InfoIcon /> &nbsp; {t('inputs.openGuide')}
        </Button>
        <Box>
          <InformationDialog open={open} onClose={handleClose} title={t('inputs.addFarm')} edit={false} />
        </Box> 


        <InputStyle
          stretchStart={400}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('inputs.findFarm')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <FilterChip />

        <FilterCountry setFilteredFarms={setFilteredFarms} userList={filteredFamrs} />
      </Stack>
    </RootStyle>
  );
}
