import PropTypes from 'prop-types';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickerMUI({ value, onChange, error, label, views = null, format = 'DD/MM/YYYY' }) {
  const valueAux = value === undefined ? '' : value;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ m: 0, p: 0 }}>
        <DatePicker
          views={views}
          label={label}
          format={format}
          value={dayjs(valueAux)}
          onChange={onChange}
          slotProps={{ textField: { helperText: error?.message, error: !!error, variant: 'filled', fullWidth: true } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
DatePickerMUI.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  error: PropTypes.any,
  label: PropTypes.string,
  views: PropTypes.any,
  format: PropTypes.string,
};
