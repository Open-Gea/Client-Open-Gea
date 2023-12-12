import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSeasonalForecast } from './hooks';
import { SeasonalForecastSelection, SeasonalForecastDescription, SeasonalForecastSummary, SeasonalForecastAdvice } from './components';

export default function WeatherForecast() {
  const { t } = useTranslation('seasonal-forecast');
  const { preloadFarmData, clearForecastModule, hasError } = useSeasonalForecast();
  const [forecastResult, setForecastResult] = useState(null);

  // Initial load
  useEffect(() => {
    preloadFarmData();
    return () => {
      clearForecastModule();
    };
  }, []);

  const onForecastResult = result => {
    // also sends nullish values (useful for resetting a result).
    setForecastResult(result);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={11}>
        <Paper elevation={3}>
          <Box
            variant="solid"
            sx={{
              flexGrow: 1,
              p: 2,
              borderRadius: { xs: 0, sm: 'xs' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">{t('title')}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <SeasonalForecastSelection onForecastResult={onForecastResult} />
            <Divider sx={{ my: 2 }} />
            {hasError ? (
              <Alert severity="error">
                <AlertTitle>{t('alerts.hasErrorTitle')}</AlertTitle>
                {t('alerts.hasErrorDescription')}
              </Alert>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { md: 'row', xs: 'column' } }}>
                  <Box sx={{ flex: '1 1 30%', flexGrow: { xs: '100%', md: '30%' } }}>
                    <SeasonalForecastSummary forecastResult={forecastResult} />
                  </Box>

                  <Box sx={{ flex: '1 1 70%' }}>
                    <SeasonalForecastDescription forecastResult={forecastResult} />
                    <SeasonalForecastAdvice forecastResult={forecastResult} />
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
