import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@mui/material';

export const EvotranspirationHelp = () => {
  const { t } = useTranslation('water-footprint');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mt={1}>
        {t('moduleHelp.aboutTitle')}
      </Typography>
      <Typography paragraph>{t('moduleHelp.aboutParagraphs.0')}</Typography>

      <Box my={2}>
        <li>{t('moduleHelp.list1.0')}</li>
        <li>{t('moduleHelp.list1.1')}</li>
        <li>{t('moduleHelp.list1.2')}</li>
      </Box>

      <Typography variant="subtitle1" gutterBottom mt={5}>
        {t('moduleHelp.readMoreTitle')}
      </Typography>

      <Typography paragraph>{t('moduleHelp.aboutParagraphs.1')}</Typography>

      <Box my={2}>
        <li>
          <strong>{t('moduleHelp.list2.0')}</strong>
        </li>
      </Box>
    </>
  );
};
