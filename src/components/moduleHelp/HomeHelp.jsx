import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export const HomeHelp = () => {

  const { t } = useTranslation('navigation');

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mt={1}>
        {t('moduleHelp.aboutTitle')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('moduleHelp.aboutParagraphs.0')}
      </Typography>
    </>
  );
};
