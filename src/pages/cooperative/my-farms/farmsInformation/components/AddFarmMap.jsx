import PropTypes from 'prop-types';
import { useState } from 'react';
// react-leaflet
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
// MUI
import { Box } from '@mui/material';
import MapFloattingButton from './MapFloatingButton';
import SearchByLatLng from './SearchByLatLng';

export default function AddFarmMap({ position, setPosition, openDialog, setCurrentPosition, edit }) {
  const [visible, setVisible] = useState(null);

  const ClickMapComponent = () => {
    useMapEvents({
      click: e => {
        setPosition(e.latlng);
        setVisible(true);
      },
    });

    return null;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component={MapContainer}
        center={edit ? position : { lat: -17.3822, lng: -66.1518 }}
        zoom={edit ? 11 : 3.5}
        scrollWheelZoom={true}
        sx={{
          width: { xs: '48vh', md: '70vh', xl: '60vh' },
          height: { xs: '50vh', md: '60vh' },
          m: '0 auto',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFloattingButton
          position={position}
          setPosition={setPosition}
          setCurrentPosition={setCurrentPosition}
          visible={visible}
          setVisible={setVisible}
          openDialog={openDialog}
          edit={edit}
        />
        <SearchByLatLng position={position} setPosition={setPosition} setVisible={setVisible} />
        <ClickMapComponent />
      </Box>
    </Box>
  );
}
AddFarmMap.propTypes = {
  position: PropTypes.object,
  setPosition: PropTypes.func,
  setCurrentPosition: PropTypes.func,
  openDialog: PropTypes.bool,
  edit: PropTypes.bool,
};
