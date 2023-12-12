import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AlertTitle from '@mui/material/AlertTitle';
import MenuItem from '@mui/material/MenuItem';
import { useWeatherForecast } from '../hooks';
import { ForecastListItem } from './ForecastListItem';
import AddIcon from '@mui/icons-material/AddBox';

export const ForecastList = ({ selectedValidDate }) => {
  const {
    shouldAllowNewFarmSelection,
    selectedFarmList,
    mappedFarmsForDropdown,
    changeFarmStatusToSelected,
    refreshForecastByFarmId,
    isLoadingFarms,
  } = useWeatherForecast();

  const { t } = useTranslation('weather-forecast');
  const { t: tCommon } = useTranslation('common');

  const isDateSelected = !!selectedValidDate;
  // eslint-disable-next-line no-extra-boolean-cast
  const shouldShowNoFarmsAlert = !(!!mappedFarmsForDropdown) && !isLoadingFarms;

  const handleNewFarmSelection = event => {
    event.preventDefault();
    const selectedFarmId = event.target.value || 0;

    changeFarmStatusToSelected(selectedFarmId);
    refreshForecastByFarmId(selectedFarmId, selectedValidDate);
  };

  return (
    <>
      {/* When user has no farms */}
      {shouldShowNoFarmsAlert && (
        <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
          <AlertTitle>{t('alerts.noAvailableFarmsTitle')}</AlertTitle>
          {t('alerts.noAvailableFarmsDescription')}
        </Alert>
      )}

      {/* Default alert selection */}
      {!isDateSelected && (
        <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
          <AlertTitle>{t('alerts.selectDateTimeTitle')}</AlertTitle>
          {t('alerts.selectDateTimeDescription')}
        </Alert>
      )}

      {/* Renders forecast list */}
      {selectedFarmList.map(farmItem => {
        if (!farmItem.forecastDetails) return null;
        return <ForecastListItem key={farmItem.farmId} farmInfo={farmItem} selectedValidDate={selectedValidDate} />;
      })}

      {/* Renders new farm forescast selection */}
      {shouldAllowNewFarmSelection && isDateSelected && (
        <Box
          variant="solid"
          sx={{
            flexGrow: 1,
            p: 2,
            borderRadius: { xs: 0, sm: 'xs' },
            mt: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ flex: '6 1 80%' }}>
              <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <Box>
                  <AddIcon fontSize="large" color="primary" />
                </Box>
                <Box>
                  <Typography variant="h5">{t('pickFarmLabel')}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: '1 1 20%' }}>
              <FormControl fullWidth>
                <InputLabel>{t('farmLabel')}</InputLabel>

                {/* Allows the user to select a new farm to display */}
                {/* This will always reset its value to 0 (but will read user selection via onChange event) */}
                <Select name="newFarm" value="0" onChange={handleNewFarmSelection}>
                  <MenuItem value="0" disabled>
                    {tCommon('defaultSelectValue')}
                  </MenuItem>
                  {mappedFarmsForDropdown.map(farm => (
                    <MenuItem disabled={farm.isSelected} key={farm.farmId} value={farm.farmId}>
                      {farm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

ForecastList.propTypes = {
  selectedValidDate: PropTypes.object,
};
