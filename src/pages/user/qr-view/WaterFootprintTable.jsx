import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function WaterFootprintCards({ water_footprint }) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const {t} = useTranslation('qr-view')
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {water_footprint.map((row) => (
        <Card key={row.id} style={{ margin: '16px', minWidth: '200px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {t('product')}: {row.product.name}
            </Typography>
            <Typography color="textSecondary">
              {t('wfLabels.seedtime')}: {new Date(row.startDate).toLocaleString('es-ES', options)}
            </Typography>
            <Typography color="textSecondary">
            {t('wfLabels.harvest')}: {new Date(row.endDate).toLocaleString('es-ES', options)}
            </Typography>
            <Typography color="textSecondary">{t('wfLabels.tons')}: {row.tons}</Typography>
            <Typography color="textSecondary">{t('wfLabels.ha')}: {row.hectares}</Typography>
            <Typography color="textSecondary">{t('wfLabels.green')}: {row.evotranspiration.hh_green}</Typography>
            <Typography color="textSecondary">{t('wfLabels.blue')}: {row.evotranspiration.hh_blue}</Typography>
            <Typography color="textSecondary">{t('wfLabels.total')}: {row.evotranspiration.hh_total}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
