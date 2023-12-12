import PropTypes from 'prop-types';
// MUI
import { Box } from '@mui/material/';
// leaflet
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// components
import locationIcon from '../../../../../../../../assets/location.png';

const customIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
});

export default function MapViewSimple({ lat, lng, name, owner, country }) {
  return (
    <div>
      <Box
        component={MapContainer}
        center={{ lat, lng }}
        sx={{
          width: { xs: '35vh', md: '55vh' },
          height: { xs: '35vh', md: '42vh' },
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
            {`Propietario:  ${owner}`}
            <br />
            <br />
            {`Finca:  ${name}`}
            <br />
            <br />
            {`País:  ${country}`}
          </Popup>
        </Marker>
      </Box>
    </div>
  );
}
MapViewSimple.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
  owner: PropTypes.string,
  country: PropTypes.string,
};
