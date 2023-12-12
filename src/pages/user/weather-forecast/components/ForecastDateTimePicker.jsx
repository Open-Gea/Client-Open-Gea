import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getMinutes, set, addDays } from 'date-fns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { useTranslation } from 'react-i18next';

// Maximum allowed days in the future to forecast.
const maxDays = 14;

const defaultDate = set(new Date(), { minutes: 0, seconds: 0, milliseconds: 0 });
const maxDate = set(addDays(new Date(), maxDays), { minutes: 0, seconds: 0, milliseconds: 0 });

const getDateValidationProps = () => ({
  // Disables minutes input field.
  shouldDisableTime: (value, view) => view === 'minutes' && getMinutes(value) >= 1,
  // Date range of allowed values.
  minDate: defaultDate,
  maxDate,
});

export const ForecastDateTimePicker = ({ onDateChange }) => {
  const { t } = useTranslation('weather-forecast');
  // controls selected date value (even if it is invalid).
  const [dateValue, setDateValue] = useState(defaultDate);

  // controls error value, if there's any.
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'shouldDisableTime-minutes':
        return t('mustBeTopOfHour');
      case 'minDate':
        return t('validations.minDate');
      case 'maxDate':
        return t('validations.maxDate');
      default:
        return '';
    }
  }, [error]);

  const handleDatetimeChange = (selectedDatetime, error) => {
    setDateValue(selectedDatetime);

    if (error?.validationError) {
      setError(error.validationError);
      return null;
    } else {
      setError(null);
    }

    // Only valid dates are emmited to the parent.
    onDateChange(selectedDatetime);
  };

  return (
    <>
      {/* DesktopDateTimePicker and MobileDateTimePicker: */}
      {/* Both are required for responsible layouts, however only one shows up */}
      <DesktopDateTimePicker
        {...getDateValidationProps()}
        sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
        views={['year', 'month', 'day', 'hours']}
        label={t('dateLabel')}
        value={dateValue}
        onChange={(selectedDatetime, error) => handleDatetimeChange(selectedDatetime, error)}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
      />
      <MobileDateTimePicker
        {...getDateValidationProps()}
        sx={{ ml: 'auto', display: { md: 'none', xs: 'flex' } }}
        views={['year', 'month', 'day', 'hours']}
        label={t('dateLabel')}
        value={dateValue}
        onChange={(selectedDatetime, error) => handleDatetimeChange(selectedDatetime, error)}
        closeOnSelect
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
      />
    </>
  );
};

ForecastDateTimePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};
