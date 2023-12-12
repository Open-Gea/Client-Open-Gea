import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
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
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import { addProdInfo, editProdInfo } from '../../../../../../../../redux/slices/actions/prodInfoActions';
import GenericToolbar from '../../../../../../../../components/utils/GenericToolbar';
import { handleCurrentLots } from '../../../../../../../../redux/slices/records';
import { useTranslation } from 'react-i18next';
import AddEditLots from '../../../../farmInformation/pages/lots/components/AddEditLot';
import { AddAgricultural } from './AddAgricultural';
import {AddLivestock} from './AddLivestock'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditProdInfo({ onClose, open, edit, editInfo}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation('records');

  const { currentFarm} = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);

  const [openAgrDialog, setOpenAgrDialog] = useState(false);
  const [openLivDialog, setOpenLivDialog] = useState(false);

  const lots = currentFarm.lots;

  const today = new Date();

  const FormSchema = Yup.object().shape({
    dateProdInfo: Yup.date()
      .required()
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
      agriculturalHectares: Yup.number()
      .typeError(t('forms.errorNumber')),
      agricultural: Yup.array(),
      livestockHectares: Yup.number()
      .typeError(t('forms.errorNumber')),
      livestock: Yup.array()
  }).test("general", value => {
    const hasAgricultural = value.agricultural && value.agricultural.length > 0;
    const hasLivestock = value.livestock && value.livestock.length > 0;
    const agriculturalHectares = value.agriculturalHectares || 0;
    const livestockHectares = value.livestockHectares || 0;
    
    if ((!hasAgricultural || !agriculturalHectares) && (!hasLivestock || !livestockHectares)) {
      return new Yup.ValidationError(t('forms.errorProdInfo'),null,'agricultural'); 
    }
    
    return true;
  });

  

  const defaultValues = edit
    ? { ...editInfo }
    : { dateProdInfo: '', agricultural: [], livestock: [], agriculturalHectares:'',livestockHectares : ''};
  
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
    control,
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = prepareData(data);
    dataToPost.createdAt = today;
    dispatch(addProdInfo(dataToPost));
    reset();
    onClose();
  };
  
  const onSubmitEdit = async data => {
    const dataToPost = prepareData(data);
    dispatch(editProdInfo({ data: dataToPost, prodInfoId: editInfo.id }));
    reset();
    onClose();
  };

   const prepareData = (data) =>{
    return {
      ...data,
      agriculturalHectares: 0 || +data.agriculturalHectares,
      livestockHectares: 0 || +data.livestockHectares,
      userId: user.id,
      farmId: currentFarm.id
    };

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
          {edit ? t('titles.editProdInfo') : t('titles.addProdInfo')}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={12}>
                <Grid  item xs={3} sm={3}>
                    <Controller
                    control={control}
                    name="dateProdInfo"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.date')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.dateProdInfo}
                        />
                    )}
                    />
                    </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="agriculturalHectares" label={t('forms.agriculturalH')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="livestockHectares" label={t('forms.livestockH')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                {getValues('agricultural') && getValues('agricultural').length > 0 && (
                <Grid>
                    <Typography variant="subtitle1">{t('titles.agricultural')}:</Typography>

                    <List>
                    {getValues('agricultural').map((agr, index) => (
                        <ListItem key={index}>
                        <ListItemText primary={`${agr.crop} - ${agr.driving} - ${agr.hectares}Ha - ${agr.lots.map(l =>l.name).join('/')}`} />
                        </ListItem>
                    ))}
                    </List>
                </Grid>
                )} 
                <AddAgricultural
                    agricultural={watch().agricultural}
                    open={openAgrDialog}
                    setOpen={setOpenAgrDialog}
                    setValue={setValue}
                    watch={watch}
                    lots={lots}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                {getValues('livestock') && getValues('livestock').length > 0 && (
                <Grid>
                    <Typography variant="subtitle1">{t('titles.livestock')}</Typography>
                    <List>
                    {getValues('livestock').map((liv, index) => (
                        <ListItem key={index}>
                        <ListItemText primary={`${liv.species.join('/')} - ${liv.driving} - ${liv.hectares}Ha - ${liv.density} - ${liv.lots.map(l =>l.name).join('/')}`} />
                        </ListItem>
                    ))}
                    </List>
                </Grid>
                )} 
                  <AddLivestock
                      livestock={watch().livestock}
                      open={openLivDialog}
                      setOpen={setOpenLivDialog}
                      setValue={setValue}
                      watch={watch}
                      lots={lots}
                  />
                </Grid>
            </Grid> 
            {errors.agricultural && (
            <Alert sx={{ mt: 1 }} severity="error">
                {errors.agricultural.message}
            </Alert>
            )}
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
AddEditProdInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lots: PropTypes.array,
  editInfo: PropTypes.object,
};
