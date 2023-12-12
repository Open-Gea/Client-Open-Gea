import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

export default function NoDataAlert() {

  const { t } = useTranslation('agronomic-data');

  return (
    <Box
      sx={{
        width: '100%',
        background: '#f44336',
        mt:'3%',
        textAlign:'center',
        p:'15px',
        color:'white',
        borderRadius:'10px'
      }}
    >
        {t('noDataAlert')}
    </Box>
  );
}