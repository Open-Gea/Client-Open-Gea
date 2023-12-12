import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from '@mui/material';
import Iconify from './Iconify';
import { useDispatch } from 'react-redux';

const ITEM_HEIGHT = 48;

export default function FilterColumn({ handleFilter, param, translateGroup, allData }) {
  const { t } = useTranslation('records');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
    const target = e.target.innerText;
    const filtered = allData.filter(el => el[param] === target);
    if (target) dispatch(handleFilter({ filtered, param: t(translateGroup + param), paramValue: target }));
  };

  const options = allData.reduce((acc, curr) => {
    if (acc && !acc.find(el => el === curr[param])) return [...acc, curr[param]];
    else return acc;
  }, []);

  return (
    <>
      <Tooltip title={t(translateGroup + 'filterTooltip')}>
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
        {options.map(option => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
FilterColumn.propTypes = {
  param: PropTypes.string,
  handleFilter: PropTypes.func,
  userList: PropTypes.array,
  translateGroup: PropTypes.string,
  allData: PropTypes.array,
};
