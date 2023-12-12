import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// MUI
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
// Components
import Iconify from '../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../components/animate/IconButtonAnimate';
import { useTranslation } from 'react-i18next'; 
// Adding the registration from 
import { RegisterUserForm } from '../../../../../components/register-form/RegisterUserForm';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMemberDialog({ onClose, open, title, edit, farmInfo }) {

  const { t } = useTranslation('members-management');
  const theme = useTheme();

  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {title}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <RegisterUserForm onClose={onClose} />
            </Grid>
          </Grid>
          <br/>
          <Typography sx={{ color: 'text.secondary' }}> {t('messages.allRequired')} </Typography>
          
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddMemberDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  farmInfo: PropTypes.object,
};
