import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from '@mui/material/';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import locationIcon from '../../../../../assets/location.png';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const customIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 41],
  iconAnchor: [12, 41],

});

export default function MapViewDialog({ lat, lng, name, owner, country }) {
  const { t } = useTranslation('farms');
  const { t: tCommon } = useTranslation('common');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <LocationOnIcon />
        {tCommon('open')}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t('farmDetails.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>{t('farmDetails.farmLabel')}:</b> {name?.toUpperCase()}, <b>{t('farmDetails.ownerLabel')}:</b> {owner}, <b>{t('farmDetails.countryLabel')}:</b>
            {country}
          </DialogContentText>
        </DialogContent>
        <Box
          component={MapContainer}
          center={{ lat, lng }}
          sx={{
            width: { xs: '48vh', md: '70vh' },
            height: { xs: '50vh', md: '60vh' },
            m: '0 auto',
          }}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat, lng }} icon={customIcon} className="custom-icon">
            <Popup>
              {`${t('farmDetails.ownerLabel')}:  ${owner}`}
              <br />
              <br />
              {`${t('farmDetails.farmLabel')}:  ${name}`}
              <br />
              <br />
              {`${t('farmDetails.countryLabel')}:  ${country}`}
            </Popup>
          </Marker>
        </Box>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField label={tCommon('coordinates.latitude')} value={lat} disabled variant="standard" />
          <TextField label={tCommon('coordinates.longitude')}  value={lng} disabled variant="standard" />
          <Button onClick={handleClose}>{tCommon('close')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
MapViewDialog.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
  owner: PropTypes.string,
  country: PropTypes.string,
};
