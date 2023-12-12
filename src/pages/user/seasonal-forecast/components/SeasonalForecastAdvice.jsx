import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import { getForecastAdvice } from '../helpers';

const iconStyle = {
  fontSize: '6rem',
  verticalAlign: 'middle',
  padding: '1rem',
  marginRight: 'auto',
};

export const SeasonalForecastAdvice = ({ forecastResult }) => {
  if (!forecastResult) return null;
  const { forecastType, seasonalData } = forecastResult;
  const { value } = seasonalData;

  return (
    <Card sx={{ display: 'flex', maxHeight: '208px', mt: 2 }}>
      <CardMedia sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <InfoIcon style={iconStyle} color="info" />
      </CardMedia>
      <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>{getForecastAdvice(forecastType, value)}</Typography>
      </CardContent>
    </Card>
  );
};

SeasonalForecastAdvice.propTypes = {
  forecastResult: PropTypes.object,
};
