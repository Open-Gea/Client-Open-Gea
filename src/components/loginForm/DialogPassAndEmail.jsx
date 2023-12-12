import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { IconButtonAnimate } from '../animate/IconButtonAnimate';
import { FormProvider, RHFTextField } from '../hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { hasError, recoveryPassword, resendEmailVerification } from '../../redux/slices/auth';
import { getUserByEmail } from '../../redux/slices/invitesCooperativa';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import Iconify from '../utils/Iconify';

export function DialogPassAndEmal({open, onClose, type}){

    const {t} = useTranslation('register-login')

    const [isCooperative, setIsCooperative] = useState(false);

    const dispatch = useDispatch();
    const theme = useTheme();
    const FormSchema = Yup.object().shape({
        email : Yup.string().email(t('validations.validEmail')).required(t('validations.emailRequired')),
    })

    const defaultValues = {email: ''};
    const methods = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues,
      });

    const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    } = methods;

    const actionDispatch = type === 'PASSWORD_FORGOT' ? recoveryPassword : resendEmailVerification

    const onSubmit = data => {

        dispatch(getUserByEmail({ email: data.email, isCoop: isCooperative})).then(r => {
            if(r.error){
                dispatch(hasError(r.error));
                console.log(r.error);
            }else{
                console.log(r.payload);
                if(r.payload === ""){
                    setError('afterSubmit', {
                      message: t('dialogMessage.emailNotFound'),
                    });
                  }
                else if(r.payload.status === 'INACTIVE' && type=== 'PASSWORD_FORGOT'){
                    setError('afterSubmit', {
                        message: t('dialogMessage.verifyEmailFirst'),
                      });
                }
                else{ 
                dispatch(actionDispatch({ email: data.email, isCoop: isCooperative }))
                reset();
                onClose();
                }
            }
        })
      };

    return (
        <>
            <Dialog
            open={Boolean(open)}
            maxWidth='md'
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{justifyContent : 'space-between', display: 'flex', alignItems: 'center'}}>
                    {type === 'PASSWORD_FORGOT' ? t('title.forgotPass') : t('title.emailVerif')}
                    <IconButtonAnimate onClick={onClose}>
                        <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
                    </IconButtonAnimate>
                </DialogTitle>
                <Divider />
                <DialogContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
                    <FormControlLabel
                    control={<Checkbox checked={isCooperative} onChange={e => setIsCooperative(e.target.checked)} color="success" />}
                    label={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {t('iAmOrga')}
                        </Typography>
                    }
                    />
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogContentText id="alert-dialog-slide-description">
                            {type === 'PASSWORD_FORGOT' ? t('dialogMessage.forgotPass') : t('dialogMessage.emailVerif')}
                        </DialogContentText>
                    </Grid>
                    <Grid item xs={12}>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1.5}>
                            {!!errors.afterSubmit && <Grid item xs={12}> <Alert severity="error">{errors.afterSubmit.message}</Alert></Grid>}
                                <Grid item xs={12}>
                                    <RHFTextField name='email' label={t('labels.email')}/>
                                </Grid>
                            </Grid>
                        </FormProvider>
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton variant='contained' loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
                        <SendIcon /> &nbsp;  {t('send') }
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}