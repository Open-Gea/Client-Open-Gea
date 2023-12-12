import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export const WeatherForecastHelp = () => {
  const { t } = useTranslation('weather-forecast');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mt={1}>
        {t('moduleHelp.aboutTitle')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('moduleHelp.aboutParagraphs.0')}
      </Typography>

      <Typography variant="subtitle1" gutterBottom mt={5}>
        {t('moduleHelp.readMoreTitle')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('moduleHelp.readMoreParagraphs.0')}
      </Typography>
    </>
  );
};
