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
// pie charts
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';

// ----------------------------------------------------------------------


export function UsersPerCountry() {
  const { i18n, t } = useTranslation('statistics');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { isLoading, error, usersPerCountry } = useSelector(state => state.systemUsersSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Handle the user state change 
  const [stateTypeUser,setStateTypeUser] = useState('');

  // Methods for the Pie Chart
  const pieSizing = {
    margin: { right: 200 },
    width: 600,
    height: 400,
  };
  const TOTAL = usersPerCountry.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  // Users Types
  const availableUsers = [
    t('inputs.productor'),
    t('inputs.organization')
  ]

  
  // User Type change
  const handleStateTypeUser = event => {
    const value = event.target.value;
    setStateTypeUser(value);
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

  if(!stateTypeUser){
    // Define the default state if it is null or not defined
    if(i18n.language === 'en') {
       setStateTypeUser('All users');
     }else{
       setStateTypeUser('Todos los usuarios');
     }
 }

 function determinateType(value){
  switch(value){
    case 'o':
      return 'organization';
    case 'f':
      return 'user';
    case 'p':
      return 'user';
    default:
      return 'all';
  }
}

  useEffect(() => {
    // Get the users per country
    dispatch(getUsersPerCountry(stateTypeUser));
  }, [dispatch]);


  useEffect(() => {
    if (!isLoading && error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title={t('inputs.usersRegistered')}>
      
      <Container>
        <HeaderBreadcrumbs
            heading={t('titles.usersRegistered')}
            sx={{ mb: 0 }}
            links={[
              { name: t('inputs.home'), href: '/dashboard/admin' },
              { name: t('inputs.statistics'), href: '/dashboard/admin/statistics' },
              { name: t('inputs.usersRegistered'), href: '/dashboard/admin/statistics/page/usersPerCountry' },
            ]}
          />

          <FormControl sx={{  mr: '1%', width: '20%' }}>
                <InputLabel id="state-select-label">{t('inputs.userType')}</InputLabel>

                <Select
                  labelId="state-user-select-label"
                  defaultValue={t('inputs.allUsers')}
                  id="year-select-label"
                  value={stateTypeUser}
                  onChange={handleStateTypeUser}
                  label="stateUserType"
                  sx={{ ml: 1 }}
                 // disabled={!!error}
                >
                  <MenuItem value={t('inputs.allUsers')} key={t('inputs.allUsers')}>
                    <em> {t('inputs.allUsers')} </em>
                  </MenuItem>
                  {availableUsers?.map(availableUserType => (
                    <MenuItem key={availableUserType} value={availableUserType}>
                      {availableUserType}
                    </MenuItem>
                  ))}
                </Select>
        </FormControl>

        <br />
        <br />

        <Card>
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              <><br/> <p> &nbsp;&nbsp; {t('inputs.graphInfo1')}<a  style={{color : '#1fad30'}} > {determinateType(stateTypeUser[0]?.toLowerCase())=== 'organization' ? t('inputs.graphInfo2organizations')  : determinateType(stateTypeUser[0]?.toLowerCase())=== 'user' ? t('inputs.graphInfo2farmers') : t('inputs.graphInfo2all')}</a>{t('inputs.graphInfo3')}</p>
              <PieChart
                  series={[
                    {
                      outerRadius: 140,
                      data: usersPerCountry,
                      arcLabel: getArcLabel,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'white',
                      fontSize: 14,
                    },
                  }}
                  {...pieSizing} />
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