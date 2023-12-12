import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@mui/material';

export const IrrigationHelp = () => {

  const { t } = useTranslation('irrigation');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mt={1}>
        {t('moduleHelp.aboutTitle')}
      </Typography>
      <Typography paragraph>
        {t('moduleHelp.aboutParagraphs.0')}
      </Typography>

      <Box my={2}>
        <li>{t('moduleHelp.list1.0')}</li>
        <li>{t('moduleHelp.list1.1')}</li>
      </Box>

      <Typography paragraph>
        {t('moduleHelp.aboutParagraphs.1')}
      </Typography>

      <Box my={2}>
        <li>{t('moduleHelp.list2.0')}</li>
        <li>{t('moduleHelp.list2.1')}</li>
        <li>{t('moduleHelp.list2.2')}</li>
        <li>{t('moduleHelp.list2.3')}</li>
      </Box>

      <Typography variant="subtitle1" gutterBottom mt={5}>
        {t('moduleHelp.readMoreTitle')}
      </Typography>

      <Typography paragraph>
        {t('moduleHelp.readMoreParagraphs.0')}
      </Typography>
    </>
  );
};
