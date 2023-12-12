import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, InputLabel, Modal, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField, RHFSelect,RHFInputFile } from '../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/auth';
import { useNavigate } from 'react-router';
import { getValidationError } from '../../utils/getValidationError';


// Translation module
import { useTranslation } from 'react-i18next';

// countries
import { getCountriesList } from '../../utils/getCountries';
import { contactUs } from './contactUs';

 
// ----------------------------------------------------------------------

export default function ContactUsForm() {
  const navigate = useNavigate();
    // Added for translations
  const { t } = useTranslation('register-login');

  const [dialogOpen, setDialogOpen] = useState(false);


  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required(t('validations.nameRequired')),
    email: Yup.string().email(t('validations.validEmail')).required(t('validations.emailRequired')),
    country: Yup.string().required(t('validations.countryRequired')),
    message: Yup.string().required(t('validations.message')),
  });

  const defaultValues = {
    name: '',
    email: '',
    country: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
    defaultValues,
  });

  const {
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async data => {
    await contactUs(data);
    reset();
    setDialogOpen(true);
  };

  
  return (
    <>
    
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField name="name" label={t('contactUs.labels.name')} />

          <RHFTextField name="email" label={t('contactUs.labels.email')}  />

          <RHFTextField name="country" label={t('contactUs.labels.country')} />
          
          <RHFTextField name="message" label={t('contactUs.labels.message')} multiline rows={6} variant="outlined" />

          <LoadingButton fullWidth size="large" variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {t('contactUs.send')}
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Dialog open={dialogOpen} onClose={()=> {setDialogOpen(false); navigate('/login');}}>
        <div>
          <DialogTitle>{t('contactUs.hemlet')} - YvY</DialogTitle>
          <DialogContent>
            <p>
              {t('contactUs.afterSubmitMessage')}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setDialogOpen(false); navigate('/');}} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
