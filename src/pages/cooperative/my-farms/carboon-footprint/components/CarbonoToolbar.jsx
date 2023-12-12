import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Paper,
  CardContent,
  Grid,
  Box,
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

export default function CarbonoToolbar({ farmId, handleChange, handleYearChange, farms, year, handleClickOpen, error, isLoading }) {
  const { t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');

  // Generate array with the years available to select, example: actual year is 2023, so generated array is [2020,2021,2022]
  const availableYears = Array.from(
    { length: ((new Date().getFullYear() - 1) - 2020) / 1 + 1 },
    (value, index) => ((2020 + index * 1).toString())
    );


  return (
    <>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('title2')}
          sx={{ mb: 0 }}
          links={[
            { name: t('navigation.home'), href: '/dashboard/main' },
            { name: t('navigation.myFarms'), href: '/dashboard/main/myFarms' },
            { name: t('navigation.carbonFoot'), href: '/dashboard/main/myFarms/page/carboonFootprints' },
          ]}
        />
      </RootStyle>
      <Paper elevation={3}>
        <CardContent>
          <Grid container spacing={1}>
            <Box sx={{ minWidth: 1220, display:'flex', alignItems:'end',maxWidth:'100%' }}>
              <FormControl sx={{  mr: '2%', width: '25%' }}>
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
            </Box>
          </Grid>
        <br />
        </CardContent>
      </Paper>    </>
  );
}

CarbonoToolbar.propTypes = {
  farmId: PropTypes.string,
  year: PropTypes.string,
  handleClickOpen: PropTypes.func,
  handleChange: PropTypes.func,
  handleYearChange: PropTypes.func,
  handleClose: PropTypes.func,
  farms: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};
