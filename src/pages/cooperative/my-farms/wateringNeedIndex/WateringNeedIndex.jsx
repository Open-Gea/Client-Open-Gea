import { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Toolbar,
  Divider,

} from '@mui/material';
import Paper from '@mui/material/Paper';

import Page from '../../../../components/utils/Page';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';

export default function WateringNeedIndex() {

  const { i18n, t } = useTranslation('irrigation');
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [data, setData] = useState([]);
  const { cooperative } = useSelector(s => s.authSlice);

  // Added for the navigation
  const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1, 1, 3),
  }));

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

      // Set the selectedFarm state to the first farm's id
      if (finalFarms.length > 0) {
        setSelectedFarm(finalFarms[0].id);
      }

    } catch (error) {
      console.error('Error fetching farms:', error);
    }
  };

  const fetchData = async (lat, lng) => {
    if (!lat || !lng) return null;
    try {
      const params = {
        geocode: {
          lat,
          lng
        },
        language: i18n.language,
      }

      const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/apiWeather/wateringNeeds`,params)
      const { wateringNeedsIndex12hour = { fcstValidLocal: [] } } = response.data;
      const { fcstValidLocal, wateringNeedsIndex, wateringNeedsCategory } = wateringNeedsIndex12hour;

      const groupedData = fcstValidLocal.reduce((acc, date, index) => {
        const dateString = new Date(date).toLocaleDateString();
        if (!acc[dateString]) {
          acc[dateString] = {
            fcstValidLocal: [date],
            wateringNeedsIndex: [wateringNeedsIndex[index]],
            // 0-1 = None
            wateringNeedsCategory: [wateringNeedsIndex[index] > 1 ? wateringNeedsCategory[index] : t('dontWaterLabel')],
          };
        } else {
          acc[dateString].fcstValidLocal.push(date);

          // 0-1 = None
          if (wateringNeedsIndex[index] <= 1) {
            acc[dateString].wateringNeedsCategory.push(t('dontWaterLabel'));
            acc[dateString].wateringNeedsIndex.push(wateringNeedsIndex[index]);
          } else {
            acc[dateString].wateringNeedsCategory.push(wateringNeedsCategory[index]);
            acc[dateString].wateringNeedsIndex.push(wateringNeedsIndex[index]);
          }
        }
        return acc;
      }, {});

      setData(Object.values(groupedData));

    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    fetchFarms();
  }, []);
  
  useEffect(() => {
    if (selectedFarm) {
      const selectedFarmData = farms.find((farm) => farm.id === selectedFarm);
      if (selectedFarmData && selectedFarmData.ubication) {
        fetchData(selectedFarmData.ubication.lat, selectedFarmData.ubication.lng);
      }
    }
    // Detects a language change and refreshes API data automatically
  }, [selectedFarm, farms, i18n.language]);


  const capitalizeFirstChar = (str) => {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const formatDate = (dateString) => {
    const formattedDate = format(new Date(dateString), 'PPPP');
    return capitalizeFirstChar(formattedDate);
  };
  

  const formatHour = (dateString) => {
    const formattedHour = format(new Date(dateString), 'hh:mm aaaa');
    return formattedHour;
  }

  const cardStyle = {
    boxShadow: '0px 7px 7px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    borderLeft: '6px solid #3A622A',
    padding: '2px',
    margin: '10px 0' 
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
            { name: t('inputs.irrigation'), href: '/dashboard/main/myFarms/page/waterFootprints' },
          ]}
        />
      </RootStyle>
      
      <Paper elevation={3}>
        
        <Grid item xs={3}>
        
          <Box sx={{ minWidth: 120 }}>
            
            <FormControl fullWidth>
              <InputLabel id="farm-select-label">{t('inputs.farm')}</InputLabel>
              <Select
                labelId="farm-select-label"
                id="farm-select"
                value={selectedFarm}
                label="Farm"
                onChange={(event) => setSelectedFarm(event.target.value)}
              >
                {farms.map((farm) => (
                  <MenuItem key={farm.id} value={farm.id}>
                    {farm.name} - {farm.owner}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs>

        </Grid>
        <Grid item xs>

        </Grid>
      </Paper>
      <br/>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item key={index} xs={12} md={3}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="div">
                  { formatDate(item.fcstValidLocal[0])}
                </Typography>
                {item.fcstValidLocal.map((date, i) => (
                  <Fragment key={i}>
                    <Divider variant="middle" />
                    <br />
                    <Typography variant="h7" component="div">
                      
                    {formatHour(date)}
                  </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('wateringNeedsIndexLabel')}:</b> {item.wateringNeedsIndex[i]}
                      </Typography> <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b>{t('wateringNeedsLabel')}:</b> {item.wateringNeedsCategory[i]}
                      </Typography>
                      <Divider variant="middle" />
                  </Fragment>

                ))}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );

}

