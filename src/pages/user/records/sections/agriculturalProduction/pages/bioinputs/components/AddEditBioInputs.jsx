import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemText, Slide, Typography} from '@mui/material';
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
import { addBioInputs, editBioInputs } from '../../../../../../../../redux/slices/actions/bioInputsActions';
import { useTranslation } from 'react-i18next';
import { AddMaterials } from './AddMaterials';
import { AddFlips } from './AddFlips';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const volumeUnitsOptions = [
    { value: 'LTS', label: 'Lts' },
    { value: 'M3', label: 'Mts3' },
    { value: 'D3', label: 'Dmts3' },
    { value: 'CM3', label: 'Cmts3' },
  ];

const weightUnitsOptions = [
  { value: 'KG', label: 'Kgs' },
  { value: 'TON', label: 'Tons' },
  { value: 'GR', label: 'Grs' },
];

  export default function AddEditBioInputs({ onClose, open, edit=false, editInfo }) {

    
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const { t, i18n } = useTranslation('records');
  
  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);

  const [openMatDialog, setOpenMatDialog] = useState(false);
  const [openFlipsDialog, setOpenFlipsDialog] = useState(false);

  const typeOptions = [
    { value: 'FERTILIZER', label: t('forms.fertilizer') },
    { value: 'PHYTOSANITARY', label: t('forms.phytosanitary') },
  ];

  const unitCostOption = [
    { id: '$AR', label: '$AR' },
    { id: 'U$D', label: 'U$D' },
  ];

  const liquidSolidOptions = [{label: t('recordsCommon.liquid'), value: "LIQUID"}, {label: t('recordsCommon.solid'), value: "SOLID"}]

  const today = new Date();

  const FormSchema = Yup.object().shape({
    name: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),
    liquidSolid: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),
    type: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),
    elaborationDate: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
    expirationDate: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .min(today, t('forms.minToday')),
    quantityProduced: Yup.number()
      .typeError(t('forms.errorNumber'))
      .required(t('forms.errorRequired')),
    unitProduced: Yup.string().required(t('forms.errorRequired')),
    productionCost: Yup.number()
      .typeError(t('forms.errorNumber'))
      .required(t('forms.errorRequired')),
    unitCost: Yup.string().required(t('forms.errorRequired')),
    materialAndQuantity: Yup.array(),

    // process register
    responsibleName: Yup.string(t('forms.errorRequired')).required(t('forms.errorRequired')),

    startDateOfProduction: Yup.date()
      .max(today, t('forms.maxToday')),
      
    endDateOfProduction: Yup.date()
      .max(today, t('forms.maxToday')),

    flipsDatesAndTemp: Yup.array(),
    notes: Yup.string(),
    
  });

  const defaultValues = edit
  ? {
      ...editInfo,
      startDateOfProduction: editInfo.processRegister?.startDateOfProduction || undefined,
      endDateOfProduction: editInfo.processRegister?.endDateOfProduction || undefined,
      flipsDatesAndTemp: editInfo.processRegister?.flipsDatesAndTemp || [],
      notes: editInfo.processRegister?.notes || '',
    }
  : {
      liquidSolid: '',
      elaborationDate: '',
      expirationDate: '',
      name: '',
      type: '',
      quantityProduced: '',
      unitProduced:'',
      materialAndQuantity: [],
      flipsDatesAndTemp: [],
      productionCost: '',
      unitCost:'',
      responsibleName: '',
      startDateOfProduction: undefined,
      endDateOfProduction: undefined,
    };
  
  const methods = useForm({
      resolver: yupResolver(FormSchema),
      defaultValues,
    });
 
    const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
    getValues,
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      ...data,
      processRegister: {
        startDateOfProduction : data.startDateOfProduction || '',
        endDateOfProduction: data.endDateOfProduction || '',
        flipsDatesAndTemp : data.flipsDatesAndTemp || '',
        notes: data.notes || ''
      },
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addBioInputs(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      processRegister: {
        startDateOfProduction : data.startDateOfProduction || '',
        endDateOfProduction: data.endDateOfProduction || '',
        flipsDatesAndTemp : data.flipsDatesAndTemp || '',
        notes: data.notes || ''
      },
      userId: user.id,
      farmId: currentFarm.id
    };

    delete dataToPost['notes'];
    delete dataToPost['startDateOfProduction'];
    delete dataToPost['endDateOfProduction'];
    delete dataToPost['flipsDatesAndTemp'];

    dispatch(editBioInputs({ data: dataToPost, bioInputsId: editInfo.id }));
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
          {edit ? t('titles.editBioinput') : t('titles.addBioinput')}
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
                    <RHFTextField variant="filled" name="name" label={t('forms.name')} />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <RHFSelect variant="filled" name="liquidSolid" label={t('selectOptions.liquidSolid')}>
                    <option></option>
                    {liquidSolidOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                    </RHFSelect>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <RHFSelect variant="filled" name="type" label={t('recordsCommon.type')}>
                    <option></option>
                    {typeOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Controller
                    control={control}
                    name="elaborationDate"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.elaborationDate')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.elaborationDate}
                        />
                    )}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Controller
                    control={control}
                    name="expirationDate"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.expiration')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.expirationDate}
                        />
                    )}
                    />
                </Grid>

                <Grid item xs={12} sm={2.5}>
                    <RHFTextField
                    variant="filled"
                    name="quantityProduced"
                    label={t('forms.quantityProd')}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <RHFSelect variant="filled" name="unitProduced" label={t('forms.unit')}>
                    <option></option>
                    {watch('liquidSolid') !== 'SOLID' ? volumeUnitsOptions.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    )):
                    weightUnitsOptions.map(el => (
                      <option key={el.value} value={el.value}>
                      {el.label}
                      </option>
                  ))}
                    </RHFSelect>
                </Grid>

                <Grid item xs={12} sm={2.5}>
                    <RHFTextField
                    variant="filled"
                    name="productionCost"
                    label={t('forms.prodCost')}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <RHFSelect variant="filled" name="unitCost" label={t('forms.unit')}>
                    <option></option>
                    {unitCostOption.map(el => (
                        <option key={el.value} value={el.value}>
                        {el.label}
                        </option>
                    ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                    {getValues('materialAndQuantity') && getValues('materialAndQuantity').length > 0 && (
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">{t('forms.materials')}</Typography>

                        <List>
                        {getValues('materialAndQuantity').map((material, index) => (
                            <ListItem key={index}>
                            <ListItemText primary={`${material.material}: ${material.qty} ${material.unit}`} />
                            </ListItem>
                        ))}
                        </List>
                    </Grid>
                    )}
                    <Grid item xs={12} sm={6} >
                        <AddMaterials
                            materials={watch().materialAndQuantity}
                            open={openMatDialog}
                            setOpen={setOpenMatDialog}
                            setValue={setValue}
                            watch={watch}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {!watch().materialAndQuantity.length && (
                        <Alert sx={{ mt: 1 }} severity="warning">
                            {t('helpers.noMat')}
                        </Alert>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography>{t('titles.processRecord')}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <RHFTextField variant="filled" name="responsibleName" label={t('forms.person')}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                    control={control}
                    name="startDateOfProduction"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.startProd')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.startDateOfProduction}
                        />
                    )}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Controller
                    control={control}
                    name="endDateOfProduction"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.endProd')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.endDateOfProduction}
                        />
                    )}
                    />
                </Grid>
                {watch('liquidSolid') === 'SOLID' && (
                    <>
                    <Grid item xs={12} sm={6} container justify="center">
                    {getValues('flipsDatesAndTemp') && getValues('flipsDatesAndTemp').length > 0 && (
                        <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">{t('forms.flip')}s:</Typography>
                        <List>
                            {getValues('flipsDatesAndTemp').map((flip, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={
                                `${new Date(flip.date).toLocaleDateString(i18n.language, { year: 'numeric', month: '2-digit', day: 'numeric' })}`
                                + `${flip.temp ? ` - ${flip.temp}°C` : ''}`} />
                            </ListItem>
                            ))}
                        </List>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={6} >
                        <AddFlips
                        flips={watch().flipsDatesAndTemp}
                        open={openFlipsDialog}
                        setOpen={setOpenFlipsDialog}
                        setValue={setValue}
                        watch={watch}
                        />
                    </Grid>

                    </Grid>
                    </> 
                )}
                <Grid item xs={12} sm={6}>
                    <RHFTextField multiline variant="filled" name="notes" label={t('forms.notes')} rows={4} />
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
AddEditBioInputs.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};

