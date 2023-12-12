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
import { FormProvider, RHFCheckbox, RHFMultiCheckbox, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { addPhyto, editPhyto } from '../../../../../../../../redux/slices/actions/phytoActions';
import { useTranslation } from 'react-i18next';
import DateTimePickerMUI from '../../../../../../../../components/utils/DateTimePickerMUI';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const unitsOptions = [
    { id: 'LTS', label: 'Lts' },
    { id: 'TON', label: 'Ton' },
    { id: 'M3', label: 'Mts3' },
    { id: 'D3', label: 'Dmts3' },
    { id: 'CM3', label: 'Cmts3' },
  ];

  export default function AddEditPhyto({ onClose, open, edit, editInfo }) {

  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { t } = useTranslation('records');
  
  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);
  const lots = currentFarm.lots?.map(l => {return {label: l.name, value: l.id}})
  const typeOptions = [{label: t('selectOptions.chemicalSynthesis'), value: "CHEMICAL"}, {label: t('selectOptions.organic'), value: "ORGANIC"}]
  const elaborationType = [{label: t('selectOptions.comertial'), value: "COMERTIAL"}, {label: t('selectOptions.own'), value: "OWN"}]

  const today = new Date();

  const FormSchema = Yup.object().shape({
    lots: Yup.array().min(1).transform(function (o, obj) {return o.filter(o => o)}),
    type: Yup.string().required(t('forms.errorRequired')),
    elaborationType: Yup.string().when('type', (type, schema) => {
      if (type === 'ORGANIC') {
        return schema.required(t('forms.errorRequired')); 
      }
      return schema; 
    }),
    productName: Yup.string().required(t('forms.errorRequired')),
    brand: Yup.string().required(t('forms.errorRequired')),
    appDate: Yup.date()
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorRequired'))
    .max(today, t('forms.maxToday')),
    phytoClass: Yup.string().when('type', (type, schema) => {
      if (type === 'CHEMICAL') {
        return schema.required(t('forms.errorRequired')); 
      }
      return schema; 
    }),
    activeSubstance: Yup.string().when('type', (type, schema) => {
      if (type === 'CHEMICAL') {
        return schema.required(t('forms.errorRequired')); 
      }
      return schema; 
    }),
    crop: Yup.string().required(t('forms.errorRequired')),
    cropVariety: Yup.string().required(t('forms.errorRequired')),
    pestToCombat: Yup.string().required(t('forms.errorRequired')),
    dose: Yup.number().required(t('forms.errorRequired')).typeError(t('forms.errorNumber')),
    doseUnit: Yup.string().required(t('forms.errorRequired')),
    machineryUsed: Yup.string().required(t('forms.errorRequired')),
    safetyReturnDate: Yup.mixed().test('isDateOrString', t('forms.errorRequired'), function (value) {
      const { type } = this.parent; 
      if (type === 'CHEMICAL') {
        return Yup.date().isValidSync(value); 
      } else {
        return Yup.string().isValidSync(value); 
      }
    }),
    gracePeriod: Yup.string().required(t('forms.errorRequired')),
    responsibleName: Yup.string().required(t('forms.errorRequired')),
    recipe: Yup.bool(t('forms.errorRequired')),
  });

  const defaultValues = edit ? { ...editInfo, 
                                lots: editInfo.lots.map(l => l.id) , 
                                safetyReturnDate: editInfo.safetyReturnDate || '', 
                                phytoClass: editInfo.phytoClass || '', 
                                activeSubstance: editInfo.activeSubstance || '', 
                                elaborationType: editInfo.elaborationType || ''} : 

                        { appDate: today, safetyReturnDate: '', brand: '', lots:[], type: '', productName: '', crop:'', cropVariety: '', pestToCombat:'', dose:'', doseUnit: '',
                        machineryUsed: '', gracePeriod: '', responsibleName: '', recipe: false };
  
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
    setValue
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      ...data,
      lots: currentFarm.lots.filter(lot => data.lots.find(l => l === lot.id)),
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addPhyto(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      lots: currentFarm.lots.filter(lot => data.lots.find(l => l === lot.id)),
      userId: user.id,
      farmId: currentFarm.id
    };
    dispatch(editPhyto({ data: dataToPost, phytoId: editInfo.id }));
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
          {edit ? t('titles.editPhyto') : t('titles.addPhyto')}
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

              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="type" label={t('phytoRecordsInputs.type')}>
                    <option></option>
                    {typeOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              {watch('type') === 'ORGANIC' &&
              <Grid item xs={12} sm={3}>
                <RHFSelect variant="filled" name="elaborationType" label={t('forms.elaborationType')}>
                    <option></option>
                    {elaborationType.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              }

              <Grid item xs={12} sm={4}>
                  <RHFTextField variant="filled" name="productName" label={t('phytoRecordsInputs.productName')} />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="brand" label={t('recordsCommon.brand')} />
              </Grid>
              { watch('type') === 'CHEMICAL' &&
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="activeSubstance" label={t('phytoRecordsInputs.activeSubstance')} />
              </Grid>
              }

              { watch('type') === 'CHEMICAL' &&
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="phytoClass" label={t('phytoRecordsInputs.phytoClass')} />
              </Grid>
              }
              { watch('type') === 'CHEMICAL' &&
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="toxicologicType" label={t('phytoRecordsInputs.toxicologicType')} />
              </Grid>
              }

              <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name="appDate"
                    render={({ field, formState }) => (
                      <DateTimePickerMUI
                        label={t('phytoRecordsInputs.appDate')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.appDate}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="crop" label={t('phytoRecordsInputs.crop')} />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="cropVariety" label={t('phytoRecordsInputs.cropVariety')} />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="pestToCombat" label={t('phytoRecordsInputs.pestToCombat')} />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="dose" label={t('phytoRecordsInputs.dose')} />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <RHFSelect variant="filled" name="doseUnit" label={t('phytoRecordsInputs.doseUnit')}>
                      <option></option>
                      {unitsOptions.map(el => (
                          <option key={el.id} value={el.id}>
                          {el.label}
                          </option>
                      ))}
                  </RHFSelect>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="machineryUsed" label={t('phytoRecordsInputs.machineryUsed')} />
                </Grid>
                { watch('type') === 'CHEMICAL' &&
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name="safetyReturnDate"
                    render={({ field, formState }) => (
                      <DatePickerMUI
                        label={t('phytoRecordsInputs.safetyReturnDate')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.safetyReturnDate}
                      />
                    )}
                  />
                </Grid>
                }
                
                <Grid item xs={12} sm={3}>
                  <RHFTextField variant="filled" name="gracePeriod" label={t('phytoRecordsInputs.gracePeriod')} />
                </Grid>
                

              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="responsibleName" label={t('phytoRecordsInputs.responsibleName')} />
              </Grid>
              { watch('type') === 'CHEMICAL' &&
              <Grid item xs={12} sm={3}>
                <RHFCheckbox variant="filled" name="recipe" label={t('phytoRecordsInputs.recipe')} />
              </Grid>
              }
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">{t('recordsCommon.lotsInvolved')} </Typography>
                <RHFMultiCheckbox variant="filled" name="lots" options={lots} />
                {!!errors.lotsId && (
                  <p style={{ color: 'red', fontSize: '0.8rem' }}>{t('titles.selectLots')}</p>
                )}
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
AddEditPhyto.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};

