import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ForecastList } from './components';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ForecastDateTimePicker } from './components/ForecastDateTimePicker';
import { useWeatherForecast } from './hooks';
import { Helmet } from 'react-helmet-async';

export default function WeatherForecast() {
  const { i18n, t } = useTranslation('weather-forecast');
  const { preloadFarmData, refreshAllForecasts, cleanForecast } = useWeatherForecast();
  const [selectedValidDate, setSelectedValidDate] = useState(null);

  // Initial load
  useEffect(() => {
    preloadFarmData();
    return () => {
      cleanForecast();
    };
  }, []);

  const onValidDateChange = async datetime => {
    setSelectedValidDate(datetime);
    refreshAllForecasts(datetime);
  };
  
  // Detects a language change and refreshes API data automatically
  useEffect(() => {
    refreshAllForecasts(selectedValidDate);
  }, [i18n.language])
  

  // Note: LocalizationProvider is required for MUI's DateTimePicker.
  return (
    <>
      <Helmet>
        <title> {t('title')} | yvy </title>
      </Helmet>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3}>
        <Box
          variant="solid"
          sx={{
            flexGrow: 1,
            p: 2,
            borderRadius: { xs: 0, sm: 'xs' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ flex: '6 1 75%' }}>
              <Typography variant="h4">{t('title')}</Typography>
            </Box>

            <Box sx={{ flex: '1 1 25%' }}>
              <ForecastDateTimePicker onDateChange={onValidDateChange} />
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />

          <ForecastList selectedValidDate={selectedValidDate} />
        </Box>
      </Paper>
    </LocalizationProvider>
    </>
  );
}
