import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Input } from '@mui/material';

const RHFInputFile = ({ name, label, control, rules, accept }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input
            id={name}
            type="file"
            onBlur={onBlur}
            onChange={e => onChange(e.target.files ? e.target.files : null)}
            inputProps={{ accept }}
          />
        </FormControl>
      )}
    />
  );
};

export default RHFInputFile;