import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import CancelIcon from '@mui/icons-material/Cancel';

import { useState } from 'react';
import useResponsive from '../../../../../hooks/useResponsive';

export default function ShowDetailsDialog({ details, fecha, producto }) {

  const { i18n, t } = useTranslation('water-footprint');
  const { t: tCommon } = useTranslation('common');

  const data = [
    {
      title: t('footprintResult.requestDate'),
      info: new Date(fecha).toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
    { title: t('footprintResult.product'), info: producto },
    { title: t('footprintResult.hectares'), info: details.hectareas },
    { title: t('footprintResult.tons'), info: details.toneladas },
    {
      title: t('footprintResult.sowDate'),
      info: new Date(details.fechaSiembra).toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
    {
      title: t('footprintResult.harvestDate'),
      info: new Date(details.fechaCocecha).toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
  ];

  const [open, setOpen] = useState(false);

  const fullScreen = useResponsive('down', 'sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Chip color="info" variant="outlined" onClick={handleClickOpen} label={tCommon('seeMore')} />
      <Dialog maxWidth="md" fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" mb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {t('footprintResult.summaryTitle')}
          <IconButton onClick={handleClose}>
            <CancelIcon color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {data.map(detail => (
              <Grid item xs={12} sm={4} key={detail.title}>
                <Stack sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle1">{detail.title}</Typography>
                  <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                    {detail.info}
                  </Typography>
                </Stack>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'left', sm: 'center' } }}>
              <Stack>
                <>
                  <Typography variant="subtitle1">{t('footprintResult.carbonFootprintLabel')}</Typography>
                  <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                    -----
                  </Typography>
                </>
                <Typography variant="subtitle1">{t('title')}</Typography>
                <Stack direction="row" spacing={4}>
                  <Stack>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                      <b>{t('footprintResult.totalWaterFootprint')}:</b>
                    </Typography>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                      <b>{t('footprintResult.greenWaterFootprint')}:</b>
                    </Typography>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                      <b>{t('footprintResult.blueWaterFootprint')}:</b>
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                    {details.evotranspiracion.hh_total} m3/ton
                    </Typography>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                    {details.evotranspiracion.hh_green} m3/ton
                    </Typography>
                    <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                    {details.evotranspiracion.hh_blue} m3/ton
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ justifyContent: 'center', display: 'flex' }}>
              <Card sx={{ width: { xs: 250, sm: 290 }, boxShadow: 15, px: { xs: 0, sm: 3 } }}>
                <CardHeader sx={{ m: 0, pt: 0 }} title={t('footprintResult.qrCodeLabel')} />
                <CardMedia sx={{ borderRadius: 2 }} component="img" image="/assets/qr-mock.png" height="250" alt="QR" />
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button color="info">
                    <LocalPrintshopIcon sx={{ mr: 1 }} />
                      {tCommon('print')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
ShowDetailsDialog.propTypes = {
  details: PropTypes.object,
  fecha: PropTypes.any,
  producto: PropTypes.string,
};
