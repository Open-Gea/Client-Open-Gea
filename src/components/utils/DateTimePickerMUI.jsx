import PropTypes from 'prop-types';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function DateTimePickerMUI({ value, onChange, error, label, views = null }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ m: 0, p: 0 }}>
        <DateTimePicker
          views={views}
          label={label}
          format="DD/MM/YYYY HH:mm"
          value={dayjs(value)}
          onChange={onChange}
          slotProps={{ textField: { helperText: error?.message, error: !!error, variant: 'filled', fullWidth: true } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
DateTimePickerMUI.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  error: PropTypes.any,
  label: PropTypes.string,
  views: PropTypes.any,
  format: PropTypes.string,
};
