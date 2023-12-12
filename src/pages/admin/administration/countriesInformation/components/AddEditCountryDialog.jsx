import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Link,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
// react-hook-form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { addCountry, editCountry } from '../../../../../redux/slices/countriesAdmin';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditCountryDialog({ onClose, open, title, edit, countryInfo, countries, officialCountries }) {
  const { t, i18n } = useTranslation('countries');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [errorCountry, setErrorCountry] = useState(false);

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('validations.requiredName')),
    englishName: Yup.string()
    .required(t('validations.requiredName')),
    code: Yup.string()
    .required(t('validations.requiredCode'))
  });

  const defaultValues = edit
    ? countryInfo
    : { name: '', code: ''};

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      name: data.name,
      englishName: data.englishName,
      code: data.code,
    };
    if(countryExist(data)) setErrorCountry(true);
    else{
      
      dispatch(addCountry(dataToPost));
      setErrorCountry(false);
      reset();
      onClose();
    }
    
  };

  const onSubmitEdit = async data => {
    const dataToPost = {
      name: data.name,
      englishName: data.englishName,
      code: data.code,
    };
   
    dispatch(editCountry({ data: dataToPost, id: countryInfo.id }));
    setErrorCountry(false);
    reset();
    onClose();
    
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  const countryExist = data => {
    if(countries.find(c => c.code === data.code)) return true;
    return false;
  } 

  useEffect(() => {
  }, [edit]);

  const handleChangeCountry = e => {
    const {code, name, englishName} = officialCountries.find(c => c.code === e.target.value);
    setValue('code', code);
    setValue('name', name);
    setValue('englishName', englishName);
  }

  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {title}
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
                  {/* <Grid item xs={12}>
                    <RHFTextField name="name" label={t('inputs.name')} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField name="code" label={t('inputs.code')} />
                  </Grid> */}
                <Grid>

                <RHFSelect
                      control={control}
                      label={t('inputs.countries')}
                      name='code'
                      onChange={event => {
                        handleChangeCountry(event)
                      }}
                    >
                      <option value=""></option>
                      {officialCountries?.map(option => (
                        <option key={option.code} value={option.code}>
                          {i18n.language === 'es' ? option.name : option.englishName} {`(${option.code.toUpperCase()})`}
                        </option>
                      ))}
                    </RHFSelect>
                </Grid>
                </Grid>
                {!!errors.noLatLng && <Alert severity="error">{errors.noLatLng.message}</Alert>}
              </FormProvider>
              {errorCountry ? <Alert severity="error">{t('validations.countryExist')}</Alert> : <></>}
              <br />
              {/* <DialogContentText id="alert-dialog-slide-description">{t('inputs.linkInfo')} <Link href='https://flagcdn.com/es/codes.json' target="_blank"> {t('inputs.list')} </Link></DialogContentText> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? t('inputs.saveEditCountry') : t('inputs.saveNewCountry')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddEditCountryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  countryInfo: PropTypes.object,
};
