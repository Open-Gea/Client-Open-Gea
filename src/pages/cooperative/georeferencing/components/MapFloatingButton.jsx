import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Fab } from '@mui/material';
import LocationOnOutlinedIcon  from '@mui/icons-material/AddLocation';
// react-leaflet
import { Marker, Popup, useMap } from 'react-leaflet';
import locationIcon from '../../../../assets/location.png';
import { useSnackbar } from 'notistack';

const customIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 41],
  iconAnchor: [12, 41],

});
export default function MapFloattingButton({ position, setPosition, visible, setVisible, openDialog, setCurrentPosition, edit }) {
  const { t } = useTranslation('farms');
  const leafLetMap = useMap();
  const markerRef = useRef(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    leafLetMap.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      leafLetMap.flyTo(e.latlng, 15);
    });
  };
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  useEffect(() => {
    leafLetMap.locate().on('locationfound', function (e) {
      setLocationPermission(true);
      if (!edit) {
        setPosition(e.latlng);
        leafLetMap.flyTo(e.latlng, 7);
      }
      setCurrentPosition(e.latlng);
      setVisible(true);
    });

    leafLetMap.on('locationerror', function (e) {
      setLocationPermission(false);
      setCurrentPosition(e.latlng);
      setVisible(true);
    });
  }, [openDialog]);

  useEffect(() => {
    if (locationPermission === false) {
      enqueueSnackbar(t('validations.noLocationSummary'), { variant: 'error' });
    }
  }, [locationPermission]);

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { m: 1 },
          bottom: 5,
          position: 'absolute',
          right: 5,
        }}
      >
        {locationPermission && (
          <Fab color="primary" aria-label="location" onClick={handleClick}>
            <LocationOnOutlinedIcon />
          </Fab>
        )}
      </Box>
      {visible && (
        <Marker position={position} draggable ref={markerRef} eventHandlers={eventHandlers} icon={customIcon}>
          <Popup>{`${position.lat},${position.lng}`}</Popup>
        </Marker>
      )}
    </>
  );
}
MapFloattingButton.propTypes = {
  position: PropTypes.object,
  setPosition: PropTypes.func,
  setCurrentPosition: PropTypes.func,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  openDialog: PropTypes.bool,
  edit: PropTypes.bool,
};
