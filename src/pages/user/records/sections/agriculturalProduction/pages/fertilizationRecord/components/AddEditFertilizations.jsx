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
import { addFertilizations, editFertilizations } from '../../../../../../../../redux/slices/actions/fertilizationActions';
import { useTranslation } from 'react-i18next';
import DateTimePickerMUI from '../../../../../../../../components/utils/DateTimePickerMUI';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const volumeUnitsOptions = [
    { id: 'LTS', label: 'Lts' },
    { id: 'M3', label: 'Mts3' },
    { id: 'D3', label: 'Dmts3' },
    { id: 'CM3', label: 'Cmts3' },
  ];

const weightUnitsOptions = [
  { id: 'KG', label: 'Kgs' },
  { id: 'TON', label: 'Tons' },
  { id: 'GR', label: 'Grs' },
];

  export default function AddEditFertilizations({ onClose, open, edit, editInfo }) {

  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { t, i18n } = useTranslation('records');
  
  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);
  const lots = currentFarm.lots?.map(l => {return {label: l.name, value: l.id}})
  const typeOptions = [{label: t('selectOptions.chemicalSynthesis'), value: "CHEMICAL"}, {label: t('selectOptions.organic'), value: "ORGANIC"}]
  const elaborationTypeOptions = [{label: t('selectOptions.comertial'), value: "COMERTIAL"}, {label: t('selectOptions.own'), value: "OWN"}]
  const organicTypeOptions = [{label: t('recordsCommon.liquid'), value: "LIQUID"}, {label: t('recordsCommon.solid'), value: "SOLID"}]

  const today = new Date();

  const FormSchema = Yup.object().shape({
    type: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),
    lots: Yup.array()
      .min(1)
      .transform(function (o, obj) {
        return o.filter(o => o);
      }),
    dateOfUse: Yup.date()
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorRequired'))
    .max(today, t('forms.maxToday')),
    crop: Yup.string().required(t('forms.errorRequired')),
    dosePlant: Yup.number().typeError(t('forms.errorNumber')).required(t('forms.errorRequired')),
    dosePlantUnit: Yup.string().required(t('forms.errorRequired')),
    doseArea: Yup.number().typeError(t('forms.errorNumber')).required(t('forms.errorRequired')),
    doseAreaUnit: Yup.string().required(t('forms.errorRequired')),
    responsibleName: Yup.string().required(t('forms.errorRequired')),
    machineryUsed: Yup.string().required(t('forms.errorRequired')),
    name: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),
    
    recipe: Yup.mixed().test('isBoolOrString', t('forms.errorRequired'), function (value) {
      const { type } = this.parent; 
      if (type === 'CHEMICAL') {
        return Yup.boolean().isValidSync(value); 
      } else {
        return Yup.string().isValidSync(value); 
      }
    }),
    organicType: Yup.string().when('type', (type, schema) => {
      if (type === 'ORGANIC') {
        return schema.required(t('forms.errorRequired')); 
      }
      return schema; 
    }),
    elaborationType: Yup.string().when('type', (type, schema) => {
      if (type === 'ORGANIC') {
        return schema.required(t('forms.errorRequired')); 
      }
      return schema; 
    }),
    brand: Yup.string()
  });
  const timeOptions = {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}
  const defaultValues = edit ? { ...editInfo, lots: editInfo.lots.map(l => l.id) } : 
  {type: '', lots: [], dateOfUse: '', organicType: '', elaborationType: '', dosePlant: '', dosePlantUnit: '', doseArea: '', doseAreaUnit: '', responsibleName: '', crop: '', name: '', brand: '', recipe: false, machineryUsed: ''}
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
    const cleanData = cleanValuesBeforeSubmit(data);
    const dataToPost = {
      ...cleanData,
      lots: currentFarm.lots.filter(lot => data.lots.find(l => l === lot.id)),
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addFertilizations(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    const cleanData = cleanValuesBeforeSubmit(data);
    const dataToPost = {
      ...cleanData,
      lots: currentFarm.lots.filter(lot => data.lots.find(l => l === lot.id)),
      userId: user.id,
      farmId: currentFarm.id
    };
    dispatch(editFertilizations({ data: dataToPost, fertilizationsId: editInfo.id }));
    reset();
    onClose();
  };


  const cleanValuesBeforeSubmit = (data) => {
    const cleanData = {...data}
    if(data.type == 'CHEMICAL'){
      cleanData.organicType = '';
      cleanData.elaborationType = '';
    }
    else if(data.type == 'ORGANIC'){
      if(data.elaborationType !== 'COMERTIAL') cleanData.brand = '';
      cleanData.recipe = null;
    } 

    return cleanData;
  }

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
          {edit ? t('titles.editFertilization') : t('titles.addFertilization')}
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
                <RHFSelect variant="filled" name="type" label={t('fertilizationRecordsInputs.type')}>
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
                <RHFSelect variant="filled" name="elaborationType" label={t('fertilizationRecordsInputs.elaborationType')}>
                    <option></option>
                    {elaborationTypeOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              }

              {watch('type') === 'ORGANIC' &&
              <Grid item xs={12} sm={3}>
                <RHFSelect variant="filled" name="organicType" label={t('fertilizationRecordsInputs.organicType')}>
                    <option></option>
                    {organicTypeOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              }

              <Grid item xs={12} sm={4}>
                  <RHFTextField variant="filled" name="name" label={t('fertilizationRecordsInputs.name')} />
              </Grid>
              { (watch('type') === 'CHEMICAL' || watch('elaborationType') == 'COMERTIAL') &&
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="brand" label={t('recordsCommon.brand')} />
              </Grid>
              }
            <Grid item xs={12} sm={3}>
                <Controller
                  control={control}
                  name="dateOfUse"
                  render={({ field, formState }) => (
                    <DateTimePickerMUI
                      label={t('fertilizationRecordsInputs.dateOfUse')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.dateOfUse}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="crop" label={t('fertilizationRecordsInputs.crop')} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="dosePlant" label={t('fertilizationRecordsInputs.dosePlant')} />
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="dosePlantUnit" label={t('phytoRecordsInputs.doseUnit')}>
                    <option></option>
                    {watch('organicType') !== 'SOLID' ? volumeUnitsOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    )):
                    weightUnitsOptions.map(el => (
                      <option key={el.id} value={el.id}>
                      {el.label}
                      </option>
                  ))}
                </RHFSelect>
              </Grid>

              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="doseArea" label={t('fertilizationRecordsInputs.doseArea')} />
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="doseAreaUnit" label={t('phytoRecordsInputs.doseUnit')}>
                <option></option>
                    {watch('organicType') !== 'SOLID' ? volumeUnitsOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}/mts2
                        </option>
                    )):
                    weightUnitsOptions.map(el => (
                      <option key={el.id} value={el.id}>
                      {el.label}/mts2
                      </option>
                  ))}
                </RHFSelect>
              </Grid>
                
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="responsibleName" label={t('fertilizationRecordsInputs.personResponsible')} />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="machineryUsed" label={t('fertilizationRecordsInputs.machineryUsed')} />
              </Grid>

              { watch('type') === 'CHEMICAL' &&
              <Grid item xs={12} sm={3}>
                <RHFCheckbox variant="filled" name="recipe" label={t('fertilizationRecordsInputs.recipe')} />
              </Grid>
              }

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">{t('recordsCommon.lotsInvolved')} </Typography>
                <RHFMultiCheckbox variant="filled" name="lots" options={lots} />
                {!!errors.lots && (
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
AddEditFertilizations.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};

