import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1, 1, 3),
}));

export default function EvaTransToolbar({ farmId, handleChange, farms, handleClickOpen, error, isLoading }) {

  const { t } = useTranslation('water-footprint');
  const { t: tCommon } = useTranslation('common');

  return (
    <>
      <RootStyle>
        <Typography variant="h4" noWrap>
          {t('title')}
        </Typography>
      </RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <FormControl sx={{ minWidth: '50%' }}>
          <InputLabel id="demo-simple-select-label">{t('inputs.farmLabel')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            defaultValue=""
            id="demo-simple-select"
            value={farmId}
            label={t('inputs.farmLabel')}
            onChange={handleChange}
            sx={{ ml: 1 }}
            disabled={!!error}
          >
            <MenuItem value="">
              <em>{tCommon('defaultSelectValue')}</em>
            </MenuItem>
            {farms?.map(finca => (
              <MenuItem key={finca.id} value={finca.id}>
                {finca.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleClickOpen} disabled={!!error || isLoading}>
          {t('inputs.footprintSubmit')}
        </Button>
      </Stack>
    </>
  );
}

EvaTransToolbar.propTypes = {
  farmId: PropTypes.string,
  handleClickOpen: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  farms: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};
