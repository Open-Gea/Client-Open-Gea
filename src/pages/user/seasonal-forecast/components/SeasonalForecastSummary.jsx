import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import { getDateLabelBySelectedRange, getForecastResultLabel } from '../helpers';

import Opacity from '@mui/icons-material/Opacity';
import Thermostat from '@mui/icons-material/Thermostat';

import { getColorByForecastType } from '../helpers/getForecastColors';

const iconStyle = {
  fontSize: '8rem',
  verticalAlign: 'middle',
  padding: '1rem',
};

const getForecastIcon = (forecastType, value) => {
  if (!forecastType || !value) return null;
  switch (forecastType) {
    case 'temperature':
      return <Thermostat style={iconStyle} color={getColorByForecastType(forecastType, value)} />;
    case 'precipitation':
      return <Opacity style={iconStyle} color={getColorByForecastType(forecastType, value)} />;
    default:
      return <Cloud style={iconStyle} color="gray.100" />;
  }
};

export const SeasonalForecastSummary = ({ forecastResult }) => {
  if (!forecastResult) return null;
  const { forecastType, timeRange, seasonalData } = forecastResult;
  const { value, t } = seasonalData;
  return (
    <Card sx={{ display: { xs: 'flex', md: 'block' }, minHeight: { xs: 'max-content', md: '224px' } }}>
      <CardMedia sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        {getForecastIcon(forecastType, value)}
      </CardMedia>
      <CardContent>
        <Typography textAlign="center" variant="h5">
          {getDateLabelBySelectedRange(timeRange, t)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography textAlign="center" color={getColorByForecastType(forecastType, value)}>
          {getForecastResultLabel(forecastType, value)}
        </Typography>
      </CardContent>
    </Card>
  );
};

SeasonalForecastSummary.propTypes = {
  forecastResult: PropTypes.object,
};
