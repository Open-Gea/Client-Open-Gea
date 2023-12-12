import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export const SeasonalForecastHelp = () => {

  const { t } = useTranslation('seasonal-forecast');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mt={1}>
        {t('moduleHelp.aboutTitle')}
      </Typography>
      <Typography paragraph>
        {t('moduleHelp.aboutParagraphs.0')}
      </Typography>

      <Typography variant="subtitle1" gutterBottom mt={5}>
        {t('moduleHelp.readMoreTitle')}
      </Typography>

      <Typography paragraph>
        {t('moduleHelp.readMoreParagraphs.0')}
      </Typography>
    </>
  );
};
