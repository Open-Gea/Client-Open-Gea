import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingFlat from '@mui/icons-material/TrendingFlat';
import { getForecastDescription } from '../helpers';
import { getColorByForecastType } from '../helpers/getForecastColors';

const iconStyle = {
  fontSize: '6rem',
  verticalAlign: 'middle',
  padding: '1rem',
  marginRight: 'auto',
};

const getValueIcon = (forecastType, value) => {
  if (!value) return null;

  const fixedValue = Number(value.toFixed(4));

  // Will return the one that matches with "true"
  switch (true) {
    case fixedValue > 0:
      return <TrendingUp style={iconStyle} color={getColorByForecastType(forecastType, value)} />;
    case fixedValue < 0:
      return <TrendingDown style={iconStyle} color={getColorByForecastType(forecastType, value)} />;
    case fixedValue === 0:
      return <TrendingFlat style={iconStyle} color={getColorByForecastType(forecastType, value)} />;
    default:
      return null;
  }
};

export const SeasonalForecastDescription = ({ forecastResult }) => {
  if (!forecastResult) return null;
  const { forecastType, timeRange, seasonalData } = forecastResult;
  const { value } = seasonalData;

  return (
    <Card sx={{ display: 'flex', maxHeight: '208px', mt: 2 }}>
      <CardMedia sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        {getValueIcon(forecastType, value)}
      </CardMedia>
      <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>{getForecastDescription(forecastType, timeRange, value)}</Typography>
      </CardContent>
    </Card>
  );
};

SeasonalForecastDescription.propTypes = {
  forecastResult: PropTypes.object,
};
