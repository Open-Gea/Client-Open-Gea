import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Paper,
  CardContent,
  Grid,
  Toolbar,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import HeaderBreadcrumbs from '../../../../../components/utils/HeaderBreadcrumbs';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1, 1, 3),
}));

export default function EvaTransToolbar({ farmId, handleChange, handleYearChange, year, farms, error, isLoading }) {

  const { t } = useTranslation('water-footprint');
  const { t: tCommon } = useTranslation('common');

  // Generate array with the years available to select, example: actual year is 2023, so generated array is [2020,2021,2022]
  const availableYears = Array.from(
  { length: ((new Date().getFullYear()) - 2020) / 1 + 1 },
  (value, index) => ((2020 + index * 1).toString())
  );

  return (
    <>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('title2')}
          sx={{ mb: 0 }}
          links={[
            { name: t('inputs.home'), href: '/dashboard/main' },
            { name: t('inputs.myFarms'), href: '/dashboard/main/myFarms' },
            { name: t('inputs.hydricFootprints'), href: '/dashboard/main/myFarms/page/waterFootprints' },
          ]}
        />
      </RootStyle>
      <Paper elevation={3}>
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
        <FormControl sx={{  mr: '2%', width: '18%' }}>
                <InputLabel id="year-select-label">{t('inputs.yearLabel')}</InputLabel>
                <Select
                  labelId="year-select-label"
                  defaultValue=""
                  id="year-select-label"
                  value={year}
                  label="Year"
                  onChange={handleYearChange}
                  sx={{ ml: 1 }}
                  disabled={!!error}
                >
                  <MenuItem value={t('inputs.allYears') } key={t('inputs.allYears') }>
                    <em> {t('inputs.allYears') }</em>
                  </MenuItem>
                  {availableYears?.map(availableYear => (
                    <MenuItem key={availableYear} value={availableYear}>
                      {availableYear}
                    </MenuItem>
                  ))}

                </Select>
          </FormControl>
      </Stack>
      <br/>
      <br/>
      </Paper>
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
