import PropTypes from 'prop-types';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerMUI({ value, onChange, error, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ m: 0, p: 0 }}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{ textField: { variant: 'filled', helperText: error?.message, error: !!error } }}
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
};
