import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { 
  Toolbar, 
  InputAdornment, 
  Stack, 
  FormControl,
  InputLabel,
  MenuItem,
  Select, 
} from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import InputStyle from '../../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName } from '../../../../../redux/slices/requestsCooperativa';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

RequestsListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function RequestsListToolbar({handleStateChange,stateRequests}) {
  const { t } = useTranslation('invites');
  const { filterName } = useSelector(s => s.requestsCooperativaSlice);
  const dispatch = useDispatch();

  const availableStates= [
    t('inputs.approved'),
    t('inputs.rejected'),
    t('inputs.pending'),
  ]

  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <FormControl sx={{  mr: '1%', width: '40%' }}>
                <InputLabel id="state-select-label">{t('inputs.estado')}</InputLabel>
                <Select
                  labelId="state-select-label"
                  defaultValue={t('inputs.allRequests')}
                  id="year-select-label"
                  value={stateRequests}
                  onChange={handleStateChange}
                  label="stateRequests"
                  sx={{ ml: 1 }}
                 // disabled={!!error}
                >
                  <MenuItem value={t('inputs.allRequests')} key={t('inputs.allRequests')}>
                    <em> {t('inputs.allRequests')} </em>
                  </MenuItem>
                  {availableStates?.map(availableState => (
                    <MenuItem key={availableState} value={availableState}>
                      {availableState}
                    </MenuItem>
                  ))}

                </Select>
        </FormControl>

        <InputStyle
          stretchStart={300}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('inputs.searchUserRequest')}
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

RequestsListToolbar.propTypes ={
  handleStateChange: PropTypes.func,
  stateRequests: PropTypes.string,
}
