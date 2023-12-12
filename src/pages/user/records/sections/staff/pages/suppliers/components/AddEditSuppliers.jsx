import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import Iconify from '../../../../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { addSuppliers, editSuppliers } from '../../../../../../../../redux/slices/actions/suppliersActions';
import { useTranslation } from 'react-i18next';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AddEditSuppliers({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {t} = useTranslation('records');

  const stateOption = [
    { id: 'ACTIVE', label: t('forms.active') },
    { id: 'INACTIVE', label: t('forms.inactive') },
    
  ];

  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(state => state.recordsSlice);

  const today = new Date();

  const FormSchema = Yup.object().shape({
    name: Yup.string()
    .required(t('forms.errorRequired')),
    phone: Yup.number().required(t('forms.errorRequired')),
    email: Yup.string().required(t('forms.errorRequired')),
    service: Yup.string().required(t('forms.errorRequired')),
    state: Yup.string().required(t('forms.errorRequired')),
  });

  const defaultValues = edit ? { ...editInfo } : { name: '', phone: '', email: '', service: '', state: '' };
  const methods = useForm({
      resolver: yupResolver(FormSchema),
      defaultValues,
    });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addSuppliers(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id
    };
    dispatch(editSuppliers({ data: dataToPost, supplierId: editInfo.id }));
    reset();
    onClose();
  };


  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {edit ? t('titles.editSupplier') : t('titles.addSupplier')}
          <IconButtonAnimate
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="name" label={t('forms.name')} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="phone" label={t('forms.phone')} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="service" label={t('forms.service')} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="state" label={t('forms.state')}>
                    <option></option>
                    {stateOption.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="email" label={t('forms.email')}  />
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? t('buttons.saveChanges') : t('buttons.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditSuppliers.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};

