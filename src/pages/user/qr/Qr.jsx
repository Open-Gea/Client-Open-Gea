import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import {
  Card, Container, Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Alert,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CropFreeIcon from '@mui/icons-material/CropFree';

// redux
import { useDispatch, useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab';
import { getFarms } from '../farms/utils/getFarms';

// components
import Page from '../../../components/utils/Page';
import QRDialog from './components/QRDialog';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../components/utils/Iconify';

export function Qr() {

  const [loading, setLoading] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState('');
  const { user } = useSelector(s => s.authSlice);
  const [open, setOpen] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({});
  const [carbonFootprint, setCarbonFootprint] = useState([]);
  const [selectedCF, setSelectedCF] = useState([])
  const [environmentalCertificates, setEnvironmentalCertificates] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [waterFootprint, setWaterFootprint] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [responseId, setResponseId] = useState(null);
  const [errors, setErrors] = useState('');
  const [qrs, setQrs] = useState([]);

  const {t, i18n} = useTranslation('qr')

  const dispatch = useDispatch();

  const { farms } = useSelector(state => state.farmSlice);

  const labelTranslation = {
    name: t('labels.name'),
    lastname:t('labels.lastName'),
    email: t('labels.email'),
    phone: t('labels.phone'),
    photos: t('labels.photos'),
    videos: t('labels.videos'),
    country: t('labels.country'),
    description: t('labels.description'),
  };

  const fetchQr = async (farmId) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/setting/qr/user/${user.id}/farm/${farmId}`, {
        headers: {
          'Authorization': document.cookie,
        },
      });

    const data = await response.json();


    setQrs([...data]);


    setPersonalInformation({
      name: false,
      lastname: false,
      email: false,
      phone: false,
      photos: false,
      videos: false,
      country: false,
      description: false,
    });
      
    } catch (error) {

      console.error('Error fetching preferences:', error);

    }
  };
  
  const hhDescription = (ev) => {

      return `${ev.product.name} - ${new Date(ev.startDate).toLocaleDateString(i18n,{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })} - ${new Date(ev.endDate).toLocaleDateString(i18n,{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}`;
    
  }

  const personalDataDescription = (personalData) => {
    let description = '';
    for(const i in personalData){
      if(personalData[i])  description += `${t(`labels.${i}`)} - `     
    }
  description = description.slice(0,description.length-2)

  return description;
  }

  const fetchEvaluations = async (userId, farmId) => {
    if (!userId || !farmId) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/evaluation/user/${userId}/farm/${farmId}`,
        {
          headers: {
            "Authorization": document.cookie,
          },
        }
      );

      setEvaluations(response.data);

      const uniqueYears = Array.from(
        new Set(response.data.map((evaluation) => new Date(evaluation.endDate).getFullYear()))
      );

      setYears(uniqueYears);
      setWaterFootprint([]);
      setSelectedYear('');

    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  };


  const fetchCarbonPrintFoot = async (farmId) => {
    if (!farmId) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint/farm/${farmId}`,
        {
          headers: {
            "Authorization": document.cookie,
          },
        }
      );

      setCarbonFootprint(response.data);

    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  };


  const sendQr = async () => {
    try {

      const requestBody = {
        personal_data_preferences: personalInformation,
        user_id: user.id,
        farm_id: selectedFarm,
        environmental_certificates: environmentalCertificates,
        carbon_footprint: selectedCF.length ? {year: selectedCF[0].year, total: (selectedCF.map(i => i.result).reduce((a,b) => a + b)).toFixed(2)} : {} ,
        water_footprint: waterFootprint.filter(wf => wf.checked)
      };
      
      

      const response = await axios.post(
        `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/setting/qr`,
        JSON.stringify(requestBody),
        {
          headers: {
            'Authorization': document.cookie,
            'Content-Type': 'application/json',
          },
        },
      );


      if (response.status === 201) {
        setResponseId(response.data.id);
        setSelectedCF([]);
        setWaterFootprint([]);
        setYears([]);
        fetchQr(selectedFarm);
        return true;
      } else {
        console.error('Error sending preferences:', response);
        setErrors('Error sending QR. Try again');
        return false;
      }

    } catch (error) {
      setErrors(error.message);
      return false;
    }
  };



  const handleFarmChange = async (event) => {
    const farmId = event.target.value;
    setSelectedFarm(farmId);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPersonalInformation(prevState => ({ ...prevState, [name]: checked }));
  };

  const handleYearChange = async (event) => {

    setSelectedYear(event.target.value);
    const wf = evaluations.filter(e => new Date(e.endDate).getFullYear() === event.target.value)
    wf.forEach(e => e.checked = false)
    setWaterFootprint(wf)
  };

  const handleYearChangeCarbonFootprint = async (event) => {
    setSelectedCF(carbonFootprint.filter(cf => cf.year == event.target.value));
  };

  useEffect(() => {
    dispatch(getFarms(user.id));

  }, [dispatch]);

  useEffect(() => {
    if(selectedFarm){
      fetchEvaluations(user.id, selectedFarm);
      fetchCarbonPrintFoot(selectedFarm);
      setCertificates(farms.find(f => f.id === selectedFarm)?.urls);
      fetchQr(selectedFarm);
    }
  }, [selectedFarm]);

  const handleDialogOpen = (id) => {
        setResponseId(id);
        setOpen(true); 
  };


  const handleDialogClose = () => {
    setOpen(false);
  };

  
  const handleCheckWf = (id) => {
    const index = waterFootprint.findIndex(wf => wf.id === id);
    const waterFootprintChanged = waterFootprint;
    waterFootprintChanged[index].checked = !waterFootprint[index].checked
    setWaterFootprint([...waterFootprintChanged])
  }


  const checkError = () => {
    if(!Object.values(personalInformation).some(e => e)) {
      setErrors('Personal Info');
      return false;
    }
    setErrors('');
    return true;
  }

  const handleSubmit = () => {
    const result = checkError();
    if(result){
      sendQr();
      handleDialogOpen(responseId)
    }
  }


  const handleDeleteQR = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/setting/qr/${id}`,
      {
        headers: {
          'Authorization': document.cookie,
        },
      },
    );

    if(response.status === 204) fetchQr(selectedFarm)

  }

  return (
    <Page title="Mi QR">

      <Stack spacing={4}>
        <Container>
          <Card>
            <div>
              <Accordion expanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{t('labels.selectFarm')}</Typography>
                </AccordionSummary>
                <AccordionDetails>

                  <FormControl fullWidth>

                    <Select
                      labelId="farm-select-label"
                      id="farm-select"
                      value={selectedFarm}
                      label="Farm"
                      onChange={handleFarmChange}
                    >
                      {farms.map((farm) => (
                        <MenuItem key={farm.id} value={farm.id}>
                          {farm.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </AccordionDetails>
              </Accordion>

            </div>
          </Card>

          <Card>
            <div>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{t('labels.cfAndHf')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel id="year-select-label">{t('labels.waterF')}</InputLabel>
                            <Select
                              labelId="year-select-label"
                              id="year-select"
                              value={selectedYear}
                              label="Huella Hidríca"
                              onChange={handleYearChange}
                            >
                              {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>


                          <FormGroup>                         
                            {waterFootprint.length ? 
                            waterFootprint.map(wf => (
                              <>
                                <FormControlLabel
                                  key={wf.id}
                                  control={<Checkbox checked={wf.checked} value={wf.id} onChange={(e) => handleCheckWf(e.target.value)}/> }
                                  label={`${wf.product.name} (${new Date(wf.startDate).toLocaleDateString(i18n,{
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                  })} - ${new Date(wf.endDate).toLocaleDateString(i18n,{
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                  })})`}
                                />
                                
                              </>
                            
                            )): <></>}
                          </FormGroup>


                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="year-select-label">{t('labels.carbonF')}</InputLabel>
                        <Select
                          labelId="year-select-label"
                          id="year-select-carbonprint"
                          value={selectedCF[0]?.year || ''}
                          label="Huella Carbono"
                          onChange={handleYearChangeCarbonFootprint}
                        >
                          {carbonFootprint.map(item => (
                            <MenuItem key={item.id} value={item.year}>
                              {item.year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>{t('labels.environmentCert')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(certificates) ? certificates.map((certificate) => (
                    <FormControlLabel
                      key={certificate.file_id}
                      name={certificate.file_id}
                      control={<Checkbox checked={Boolean(environmentalCertificates[certificate.file_id])} />}
                      label={certificate.filename}
                      onChange={(event) => {
                        setEnvironmentalCertificates({
                          ...environmentalCertificates,
                          [certificate.file_id]: event.target.checked,
                        });
                      }}
                    />
                  )) : null}
                </AccordionDetails>


              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>{t('labels.personalData')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(personalInformation).map(([key, value]) => key !== 'lastname' ?(
                    <FormControlLabel
                      key={key}
                      name={key}
                      control={<Checkbox checked={value} />}
                      label={labelTranslation[key]}
                      onChange={handleCheckboxChange}
                    />
                  ):<></>)}
                </AccordionDetails>

              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Qr Generados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List>
                  {qrs.length ? qrs.map(qr => (
                    <ListItem key={qr.id}>
                      <ListItemText
                        key={qr.id}
                        primary={`${new Date(qr.created_at).toLocaleDateString(i18n.language, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}`}/>

                      {qr.water_footprint?.length ? 
                        qr.water_footprint.map( (wf, i) => {
                          return (
                          <ListItemText
                          key= {`${qr.id}_hh${i}`}
                          secondary={hhDescription(wf)}
                          />
                      )})
                       : <></>}
                      <ListItemText
                        secondary={personalDataDescription(qr.personal_data_preferences)}
                      />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="QR"
                        size='small'
                        color="primary" // Puedes cambiar el color según tus preferencias
                        onClick={() => handleDialogOpen(qr.id)}
                      >
                        QR
                      </IconButton>
                      <IconButton
                        aria-label="Eliminar"
                        color="primary" // Puedes cambiar el color según tus preferencias
                        onClick={() => handleDeleteQR(qr.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  )): <></>}
                </List>
                
                </AccordionDetails>

              </Accordion>

              <Box display="flex" justifyContent="center">
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {t('buttons.generate')}
                </LoadingButton>
              </Box>
              {errors ? <Alert severity='error'>{errors}</Alert> : <></>}

            </div>
          </Card>

          <QRDialog open={open} onClose={handleDialogClose} responseId={responseId} />
        </Container>
      </Stack>

    </Page>
  );
}