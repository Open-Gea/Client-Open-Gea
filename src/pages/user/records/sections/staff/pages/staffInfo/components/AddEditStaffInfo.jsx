import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography,
   IconButton, List, ListItem, ImageList, ListItemText, ImageListItem, ImageListItemBar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFRadioGroup, RHFTextField } from '../../../../../../../../components/hook-form';
import { addStaffInfo, editStaffInfo } from '../../../../../../../../redux/slices/actions/staffInfoActions';

import {useTranslation} from 'react-i18next'
import RecordsFileLayout from '../../../../../components/RecordsFileLayout';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditStaffInfo({ onClose, open, edit, editInfo }) {

  const {t} = useTranslation('records');

  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(state => state.recordsSlice);

  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required(t('forms.errorRequired')),
    lastName: Yup.string().required(t('forms.errorRequired')),
    area: Yup.string().required(t('forms.errorRequired')),
    contractType: Yup.string().required(t('forms.errorRequired')),
    urls: Yup.array(),
    files: Yup.array()
  });
  const defaultValues = edit ? { ...editInfo, files: [], urls: editInfo.urls && editInfo.urls[0] !== "" ? editInfo.urls : [] } 
  : { firstName: '', lastName: '', area: '', contractType: '', urls:[], files: [] };
  
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
  } = methods;

  const onSubmitAdd = async data => {
    if(!data.files.length) delete data['files'];
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: new Date()
    };
    dispatch(addStaffInfo(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    if(!data.files.length) delete data['files'];
    if(!data.urls.length) data.urls = JSON.stringify([]);
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id
    };
    dispatch(editStaffInfo({ data: dataToPost, staffId: editInfo.id }));
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
          {edit ? t('titles.editStaff') : t('titles.addStaff')}
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
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="firstName" label={t('forms.name')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="lastName" label={t('forms.lastName')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="area" label={t('forms.area')} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>{t('forms.contractType')}</Typography>
                <RHFRadioGroup name="contractType" getOptionLabel={[t('forms.temporal'), t('forms.permanent')]} options={['PERMANENT', 'TEMPORAL']} />
              </Grid>
              <RecordsFileLayout edit={edit} editInfo={editInfo} t={t} setValue={setValue} />
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
AddEditStaffInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};

