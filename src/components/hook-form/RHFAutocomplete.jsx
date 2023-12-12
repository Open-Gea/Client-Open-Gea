import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
// Others
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { styled, lighten, darken } from '@mui/system';
import DefaultProfilePhoto from '../../assets/mainviewImg/default_user_profile.png';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  options: PropTypes.any,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  farmInfo: PropTypes.object,
  value: PropTypes.object,
};

export default function RHFAutocomplete({ name, options, value, label, farmInfo, errorMessage, ...other }) {
  const { control } = useFormContext();

  // Required to group by the first letter
  const optionsFinal = options.map((option) => {
    const firstLetter = option.displayName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === 'light'
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));
  const GroupItems = styled('ul')({
    padding: 0,
  });
  // //////////////////////////////////


  // Define image for the autocomplete, default image if the user is not having a profile picture available
  const createImageSrc = (data) => {
    if(data === undefined){
      return DefaultProfilePhoto;
    }else{
      if(data.profilePicture === null){
        return DefaultProfilePhoto;
      }else{
        return URL.createObjectURL(new Blob([new Uint8Array((data.profilePicture)?.data)], { type: 'image/png' }));
      }
    }
  };


  return (
      <Controller
          name={name}
          control={control}
          rules={{
            required: errorMessage
          }}
          render={({ field, fieldState }) => {
            return (
              <Autocomplete
                {...field}
                options={optionsFinal}
                value={value}
                getOptionLabel={(option) => option.displayName +' '+option.lastName}
                groupBy={(option) => option.firstLetter}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`${createImageSrc(option)}`}
                      srcSet={`${createImageSrc(option)} 2x`}
                      alt=""
                    />
                    {option.displayName} {option.lastName}
                  </Box>
                )}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                  
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            );
          }}
        />
  );

}
