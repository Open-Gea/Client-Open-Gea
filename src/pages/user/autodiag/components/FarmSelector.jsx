import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select, Stack, Button, Typography, Box } from '@mui/material';
// Translation module
import { useTranslation } from 'react-i18next';

export function FarmSelector({ farmId, handleChange, farms, handleClickOpen, error, isLoading }) {
  const { t } = useTranslation('self-diagnosis');

  return (
    <>
        <FormControl sx={{ minWidth: '50%' }}>
          <InputLabel id="farm-selector-label">{t('actionMessages.selectFarm')}</InputLabel>
          <Select
            labelId="farm-selector-label"
            defaultValue=""
            id="farm-selector"
            value={farmId}
            onChange={handleChange}
            sx={{ ml: 1 }}
            disabled={!!error || isLoading}
          >
            <MenuItem value="" disabled>
              <em>{t('actionMessages.selectFarm')}</em>
            </MenuItem>
            {farms?.map(farm => (
              <MenuItem key={farm.id} value={farm.id}>
                {farm.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </>
  );
}

FarmSelector.propTypes = {
  farmId: PropTypes.string,
  handleClickOpen: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  farms: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};