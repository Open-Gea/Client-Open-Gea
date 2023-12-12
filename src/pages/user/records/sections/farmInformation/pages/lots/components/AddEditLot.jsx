import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef } from 'react';
// MUI
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { addLot, editLot } from '../../../../../../../../redux/slices/actions/lotsActions';
// Components
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFTextField } from '../../../../../../../../components/hook-form';
import Iconify from '../../../../../../../../components/utils/Iconify';
import MapViewSimple from './MapSimpleView';
import { useState } from 'react';
import AddFarmMap from '../../../../../../farms/components/AddFarmMap';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditLots({ onClose, open, title, edit, lotInfo, t }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentFarm } = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);

  const [position, setPosition] = useState(edit ? lotInfo.ubication : {lat: currentFarm.lat, lng: currentFarm.lng});
  const [currentPosition, setCurrentPosition] = useState({});

  const FormSchema = Yup.object().shape({
    name: Yup.string().required(t('farmsRegisterMessages.introduceId')),
    surface: Yup.number().required(t('farmsRegisterMessages.introduceSurface')),
    notes: Yup.string(t('farmsRegisterMessages.introduceNotes')),
    characteristics: Yup.string(),
  });

  const defaultValues = edit ? lotInfo : { name: '', surface: '', notes: '', characteristics: '', ubication: {lat: currentFarm.lat, lng: currentFarm.lng } };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitAdd = async data => {
    const ubication = {};
    if (position) {
      ubication.lat = position.lat;
      ubication.lng = position.lng;
    } else {
      ubication.lat = currentPosition.lat;
      ubication.lng = currentPosition.lng;
    }
    const dataToPost = { ...data, farmId: currentFarm.id, ubication: ubication, userId: user.id };
    dispatch(addLot({ data: dataToPost, farmId: currentFarm.id }));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const ubication = {};
    if (position) {
      ubication.lat = position.lat;
      ubication.lng = position.lng;
    } else {
      ubication.lat = currentPosition.lat;
      ubication.lng = currentPosition.lng;
    }
    const dataToPost = { ...data, farmId: currentFarm.id, ubication: ubication, userId: user.id };
    dispatch(editLot({ data: dataToPost, farmId: currentFarm.id, lotId: lotInfo.id }));
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
          {title}
          <Typography>
            <Box component="span" color="darkgray" sx={{ fontStyle: 'italic' }}>
              {t('recordsCommon.farm')}:{' '}
            </Box>{' '}
            {currentFarm.name}
          </Typography>
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <RHFTextField name="name" label={t('farmsRegisterInputs.idLot')} />
                  </Grid>
                  <Grid item xs={6} justifyContent="center">
                    <TextField name="lat" label={t('farmsRegisterInputs.latitude')} value={position.lat} type="string" disabled />
                  </Grid>
                  <Grid item xs={6} justifyContent="center">
                    <TextField name="lng" label={t('farmsRegisterInputs.longitude')} value={position.lng} type="string" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField name="surface" type="number" label={t('farmsRegisterInputs.surfaceM2')} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField multiline name="characteristics" label={t('farmsRegisterInputs.characteristics')} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField multiline name="notes" label={t('farmsRegisterInputs.observableNotes')} />
                  </Grid>
                </Grid>
              </FormProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <AddFarmMap
              position={position}
              setPosition={setPosition}
              openDialog={Boolean(open)}
              setCurrentPosition={setCurrentPosition}
              edit={true}
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? t('farmsRegisterInputs.saveChanges') : t('farmsRegisterInputs.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditLots.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotInfo: PropTypes.object,
  t: PropTypes.func,
};
