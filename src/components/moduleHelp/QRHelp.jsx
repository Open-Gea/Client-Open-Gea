import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export const QRHelp = () => {
  
  const { t } = useTranslation('qr'); 

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
