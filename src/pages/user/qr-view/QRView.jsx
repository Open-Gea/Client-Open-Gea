import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Avatar, Typography, Button , Grid, LinearProgress, Card, CardHeader, CardContent, List, ListItem, ListItemIcon, Divider} from '@mui/material';

import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';


import co2 from '../../../assets/co2.svg';
import evotranspiracion from '../../../assets/evotranspiracion.svg';


import PersonIcon from '@mui/icons-material/Person';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import WaterFootprintTable from './WaterFootprintTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import CropFree from '@mui/icons-material/CropFree';
import {Gallery} from 'react-grid-gallery';
import { useTranslation } from 'react-i18next';


export function QRView() {

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [carbonFootprint, setCarbonFootprint] = useState({});
  const [certificatesUrl, setCertificatesUrl] = useState([]);

  const [ubication, setUbication] = useState();

  const {t} = useTranslation('qr-view')

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/setting/qr/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        else{
          const jsonData = await response.json();
          setData(jsonData);
  
          if(jsonData.farm_id.urls.length){
            
            const urls = [];
  
            for(const i in jsonData.environmental_certificates){
              if(jsonData.environmental_certificates[i]){
                const url = jsonData.farm_id.urls.find(url => url.file_id == i);
                urls.push(url)
              }
            }
           
           
            setCertificatesUrl(urls)
  
          }
  
          setUbication([parseFloat(jsonData.farm_id.ubication.lat), parseFloat(jsonData.farm_id.ubication.lng)])
          fetchImages(jsonData.user_id.id);
          setCarbonFootprint(jsonData.carbon_footprint)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);


  const profileImageUrl = data && data.user_id.profile_picture
    ? URL.createObjectURL(new Blob([new Uint8Array(data.user_id.profile_picture.data)], { type: 'image/png' }))
    : 'https://via.placeholder.com/200';



  const arrayBufferToDataURL = (buffer, contentType) => {
    const base64Flag = `data:${contentType};base64,`;
    const imageStr = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return base64Flag + imageStr;
  };


  const fetchImages = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/media/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const imageData = await response.json();
      const convertedImages = imageData.map((image) => {
        const contentType = image.type === 'image' ? 'image/jpeg' : 'video/mp4';
        return {
          ...image,
          dataUrl: arrayBufferToDataURL(image.file_data.data, contentType),
        };
      });
      setImages(convertedImages);

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  const galleryImages = images.map((image, index) => {
    return{
    src: image.dataUrl,
    thumbnail: image.dataUrl,
    thumbnailWidth: 320,
    thumbnailHeight: 240,
    caption: 'Image ' + index}
  });

  
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>

      {
        data ? 
        (
        <Grid container sx={{margin: 'auto'}} spacing={3}> 
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader
                title={data.farm_id.name}
                avatar={<Avatar
                  alt="User profile"
                  src={profileImageUrl}
                  sx={{ height: 'auto'}}
                />}
              />
              <CardContent>
                {data.user_id.description && (
                  <>
                    <DescriptionIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {data.user_id.description}
                    </Typography>
                    <Divider />
                  </>
                )}
                <Typography variant="h6">
                  <PersonIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                    {data.user_id.name} {data.user_id.lastname}
                </Typography>
                <Typography variant="body1">
                  <PhoneIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                  {data.user_id.phone}
                </Typography>
                <Typography variant="body1">
                  <EmailIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                  {data.user_id.email}
                </Typography>
                <Typography variant="body1">
                <PublicIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                  {data.user_id.country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <CardHeader
                title={t('farmInfo')}
                avatar={<AgricultureIcon sx={{color: 'green'}}/>}
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography >
                      <PersonIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                      {t('owner')}: {data.farm_id.owner}
                    </Typography>
                    <Typography >
                      <CropFree sx={{ marginRight: 1, color: 'primary.main' }}/>
                      {t('surface')}: {data.farm_id.totalSurface} Ha
                    </Typography>
                    {
                      certificatesUrl.length ?  
                        <Typography >
                        <DescriptionIcon sx={{ marginRight: 1, color: 'primary.main' }}/>
                        {t('certificates')}: 
                        <List>
                          {certificatesUrl.map((c, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <Button variant='outlined' onClick={() => window.open(c.url, '_blank')}>
                                  {c.filename}
                                </Button>
                              </ListItemIcon>
                            </ListItem>
                          ))}
                        </List>
                      </Typography>    
                            
                      : <></>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component={MapContainer}
                      center={ubication}
                      sx={{
                        width: { xs: '28vh', md: '50vh' },
                        height: { xs: '20vh', md: '30vh' },
                      }}
                      zoom={13}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={ubication} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
              
          <Grid item xs={12} sm={4}>
            { Object.keys(carbonFootprint).length ?
              <Card>
                <CardHeader
                  title={`${t('year')} ${carbonFootprint.year}`}
                  avatar={<Avatar src={co2} sx={{color: 'green'}}/>}
                />
                <CardContent>
                    <Typography >
                      {carbonFootprint.total} kg CO2
                    </Typography>
                </CardContent>
              </Card> : <></>
             }
          </Grid>
          <Grid item xs={12} sm={8}>
            {
              data.water_footprint.length ? 
              <Card>
                <CardHeader
                  title={t('waterF')}
                  avatar={<Avatar src={evotranspiracion} sx={{color: 'green'}}/>}
                />
                <CardContent>
                  <WaterFootprintTable water_footprint = {data?.water_footprint} />
                </CardContent>
              </Card>
              : <></>
            }
          </Grid>
          <Grid item xs={12} sm={12}>
            {images && images.length > 0 ? (
              <>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                  {t('galery')}
                </Typography>

                <Gallery images={galleryImages} />
              </>
            ) : <></>}
          </Grid>   
      </Grid>
      )
      : <LinearProgress sx={{ my: 5 }} />}
    </>
  );
}