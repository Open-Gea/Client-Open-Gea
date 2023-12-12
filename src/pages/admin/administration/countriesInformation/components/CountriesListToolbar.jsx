import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Toolbar, InputAdornment, Button, Stack, Box } from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import InputStyle from '../../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName } from '../../../../../redux/slices/countriesAdmin';
import { useState } from 'react';
import AddEditCountryDialog from './AddEditCountryDialog';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

CountriesListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function CountriesListToolbar() {
  const { t } = useTranslation('countries');
  const { filterName, countries, officialCountries } = useSelector(s => s.countriesAdminSlice);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          <AddIcon /> {t('inputs.addCountry')}
        </Button>
        <Box>
          <AddEditCountryDialog open={open} onClose={handleClose} title={t('inputs.addCountry')} edit={false} countries={countries} officialCountries={officialCountries} />
        </Box>

        <InputStyle
          stretchStart={200}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('inputs.findCountry')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </RootStyle>
  );
}
