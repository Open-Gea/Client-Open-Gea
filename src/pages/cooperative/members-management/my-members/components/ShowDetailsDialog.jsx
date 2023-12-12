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


export default function ShowDetailsDialog({ user, closeMoreMenu }) {

  const { i18n, t } = useTranslation('members-management');
  const { t: tCommon } = useTranslation('common');

  const data = [
    { title: t('fields.name'), info: user.displayName +' '+ user.lastName },
    { title: t('fields.country'),info: user.country},
    {title:t('fields.email'), info:user.email},
    {title: t('fields.phone'), info:user.phone},
    {title:t('fields.userName'), info:user.username},
    {title:t('fields.enteredTheSystem'),info: user.acceptedTermsConditions ? t('fields.termsPostive')  : t('fields.termsNegative')}

  ];

  const [openDetails, setOpenDetails] = useState(false);

  const fullScreen = useResponsive('down', 'sm');

  const handleClickOpen = () => {
    setOpenDetails(true);
  };

  const handleClose = () => {
    closeMoreMenu();
    setOpenDetails(false);
  };

  return (
    <div>
      <p   onClick={handleClickOpen}  > {t('buttons.viewDetails')} </p>
      <Dialog maxWidth="md" fullScreen={false} open={openDetails} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6"> {t('title3')} </Typography>
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
  user: PropTypes.object,
  closeMoreMenu: PropTypes.function
};
