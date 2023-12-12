import { useEffect,useState } from 'react';
import axios from 'axios';
// @mui
import { Alert, Card, Container,LinearProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
// utils 
import { getUsersPerCountry } from './utils/getData';
// countries
import { getCountriesList } from '../../../../utils/getCountries';
// pie charts
import { LineChart } from '@mui/x-charts/LineChart';

// ----------------------------------------------------------------------


export function UsersRegisteredPerYear() {
  const { i18n, t } = useTranslation('statistics');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { isLoading, error, years, usersData, organizationsData, totalUsers } = useSelector(state => state.systemUsersSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Handle the user state change 
  const [countryType,setCountryType] = useState('');

  // Required for loading countries list
  const [countries, setCountries] = useState(null);
  
  // User Type change
  const handleStateTypeUser = event => {
    const value = event.target.value;
    setCountryType(value);
    dispatch(getUsersPerCountry(value));
  };
  
  const MyAlert = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <Alert
        severity="error"
        onClose={onClose}
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        {message}
      </Alert>
    );
  };

  if(!countryType){
    // Define the default state if it is null or not defined
    if(i18n.language === 'en') {
      setCountryType('All countries');
     }else{
      setCountryType('Todos los paises');
     }
  }

 function determinateType(value){
  return (value.includes('All') || value.includes('Todos')) ?  'All' : 'Other';
}

  useEffect(() => {
    // Get countries available
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


    // Get the users per country
    dispatch(getUsersPerCountry(countryType));
  }, [dispatch]);


  useEffect(() => {
    if (!isLoading && error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  console.log(usersData);
  return (
    <Page title={t('inputs.usersRegistered')}>
      
      <Container>
        <HeaderBreadcrumbs
            heading={t('titles.userRegisteredYear')}
            sx={{ mb: 0 }}
            links={[
              { name: t('inputs.home'), href: '/dashboard/admin' },
              { name: t('inputs.statistics'), href: '/dashboard/admin/statistics' },
              { name: t('inputs.usersRegistered'), href: '/dashboard/admin/statistics/page/usersPerCountry' },
            ]}
          />

          <FormControl sx={{  mr: '1%', width: '30%' }}>
                <InputLabel id="state-select-label">{t('inputs.country')}</InputLabel>

                <Select
                  labelId="state-user-select-label"
                  defaultValue={t('inputs.allCountries')}
                  id="year-select-label"
                  value={countryType}
                  onChange={handleStateTypeUser}
                  label="stateUserType"
                  sx={{ ml: 1 }}
                 // disabled={!!error}
                >
                  <MenuItem value={t('inputs.allCountries')} key={t('inputs.allCountries')}>
                    <em> {t('inputs.allCountries')} </em>
                  </MenuItem>
                  {countries?.map(country => (
                    <MenuItem key={country?.id} value={country?.name}>
                      {country?.name}
                    </MenuItem>
                  ))}
                  
                </Select>
                
        </FormControl>
        <FormControl sx={{  mr: '1%', width: '50%' }}>
                     &nbsp;&nbsp;&nbsp;  <p style={{color : '#1fad30'}} >&nbsp; {t('inputs.totalUsers')}{totalUsers} </p>
        </FormControl>

        <br />
        <br />

        <Card>
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading || !usersData.length ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              <><br/> <p> &nbsp;&nbsp; {t('inputs.graphInfo1')}<a  style={{color : '#1fad30'}} > {determinateType(countryType)=== 'All' ? t('inputs.graphInfo2allR')  :  t('inputs.graphInfo2specifciR') }</a>{t('inputs.graphInfo3')}</p>
                 <center>
                  <LineChart
                  xAxis={[
                    {
                      id: "Years",
                      data: years.map(year => new Date(year, 0, 1)),
                      scaleType: "time",
                      valueFormatter: (date) => date.getFullYear(),
                      label: t("graphFields.years")
                    }
                  ]}
                  series={[
                    {
                      id: "Users",
                      label: t("graphFields.users"),
                      data: usersData,
                      stack: "total",
                      area: true,
                    },
                    {
                      id: "Organizations",
                      label: t("graphFields.organizations"),
                      data: organizationsData,
                      stack: "total",
                      area: true
                    }
                  ]}
                  sx={{
                    "--ChartsLegend-itemWidth": "200px"
                  }}
                  width={600}
                  height={400}
                  margin={{ left: 70 }}
                />
                </center>
              <br/><center> <p style={{color : '#b5c9c2'}} > &nbsp;&nbsp;&nbsp;&nbsp; {t('inputs.graphInfoGeneral')}</p></center>
              <br/>
            </>        
              
            )}
          </Scrollbar>

        </Card>
        {showAlert && <MyAlert message={t('noCertificateUploaded')} />}
      </Container>
    </Page>
  );
}