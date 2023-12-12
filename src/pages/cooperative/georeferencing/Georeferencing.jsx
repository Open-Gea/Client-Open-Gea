import { useEffect,useState } from 'react';
// @mui
import { Box, Alert, Card, Container, LinearProgress } from '@mui/material';
// components
import Page from '../../../components/utils/Page';
// sections
import { FarmsListToolbar } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { getFarmsByCooperative } from './utils/getFarms';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../components/utils/HeaderBreadcrumbs';
// Map
import { 
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup
 } from 'react-leaflet';
import L from 'leaflet';


// ----------------------------------------------------------------------

export function Georeferencing() {
  const { t } = useTranslation('georeferencing');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredFarms, isLoading, error } = useSelector(state => state.farmsCooperativaSlice);
  const { cooperative } = useSelector(s => s.authSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const filtered = applySortFilter(filteredFarms, getComparator(order, orderBy), filterName);

  // Center of the map displayed
  const lat= '-15';
  const lng= -70;

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

  useEffect(() => {
    dispatch(getFarmsByCooperative(cooperative.id));
  }, [dispatch]);
  useEffect(() => {
    if (!isLoading && error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title={t('titleG')}>
      <Container>
        <HeaderBreadcrumbs
            heading={t('titleG')}
            sx={{ mb: 0 }}
            links={[
              { name: t('inputs.home'), href: '/dashboard/main' },
              { name: t('titleG'), href: 'dashboard/main/georeferencing' },
            ]}
          />
        <Card>
        &nbsp; {t('georeferencingMessage')}{cooperative.name}:
        <br/>
        <br/>

        <FarmsListToolbar /> 
        <br />
        <Scrollbar sx={{ maxHeight: '50%' }}>
          {isLoading ? (
            <LinearProgress sx={{ my: 5 }} />
          ) : (
            <Box
              component={MapContainer}
              center={{ lat, lng }}
              sx={{
                width: { xs: '58vh', md: '80vh' },
                height: { xs: '50vh', md: '60vh' },
                m: '0 auto',
              }}
              zoom={2}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <LayersControl collapsed={true}>
                {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                const { id, name, owner, phone, country, lat, lng, userId } = row;
                
                /* With Circle */
                const iconCircle= "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="+name[0]+"|00AB55|FFFFFF";
                const locationIcon = '<object data="your.svg" type="image/svg+xml"><img src="'+iconCircle+'" width="20px" height="30px" /></object>';
                const newicon = new L.Icon({
                  iconUrl: iconCircle,
                  iconAnchor: [5, 55],
                  popupAnchor: [10, -44],
                  iconSize: [20, 30]
                });
                /* With Cloud 
                  const iconCloud= `https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bbbr|${name}|00AB55|FFFFFF`;
                  const locationIconCloud = '<object data="your.svg" type="image/svg+xml"><img src="'+iconCloud+'" width="40px" height="20px" /></object>';
                  const newiconCloud = new L.Icon({
                    iconUrl: iconCloud,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 40]
                  }); */

                return (
                    <LayersControl.Overlay checked name={`${name} <center> ${locationIcon} </center><br/>`} key={id} >
                      <Marker
                        icon={newicon}
                        position={{ lat, lng }}
                        eventHandlers={{
                          add: (e) => {
                            // e.target.openPopup();
                            // e.target._popup.closeOnClick = false;
                          },
                          remove: (e) => {
                            // console.log("Removed layer:", e.target);
                            // e.target.openPopup();
                          },
                          click: (e) => {
                            e.target._map.setView([lat, lng], 14);
                          },
                          mouseover: (e)=>{
                            e.target.openPopup();
                          },
                          dblclick: (e)=>{
                            e.target._map.setView([lat, lng], 2);
                          }
                          
                        }}
                      >
                        <Popup>
                        <b>{`${t('farmDetails.ownerLabel')}:`} </b> {` ${owner}`} 
                        <br />
                        <br />
                        <b>{`${t('farmDetails.farmLabel')}:`} </b> {` ${name}`}
                        <br />
                        <br />
                        <b>{`${t('farmDetails.countryLabel')}:`} </b> {` ${country}`}
                        </Popup>

                      </Marker>
                    </LayersControl.Overlay>
                );
                })}
              </LayersControl> 
          </Box>

          )}
        </Scrollbar>
          
        <br/>
        <br/>
        <br/>

        </Card>
        {showAlert && <MyAlert message={t('noCertificateUploaded')} />}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
    return -1;
  }
  if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(_user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}


