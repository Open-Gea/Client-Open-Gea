import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../../../../components/utils/Iconify';
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { addRevenuesExpenses, editRevenuesExpenses } from '../../../../../../../../redux/slices/actions/revenuesExpensesActions';

import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const coinOptions = [
  { id: 'USD', label: 'u$d' },
  { id: 'ARS', label: '$Ar' },
];



export default function AddEditRevenuesExpenses({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const {t} = useTranslation('records')



  const typeOptions = [
    { id: 'rev', label: t('selectOptions.rev') },
    { id: 'exp', label: t('selectOptions.exp')  },
  ];

  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);

  const today = new Date();
  const FormSchema = Yup.object().shape({
    date: Yup.date()
    .required(t('forms.errorRequired'))
    .max(today,t('forms.maxToday')),
    amount: Yup.number().required(t('forms.errorNumber')).typeError(t('forms.errorNumber')),
    coin: Yup.string().required(t('forms.errorRequired')),
    detail: Yup.string().required(t('forms.errorRequired')),
    category: Yup.string().required(t('forms.errorRequired')),
    type:  Yup.string().required(t('forms.errorRequired')),
  });
  const defaultValues = edit ? { ...editInfo } : { date: today, amount: '', coin: '', detail: '', category: '' };
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
      farmId: currentFarm.id,
      userId: user.id,
      createdAt: today
    };
    dispatch(addRevenuesExpenses(dataToPost));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      farmId: currentFarm.id,
      userId: user.id,
    };

    dispatch(editRevenuesExpenses({ data: dataToPost, revenuesExpensesId: editInfo.id }));
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
          {edit ? t('titles.editRev') : t('titles.addRev')}
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
              <Grid item xs={12} sm={3}>
                  <Controller
                  control={control}
                  name="date"
                  render={({ field, formState }) => (
                      <DatePickerMUI
                      label={t('forms.date')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.purchaseDate}
                      />
                  )}
                  />
              </Grid>
              <Grid item xs={6} sm={3}>
                <RHFSelect variant="filled" name="type" label={t('revenuesExpensesRecordsInputs.type')}>
                    <option></option>
                    {typeOptions.map(el => (
                        <option key={el.id} value={el.label}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={5}>
                <RHFTextField variant="filled" name="category" label={t('forms.category')} />
              </Grid>
              <Grid item xs={6} sm={1.2}>
                <RHFSelect variant="filled" name="coin" label={t('forms.coin')}>
                    <option></option>
                    {coinOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={6} sm={2}>
                <RHFTextField variant="filled" name="amount" label={t('forms.amount')} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <RHFTextField variant="filled" name="detail" label={t('recordsCommon.details')}/>
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
AddEditRevenuesExpenses.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};
