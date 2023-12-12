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
import CancelIcon from '@mui/icons-material/Cancel';

import { useState } from 'react';
import useResponsive from '../../../../../hooks/useResponsive';


export default function ShowDetailsDialog({ details, fecha, factor }) {

  const { i18n, t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');

  const data = [
    {
      title: t('calcTable.dateLabel'),
      info: new Date(fecha).toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
    { title: t('calcTable.productLabel'), info: factor.name },
    { title: t('calcTable.resultLabel'), info: details.result+' Kg CO2eq'  },
    { title: t('calcTable.categoryLabel'), info: factor.category },
    { title: t('calcTable.yearLabel'), info: details.year },
    { title: t('calcTable.consumptionLabel'), info: details.consumption+ ' ' + factor.unit  },
  


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
      <Dialog maxWidth="md" fullScreen={false} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{t('dialogs.calcSummaryTitle')}</Typography>
        <IconButton onClick={handleClose}>
          <CancelIcon color="error" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {data.map((detail) => (
            <Grid item xs={12} sm={4} key={detail.title}>
              <Stack sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1">{detail.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {detail.info}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
    </div>
  );
}
ShowDetailsDialog.propTypes = {
  details: PropTypes.object,
  fecha: PropTypes.any,
  factorName: PropTypes.string,
};
