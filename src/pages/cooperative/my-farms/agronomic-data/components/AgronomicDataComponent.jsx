import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import cropTypes from './crops'
import NoDataAlert from './NoDataAlert'
import {CardContent, 
        Card, 
        Grid,
        Select,
        FormControl,
        MenuItem,
        InputLabel,
        TextField,
        Typography,
        Toolbar,
        Divider,
        
        Box } from '@mui/material';
import { useSelector } from 'react-redux';
import sun from '../../../../../assets/sun.png';
import moon from '../../../../../assets/moon.png';
import Paper from '@mui/material/Paper';
import Page from '../../../../../components/utils/Page';
import { styled } from '@mui/material/styles';
import HeaderBreadcrumbs from '../../../../../components/utils/HeaderBreadcrumbs';

function AgronomicDataComponent() {

  const { i18n, t } = useTranslation('agronomic-data');

    // variables de consulta al API
    const [selectedFarm, setSelectedFarm] = useState('');
    const [farms, setFarms] = useState([]);
    const [crop, setCrop] = useState('');
    const [maturity, setMaturity] = useState();
    const [soilDepth, setSoilDepth] = useState('');
    const [data, setData] = useState([]);
    const { cooperative } = useSelector(s => s.authSlice);

    // Added for the navigation
    const RootStyle = styled(Toolbar)(({ theme }) => ({
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 1, 1, 3),
    }));

    const handleCropChange = event => {
        const cropSelected = event.target.value;
        setCrop(cropSelected);
    };

    const handleMaturityChange = event => {
      // if number value exceeds 100 then will turn num to 100
      let newValue = event.target.value;

      // Comprueba si el nuevo valor está dentro del rango permitido
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > 100) {
        newValue = 100;
      }
      console.log(newValue)

      setMaturity(newValue);
    };

    const handleSoilDepthChange = event => {
        // if number value exceeds 200 then will turn num to 200
        let newValue = event.target.value;

        // Comprueba si el nuevo valor está dentro del rango permitido
        if (newValue < 0) {
          newValue = 0;
        } else if (newValue > 200) {
          newValue = 200;
        }
        console.log(newValue)
    
        setSoilDepth(newValue);

    };

    const fetchFarms = async () => {
      try {

        // Bringing the data from the cooperative
        const responseCooperatives = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/getUsers/${cooperative.id}`);
        // Extracting the users from the response 
        const usersToBeAdapted = (responseCooperatives.data).map(obj => obj.user);

        // Creating the adapated farms with the users related to the cooperatives
        let farmsByUser;
        let userId;
        let newAdaptedFarms;
        const finalFarms = [];
        for await (const userWithData of usersToBeAdapted){
          userId = userWithData.id;
          farmsByUser =  await fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${userId}`,{
            headers: {
              'Authorization': document.cookie
            }
          });
          newAdaptedFarms = await farmsByUser.json();
          newAdaptedFarms.forEach(farm => {
            // Setting up the name to provide more information about the owner :
            farm.owner=userWithData.name+' '+userWithData.lastname;
            // Adding the user to the farm 
            farm.userId=userId;
            farm.ownerEmail=userWithData.email;
            finalFarms.push(farm);
            });
        }

        setFarms(finalFarms);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    const convertTimestamps = (timestamps) => {
      return timestamps.map((timestamp) => {
        const date = new Date(timestamp * 1000); // se multiplica por 1000 para obtener la fecha en milisegundos
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // se agrega el cero al inicio si es necesario
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const offset = '-0400'; // se puede cambiar por la zona horaria deseada
    
        return `${year}-${month}-${day}T${hours}:${minutes}:00${offset}`;
      });
    };

    const formatHour = (dateString) => {
      const date = new Date(dateString);
      let hour = date.getHours();
      let ampm = "AM";
      if (hour >= 12) {
        hour = hour - 12;
        ampm = "PM";
      }
      if (hour === 0) {
        hour = 12;
      }
      return `${hour} ${ampm}`;
    }

    const cardStyle = {
      boxShadow: '0px 7px 7px 4px rgba(0, 0, 0, 0.3)',
      borderRadius: '20px',
      borderLeft: '6px solid #3A622A',
      padding: '2px',
      margin: '10px 0' ,
      marginRight: '10px'
    };
  

    const evapoCropTransform = (crop) => {
      const roundedNumb = crop.toFixed(2);
      return roundedNumb;
    }

    const toPercentage = (num) => {
      const percentage = (num * 100).toFixed(1) + '%';
      return percentage;
    }

    const ShowAlert = () =>{
        if (crop !== '') return 
        return (
        <NoDataAlert/>
        );
    };

    const ShowCards = () =>{
        if (crop !== '' && farms){
        return(
          <Grid item xs={11}  container spacing={2}>
          {data.map((item, index) => (
            <Grid item key={index} xs={12} md={3}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    { formatDate(item.validTimeUtc[0])}
                  
                  </Typography>
                  {item.validTimeUtc.map((date, i) => (
                    <>
                    <Divider variant="middle" />
                    <br />
                    <Typography variant="h7" component="div">
                    <img
                    src={isNight(date) ? moon : sun}
                    alt="Moon or Sun"
                    style={{
                      borderRadius: '50%', 
                      width: '50px', 
                      height: '50px',
                      float: 'right' 
                    }}
                  />
                    {formatHour(date)}

                  </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('dataResult.cropEvapotranspiration')}:</b> {evapoCropTransform(item.evapotranspirationCrop[i])} {t('dataResult.evapotranspirationUnit')}
                      </Typography> 
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('dataResult.soilHumidity')}:</b> {toPercentage(item.soilMoisture[i])}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('dataResult.soilTemperature')}:</b> {kelvinToCelsius(item.soilTemperature[i])}°C
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('dataResult.temperatureInversion')}:</b> {item.temperatureInversion[i]}
                      </Typography>
                      <Typography style={{color: 'red'}} align='center' sx={{ fontSize: 14 }} color="text.red" gutterBottom>
                      <b>{checkTemperature(item.temperatureInversion[i])}</b>
                      </Typography>
                      <Divider variant="middle" />
                    </>
  
                  ))}
  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
            )
        }
    };

  // consulta al back
  const getForecast = async(lat,lng,crop,soilDepth) =>{

      let params;
      
    
      if (crop && !soilDepth) {
            params= {
                geocode:{
                  lat: lat,
                  lng:lng
                } ,
                crop: crop
            }
      }
      else if (soilDepth && !crop) {
            params= {
              geocode:{
                lat: lat,
                lng:lng
              } ,
                soilDepth: soilDepth
            };
      }
      else if (crop && soilDepth) {
              params= {
                geocode:{
                  lat: lat,
                  lng:lng
                } ,
                  crop: crop,
                  soilDepth: soilDepth
              };
      } else {
            params= {
              geocode:{
                lat: lat,
                lng:lng
              } ,
            };
      };
    
      try {
          const res = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/apiWeather/agriculture`, params);
          const { forecasts1Hour } = res.data;
          const {validTimeUtc, evapotranspirationCrop, soilMoisture,soilTemperature,temperatureInversion} = forecasts1Hour;

          const validLocal= convertTimestamps(validTimeUtc);
          const groupedData = validLocal.reduce((acc, date, index) => {
            const dateString = new Date(date).toLocaleDateString();
            const data = {
              validTimeUtc: [date],
              evapotranspirationCrop: [evapotranspirationCrop[index]],
              soilMoisture: [soilMoisture[index]],
              soilTemperature: [soilTemperature[index]],
              temperatureInversion: [temperatureInversion[index]]
            };
            if (!acc[dateString]) {
              acc[dateString] = data;
            } else {
              acc[dateString].validTimeUtc.push(date);
              acc[dateString].evapotranspirationCrop.push(evapotranspirationCrop[index]);
              acc[dateString].soilMoisture.push(soilMoisture[index]);
              acc[dateString].soilTemperature.push(soilTemperature[index]);
              acc[dateString].temperatureInversion.push(temperatureInversion[index]);
            }
            return acc;
          }, {});
          setData(Object.values(groupedData));    
      } catch (e) {
          console.log(e);
      };
    };
    
    function kelvinToCelsius(temperature) {
      // TODO: remove eslint exception and check if it needs to be changed
      // eslint-disable-next-line eqeqeq
      if(temperature == 0 || !temperature){
        return 0;
      }
        const celsiusValue = Math.floor(temperature - 272.15);
        return celsiusValue
      
    };

    function checkTemperature(temperature) {
      if(temperature> 0){
        return t('dataResult.sprayWarning')
      }
    }

    function isNight(dateString) {
      const date = new Date(dateString);
      const hour = date.getHours();
      if(hour >= 7 && hour < 20) {
        return false;
      }
      return true;
    }
    
    useEffect(() => {
      fetchFarms();
    }, []);

    useEffect(() => {
      callApi()
    }, [selectedFarm,crop,soilDepth,maturity]);

    const callApi= async () => {

      if (selectedFarm && crop && maturity > 0) {
        const selectedFarmData = farms.find((farm) => farm.id === selectedFarm);
        if (selectedFarmData && selectedFarmData.ubication) {
         await getForecast(selectedFarmData.ubication.lat, selectedFarmData.ubication.lng,`${crop}:${maturity}`,soilDepth);
        }
      }
    };

    const capitalizeFirstChar = (str) => {
      if (!str || typeof str !== 'string') {
        return '';
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleString(i18n.language, options);
    
      const parts = formattedDate.split(' ');
      parts[0] = capitalizeFirstChar(parts[0]);
      return parts.join(' ');
    };
    
    return (
      <Page title={t('title')}>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('title2')}
          sx={{ mb: 0 }}
          links={[
            { name: t('inputs.home'), href: '/dashboard/main' },
            { name: t('inputs.myFarms'), href: '/dashboard/main/myFarms' },
            { name: t('inputs.agronomicData'), href: '/dashboard/main/myFarms/page/waterFootprints' },
          ]}
        />
      </RootStyle>

      <Paper elevation={3}>
      <CardContent>
      <Grid container spacing={1}>
          <Box sx={{ minWidth: 1220, display:'flex', alignItems:'end',maxWidth:'100%' }}>
          <FormControl sx={{  mr: '2%', width: '25%' }}>
              <InputLabel id="farm-select-label">{t('inputs.farmLabel')}</InputLabel>
              <Select
                labelId="farm-select-label"
                id="farm-select"
                value={selectedFarm}
                label={t('inputs.farmLabel')}
                onChange={(event) => setSelectedFarm(event.target.value)}
              >

                {farms.map((farm) => (
                  <MenuItem key={farm.id} value={farm.id}>
                    {farm.name} - {farm.owner}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              <FormControl sx={{  mr: '2%', width: '15%' }}>
              <InputLabel id="crop-label">{t('inputs.cropLabel')}</InputLabel>
              <Select value={crop}  id="crop" label={t('inputs.cropLabel')} onChange={handleCropChange}>
         
              {Object.entries(cropTypes(t)).map(([key, value]) => {
                          return (
                          <MenuItem value={key} key={key}>
                              {value}
                          </MenuItem>
                          );
                      })}
              </Select>
              </FormControl>
              
              <FormControl fullwidth={'true'} sx={{ width: '16%' }}>
              <TextField
                  id="quantity"
                  label={t('inputs.ripenessPercentage')}
                  value={maturity}
                  type="number"
                  variant="standard"
                  onChange={handleMaturityChange}
              />
              </FormControl>
              %     
              <FormControl fullwidth={'true'} sx={{ml: '2%', width: '15%' }}>
              <TextField
                  id="soilDepth"
                  label={t('inputs.soilDepth')}
                  type="number"
                  variant="standard"
                  value={soilDepth}
                  onChange={handleSoilDepthChange}
              />
              </FormControl>   
              cm
          </Box>
          </Grid>
          <br />

          <ShowAlert/>
          <ShowCards/>
              

      </CardContent>

      
      </Paper>
    </Page>
    )
}

export default AgronomicDataComponent