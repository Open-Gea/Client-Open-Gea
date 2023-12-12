import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Thunderstorm from '@mui/icons-material/Thunderstorm';
import Thermostat from '@mui/icons-material/Thermostat';
import Opacity from '@mui/icons-material/Opacity';
import DeleteIcon from '@mui/icons-material/Delete';
import ExploreIcon from '@mui/icons-material/Explore';
import Air from '@mui/icons-material/Air';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useWeatherForecast } from '../hooks';
import { ForecastCard } from './';
import Divider from '@mui/material/Divider';
import { mapForecastToBulletPoints, getIconFilename, mapNextDaysForecast } from '../helpers/formatForecast';
import { ForecastCarousel } from './ForecastCarousel';

export const ForecastListItem = ({ farmInfo }) => {
  const { t } = useTranslation('weather-forecast');
  const { changeFarmStatusToUnselected, isLoadingForecast } = useWeatherForecast();

  // Checks if forecast is empty and has already finished loading
  const hasAvailableForecast = Object.keys(farmInfo.forecastDetails).length !== 0 && !isLoadingForecast;
  const hasNextDaysForecast = Object.keys(farmInfo.nextDaysForecast).length !== 0 && !isLoadingForecast;

  // Checks if UI should display no data available error.
  const showNoDataFoundAlert = !isLoadingForecast && !hasAvailableForecast;

  // Returns hourly forecast values ready to display on component.
  const mappedForecastInfo = mapForecastToBulletPoints(farmInfo.forecastDetails || null);

  // Returns next days forecast values ready to display on component.
  const mappedNextDaysForecast = mapNextDaysForecast(farmInfo.nextDaysForecast || []);

  const handleOnFarmUnselection = () => {
    changeFarmStatusToUnselected(farmInfo.farmId);
  };

  const getForecastIcon = () => {
    const { iconCode, wxPhraseLong } = farmInfo?.forecastDetails;
    return (
      <img
        src={`/assets/weather-forecast/${getIconFilename(iconCode)}`}
        alt={wxPhraseLong}
        loading="lazy"
        style={{ height: '12rem', padding: '2rem' }}
      />
    );
  };

  return (
    <>
      <Box
        variant="solid"
        sx={{
          flexGrow: 1,
          p: 2,
          borderRadius: { xs: 0, sm: 'xs' },
        }}
      >
        {/* Forecast Header */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 98%' }}>
            <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
              <Box>
                <ExploreIcon fontSize="large" color="primary" />
              </Box>
              <Box>
                <Typography variant="h5">{farmInfo.name}</Typography>
                <Typography variant="body">{farmInfo.location}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 2%' }}>
            <IconButton aria-label="delete" color="danger" onClick={handleOnFarmUnselection}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* When forecast is not available */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Could not retrieve forecast/not available forecast alert */}
          {showNoDataFoundAlert && (
            <Alert variant="outlined" severity="info">
              <AlertTitle>{t('alerts.forecastNotAvailableTitle')}</AlertTitle>
              {t('alerts.forecastNotAvailableDescription')}
            </Alert>
          )}
          {/* Loading forecast Skeleton body */}
          {isLoadingForecast && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
              <Skeleton sx={{ bgcolor: 'grey.100' }} variant="rounded" width={450} height={96} />
            </Box>
          )}
        </Box>
        {/* Forecast information cards grid */}
        {hasAvailableForecast && (
          <>
            <Typography variant="h6" sx={{ my: 2 }}>
              {t('selectedHour')}
            </Typography>
            <Box
              display="grid"
              gridTemplateRows="repeat(2, minmax(96px, max-content))"
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={2}
            >
              <Box gridColumn="span 2" gridRow="span 2">
                <ForecastCard mainIcon={getForecastIcon()} bulletPoints={mappedForecastInfo?.summary} />
              </Box>
              <Box gridColumn="span 2">
                <ForecastCard icon={<Thermostat color="primary" />} bulletPoints={mappedForecastInfo?.temperature} />
              </Box>
              <Box gridColumn="span 2">
                <ForecastCard icon={<Opacity color="primary" />} bulletPoints={mappedForecastInfo?.humidity} />
              </Box>
              <Box gridColumn="span 2">
                <ForecastCard icon={<Thunderstorm color="primary" />} bulletPoints={mappedForecastInfo?.rain} />
              </Box>
              <Box gridColumn="span 2">
                <ForecastCard icon={<Air color="primary" />} bulletPoints={mappedForecastInfo?.wind} />
              </Box>
            </Box>
            <Typography variant="h6" sx={{ my: 2 }}>
            {t('nextDaysTitle')}
            </Typography>

          {/* Next days forecast */}
          {!hasNextDaysForecast ? (
            <Alert variant="outlined" severity="info">
              <AlertTitle>{t('alerts.nextDaysForecastNotAvailableTitle')}</AlertTitle>
              {t('alerts.nextDaysForecastNotAvailableDescription')}
            </Alert>
          ) : (
            <ForecastCarousel nextDaysForecast={mappedNextDaysForecast} />
          )}
          </>
        )}
      </Box>
    </>
  );
};

ForecastListItem.propTypes = {
  farmInfo: PropTypes.object,
  selectedValidDate: PropTypes.object,
};
