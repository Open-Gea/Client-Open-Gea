import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { Toolbar, InputAdornment, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import InputStyle from '../../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName } from '../../../../../redux/slices/systemUsers';
import FilterChip from './FilterChip';
import { useState } from 'react';
// Adding for the users field


// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

UsersInformationToolbar.propTypes = {
  handleStateChange: PropTypes.func,
  stateUsers: PropTypes.string,
  handleStateTypeUser: PropTypes.func,
  stateTypeUser: PropTypes.string,
};

export default function UsersInformationToolbar({handleStateChange, stateUsers, handleStateTypeUser, stateTypeUser}) {
  const { t } = useTranslation('users-management');
  const { filterName } = useSelector(s => s.systemUsersSlice);
  const dispatch = useDispatch();

  const availableStates= [
    t('inputs.ACTIVE'),
    t('inputs.DISABLED')
  ]
  const availableUsers = [
    t('inputs.organization')
  ]
 
  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <FormControl sx={{  mr: '1%', width: '50%' }}>
                <InputLabel id="state-select-label">{t('inputs.userType')}</InputLabel>
                <Select
                  labelId="state-user-select-label"
                  defaultValue={t('inputs.productor')}
                  id="year-select-label"
                  value={stateTypeUser}
                  onChange={handleStateTypeUser}
                  label="stateUserType"
                  sx={{ ml: 1 }}
                 // disabled={!!error}
                >
                  <MenuItem value={t('inputs.productor')} key={t('inputs.productor')}>
                    <em> {t('inputs.productor')} </em>
                  </MenuItem>
                  {availableUsers?.map(availableUserType => (
                    <MenuItem key={availableUserType} value={availableUserType}>
                      {availableUserType}
                    </MenuItem>
                  ))}

                </Select>
        </FormControl>
        <FormControl sx={{  mr: '1%', width: '50%' }}>
                <InputLabel id="state-select-label">{t('inputs.state')}</InputLabel>
                <Select
                  labelId="state-select-label"
                  defaultValue={t('inputs.allUsers')}
                  id="year-select-label"
                  value={stateUsers}
                  onChange={handleStateChange}
                  label="stateRequests"
                  sx={{ ml: 1 }}
                 // disabled={!!error}
                >
                  <MenuItem value={t('inputs.allUsers')} key={t('inputs.allUsers')}>
                    <em> {t('inputs.allUsers')} </em>
                  </MenuItem>
                  {availableStates?.map(availableState => (
                    <MenuItem key={availableState} value={availableState}>
                      {availableState}
                    </MenuItem>
                  ))}

                </Select>
        </FormControl>

        <InputStyle
          stretchStart={200}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('inputs.findUser')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FilterChip />
      </Stack>
    </RootStyle>
  );
}
