import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import SvgColor from '../../../../../components/svg-color/SvgColor';

const EVTErrorComponent = ({ errMsg, onReload }) => {
  const { t } = useTranslation('carbon-footprint');

  return (
    <Card sx={{ my: 2, py: 2, boxShadow: 20 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SvgColor src={`/assets/sadcomputer.svg`} sx={{ width: 200, height: 200 }} />
      </Box>
      <CardContent>
        <Typography variant="h6">{errMsg}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => onReload()}>
          {t('inputs.calcError')}
        </Button>
      </CardActions>
    </Card>
  );
};

EVTErrorComponent.propTypes = {
  errMsg: PropTypes.string,
  onReload: PropTypes.func,
};

export default EVTErrorComponent;
