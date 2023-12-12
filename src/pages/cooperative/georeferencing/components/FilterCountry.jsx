import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from '@mui/material';
import Iconify from '../../../../components/utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';

// Countries
import { getCountriesList } from '../../../../utils/getCountries';

const ITEM_HEIGHT = 48;

export default function FilterCountry({ setFilteredFarms }) {
  const { t } = useTranslation('farms');
  const [anchorEl, setAnchorEl] = useState(null);
  const { farms } = useSelector(s => s.farmsCooperativaSlice);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  // Required for loading countries list
  const [countries, setCountries] = useState(null);

  useEffect(() => {

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

  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
    const param = e.target.innerText;
    const filtered = farms.filter(el => el.country === param);
    if (param) dispatch(setFilteredFarms({ list: filtered, param }));
  };

  return (
    <>
      <Tooltip title={t('inputs.filterTooltip')}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {countries?.map(country => (
          <MenuItem key={country?.id} selected={country === 'Pyxis'} onClick={handleClose}>
            {country?.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
FilterCountry.propTypes = {
  setFilteredFarms: PropTypes.func,
  userList: PropTypes.array,
};
