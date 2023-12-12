import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMap } from 'react-leaflet';
import { useState } from 'react';

const SearchByLatLng = ({ setVisible, setPosition }) => {
  const { t: tCommon } = useTranslation('common');
  const [input, setInput] = useState({ lat: '', lng: '' });
  const map = useMap();
  const handleSearchLatLng = e => {
    e.preventDefault();
    if (input.lat && input.lng) {
      setPosition(input);
      setInput({ lat: '', lng: '' });
      map.flyTo(input, 13);
    }
  };
  return (
    <Stack sx={{ position: 'absolute', top: 2, right: { xs: 1, md: '5%' }, zIndex: 1000, fontSize: '2px' }} direction="row" spacing={1}>
      <TextField
        label={tCommon('coordinates.latitude')}
        sx={{ width: 90, bgcolor: '#fff', borderRadius: 1 }}
        inputProps={{ style: { fontSize: '.8rem', color: '#000' } }}
        variant="filled"
        size="small"
        type="number"
        value={input.lat}
        onClick={e => {
          setVisible(false);
          setPosition({ lat: '', lng: '' });
        }}
        onChange={e => setInput({ ...input, lat: e.target.value })}
      />
      <TextField
        label={tCommon('coordinates.longitude')}
        sx={{ width: 90, bgcolor: '#fff', borderRadius: 1 }}
        inputProps={{ style: { fontSize: '.8rem', color: '#000' } }}
        variant="filled"
        size="small"
        type="number"
        value={input.lng}
        onClick={e => {
          setVisible(false);
          setPosition({ lat: '', lng: '' });
        }}
        onChange={e => setInput({ ...input, lng: e.target.value })}
      />
      <IconButton sx={{ bgcolor: 'lightgrey' }} onClick={handleSearchLatLng}>
        <SearchOutlinedIcon />
      </IconButton>
    </Stack>
  );
};
SearchByLatLng.propTypes = {
  setVisible: PropTypes.func,
  setPosition: PropTypes.func,
};

export default SearchByLatLng;
