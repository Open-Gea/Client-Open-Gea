import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useSeasonalForecast } from '../hooks';

export const SeasonalForecastSelection = ({ onForecastResult }) => {
  const { t } = useTranslation('seasonal-forecast');
  const { t: tCommon } = useTranslation('common');
  const { mappedFarms, loadAvailableDates, getDropdownDates, isLoadingDates, getValidFormResult, isLoadingForecast, isLoadingFarms, hasError } =
    useSeasonalForecast();

  const shouldBlockForm = isLoadingDates || isLoadingForecast || isLoadingFarms;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors, isValid },
  } = useForm({
    defaultValues: {
      farmId: '',
      forecastType: '',
      timeRange: '',
      date: '',
    },
  });

  const onSubmit = async formData => {
    const result = await getValidFormResult(formData);

    // maps extra date information which is not directly saved in the form (e.g cannot save a date range as a form value).
    onForecastResult(result);
  };

  // Refreshes available dates in case the user selects another time range.
  useEffect(() => {
    const selectedForecastType = watch('forecastType');
    const selectedTimeRange = watch('timeRange');
    if (!selectedForecastType || !selectedTimeRange) return;

    setValue('date', '');
    loadAvailableDates(selectedForecastType, selectedTimeRange);

    onForecastResult(null);
  }, [watch('timeRange')]);

  // Cleans required values if forecastType changes
  useEffect(() => {
    setValue('date', '');
    setValue('timeRange', '');

    onForecastResult(null);
  }, [watch('forecastType')]);

  // Cleans required values if farmId changes
  useEffect(() => {
    setValue('forecastType', '');
    setValue('date', '');
    setValue('timeRange', '');
  }, [watch('farmId')]);

  // Cleans result if user selects another date.
  useEffect(() => {
    onForecastResult(null);
  }, [watch('date')]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems="center">
        {/* Farm Selection */}
        <Grid item xs={12} md={3}>
          <Controller
            name="farmId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth error={!!formErrors.farmId}>
                <InputLabel id="farms-label">{t('farmInput.label')}</InputLabel>
                <Select {...field} fullWidth labelId="farms-label" id="farm-selection" label={t('farmInput.label')} disabled={shouldBlockForm}>
                  <MenuItem value="">{tCommon('defaultSelectValue')}</MenuItem>
                  {mappedFarms.map(farm => (
                    <MenuItem key={farm.farmId} value={farm.farmId}>
                      {farm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <FormHelperText>{t('farmInput.labelHelp')}</FormHelperText>
        </Grid>
        {/* Forecast type selection */}
        <Grid item xs={12} md={3}>
          <Controller
            name="forecastType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth error={!!formErrors.forecastType}>
                <InputLabel id="forecast-type-label">{t('forecastTypeInput.label')}</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="forecast-type-label"
                  id="forecast-type-selection"
                  label={t('forecastTypeInput.label')}
                  disabled={shouldBlockForm}
                >
                  <MenuItem value="">{tCommon('defaultSelectValue')}</MenuItem>
                  <MenuItem value="temperature">{t('forecastTypeInput.temperatureLabel')}</MenuItem>
                  <MenuItem value="precipitation">{t('forecastTypeInput.precipitationLabel')}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <FormHelperText>{t('forecastTypeInput.labelHelp')}</FormHelperText>
        </Grid>
        {/* Time range selection */}
        <Grid item xs={12} md={3}>
          <Controller
            name="timeRange"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth error={!!formErrors.timeRange}>
                <InputLabel id="time-range-label">{t('timeRangeInput.label')}</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="time-range-label"
                  id="time-range-selection"
                  label={t('timeRangeInput.label')}
                  disabled={shouldBlockForm}
                >
                  <MenuItem value="">{tCommon('defaultSelectValue')}</MenuItem>
                  {/* quarterly = three months */}
                  <MenuItem value="quarterly">{t('timeRangeInput.quarterlyLabel')}</MenuItem>
                  <MenuItem value="monthly">{t('timeRangeInput.monthlyLabel')}</MenuItem>
                  <MenuItem value="weekly">{t('timeRangeInput.weeklyLabel')}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <FormHelperText>{t('timeRangeInput.labelHelp')}</FormHelperText>
        </Grid>
        {/* Week selection */}
        <Grid item xs={12} md={3}>
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth error={!!formErrors.date}>
                <InputLabel id="date-label">{t('dateInput.label')}</InputLabel>
                <Select {...field} fullWidth labelId="date-label" id="date-selection" label={t('dateInput.label')} disabled={shouldBlockForm || hasError}>
                  <MenuItem value="">{tCommon('defaultSelectValue')}</MenuItem>
                  {getDropdownDates().map(availableDate => (
                    <MenuItem key={availableDate.id} value={availableDate.id}>
                      {availableDate.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <FormHelperText>{t('dateInput.labelHelp')}</FormHelperText>
        </Grid>
        {/* Submit button */}
        <Grid item xs={12} md={3}>
          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'inline-block', margin: '0 auto' }}
            disabled={shouldBlockForm || !isValid}
          >
            {t('submitLabel')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

SeasonalForecastSelection.propTypes = {
  onForecastResult: PropTypes.func.isRequired,
};
