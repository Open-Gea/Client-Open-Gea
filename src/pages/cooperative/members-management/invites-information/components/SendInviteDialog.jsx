import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect } from 'react';
// MUI
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@emotion/react';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFTextField } from '../../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { getUserByEmail, addInvite } from '../../../../../redux/slices/invitesCooperativa';
import { hasError } from '../../../../../redux/slices/auth';
import { useTranslation } from 'react-i18next'; 

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendInviteDialog({ onClose, open, title, edit, farmInfo }) {

  const { t } = useTranslation('invites');
  const theme = useTheme();

  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    userEmail: Yup.string().email(t('validations.validEmail')).required(t('validations.requiredEmail')),
    bodyMessage: Yup.string().required(t('validations.requiredMessage')),
  });

  const { cooperative } = useSelector(state => state.authSlice);
  const defaultValues = { userEmail: '', bodyMessage: t('inputs.defaultMessage')+cooperative.name+' '+t('inputs.defaultMessage2') };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitAdd = async data => {
    // Getting the user email to verify if the user is in our system
    const userEmail = data.userEmail;
    const bodyMessage = data.bodyMessage;

    // Bringing the information of the user
    try {

      dispatch(getUserByEmail({ email: userEmail })).then(e => {
        if (e.error) {
          // Error with the process
          dispatch(hasError(e.error));
          console.log(e.error);
        } else {
          // No errors, but required to check the user
          if(e.payload === ""){
            setError('userEmail', {
              message: t('validations.emailNotFound'),
            });
          }else{
            const dataToPost = {
              messageBody: bodyMessage,
              user: e.payload.id,
              coop: cooperative.id,
              origin:'cooperative',
            };
            dispatch(addInvite(dataToPost));
            reset();
            onClose();
          }
        }
      });

    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
      reset();
      onClose();
    }
  };

  const onSubmit = onSubmitAdd;
  
  useEffect(() => {

  }, [edit]);

  return (
    <div>
      <Dialog
        maxWidth="md"
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
            <Grid item xs={12} md={10}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <RHFTextField name="userEmail" label={t('inputs.userEmail')} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField 
                      name="bodyMessage" 
                      multiline
                      label={t('inputs.bodyMessage')}
                      type="text"
                      inputProps={{ maxLength: 500 }} 
                    />
                  </Grid>
                </Grid>
                {!!errors.noLatLng && <Alert severity="error">{errors.noLatLng.message}</Alert>}
              </FormProvider>
              <br />
              <DialogContentText id="alert-dialog-slide-description">
                {t('inputs.formPlaceHolderMessage')}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SendIcon /> &nbsp; {edit ? t('inputs.saveEditFarm') : t('inputs.send')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SendInviteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  farmInfo: PropTypes.object,
};
