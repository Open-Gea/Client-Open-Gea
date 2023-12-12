import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getIconFilename } from '../helpers/formatForecast';

export const DailyForecastCard = ({ formattedDate, iconCode = 'na', altText = '', pp = '', temperatureMin = '', temperatureMax = '' }) => {
  const getForecastIcon = () => {
    return (
      <img
        src={`/assets/weather-forecast/${getIconFilename(iconCode)}`}
        alt={altText}
        loading="lazy"
        style={{ width: '20rem', padding: '1.5rem' }}
      />
    );
  };

  return (
    <Card sx={{ minWidth: { xs: '9em', sm: '10rem'}, overflow: 'visible' }} elevation={0}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {formattedDate}
        </Typography>
        {/* Card Icon */}
        {getForecastIcon()}
        {/* min/max temps */}
        <Typography variant="body2" color="text.secondary">
          {`${temperatureMin || '-'} / ${temperatureMax || '-'}`}
        </Typography>
        {/* Pp */}
        <Typography variant="body2" color="text.primary" component="span">
          {pp || '-'}
        </Typography>
      </CardContent>
    </Card>
  );
};

DailyForecastCard.propTypes = {
  mainIcon: PropTypes.element,
  formattedDate: PropTypes.string.isRequired,
  iconCode: PropTypes.number,
  altText: PropTypes.string,
  pp: PropTypes.string,
  temperatureMin: PropTypes.string,
  temperatureMax: PropTypes.string,
};
