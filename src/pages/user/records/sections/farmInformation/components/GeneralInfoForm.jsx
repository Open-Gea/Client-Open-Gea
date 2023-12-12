import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import { TextField, Button, Grid, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { GeneralInfo } from './GeneralInfo';
import { yupResolver } from '@hookform/resolvers/yup';
// Translation module
import { useTranslation } from 'react-i18next';
// components
import { PDFGenerator } from '../../../components/PDFGenerator';

import { FormProvider, RHFMultiCheckbox, RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
import AddFarmMap from '../../../../farms/components/AddFarmMap';
import DatePickerMUI from '../../../../evapotranspiration/components/DatePickerMUI';
import EVTErrorComponent from '../../../../carbon-footprint/components/EVTErrorComponent';
// actions
import { addGeneralInfo, editGeneralInfo } from '../../../../../../redux/slices/actions/generalInfoActions';
import { setGeneralInfoEdit } from '../../../../../../redux/slices/records';
import { getFarmsRecords } from '../../../utils/getFarmsRecords';
import AddEditFarmDialog from './../../../../farms/components/AddEditFarmDialog';
// utils

// Countries
import { getCountriesList } from '../../../../../../utils/getCountries';

export const GeneralInfoForm = ({ handleCloseModal }) => {
  const { t } = useTranslation('records');
  const dispatch = useDispatch();
  const { currentFarm, error } = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);
  const [download, setDownload] = useState(false);
  const [position, setPosition] = useState({ lat: currentFarm.lat, lng: currentFarm.lng });
  const [currentPosition, setCurrentPosition] = useState({});
  
  // Required for loading countries list
  const [countries, setCountries] = useState(null);
  
  useEffect(() => {

    // Load countries from datatbase
    const fetchCountries = async () => {
      try {
        const response = await getCountriesList(); 
        return response;
      } catch (error) {
        console.error(t('validations.errorData'), error);
      }
    };
    // Setting the countries fetched
    fetchCountries()
    .then((resolvedCountries) => {
      setCountries(resolvedCountries);
    })
    .catch((error) => {
      // Handle any errors here.
      console.error('Error fetching countries:', error);
    });

  }, []);

  const defaultValues = {
    farmName: currentFarm?.generalInfo?.name ? currentFarm.generalInfo.name : '',
    ownerName: currentFarm?.generalInfo?.owner ? currentFarm?.generalInfo?.owner : '',
    farmSize: currentFarm?.generalInfo?.totalSurface ? currentFarm?.generalInfo?.totalSurface : '',
    ownershipDate: currentFarm?.generalInfo?.start ? new Date(parseInt(currentFarm.generalInfo.start)) : '',
    country: currentFarm?.generalInfo?.location ? currentFarm.generalInfo.location : '',
    perimeterFence: currentFarm?.generalInfo?.perimeter ? currentFarm?.generalInfo?.perimeter : '',
    infrastructures: currentFarm?.generalInfo?.infrastructure ? currentFarm?.generalInfo?.infrastructure : '',
    waterSources: currentFarm?.generalInfo?.hidricRes ? currentFarm?.generalInfo?.hidricRes : [],
  };

  const [openDialog, setOpenDialog] = useState(false);


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    return (
      <>
        <PDFGenerator download={download} setDownload={setDownload} fileName={t('fileName')} title={t('farmsRegisterInputs.title')}>
          <GeneralInfo />
        </PDFGenerator>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <Button variant="outlined" color="primary" onClick={handleCloseModal}>
            {t('farmsRegisterInputs.goBack')}
          </Button>
          <Button variant="contained" color="primary" onClick={e => setOpenDialog(true)}>
            {t('farmsRegisterInputs.edit')}
          </Button>
        </Grid>
        <AddEditFarmDialog open={openDialog} onClose={handleCloseDialog} title={t('menuPopover.title')} edit={true} farmInfo={currentFarm} />
      </>
    );
  
};

GeneralInfoForm.propTypes = {
  handleCloseModal: PropTypes.func,
  handleOpenModal: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number,
};
