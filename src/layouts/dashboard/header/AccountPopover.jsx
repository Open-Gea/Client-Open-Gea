// import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MenuPopover from '../../../components/utils/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate/IconButtonAnimate';
import { useDispatch, useSelector } from 'react-redux';
import { MyAvatar } from '../../../components/utils/MyAvatar';
import { setUserNull } from '../../../redux/slices/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
// Firebase

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export default function AccountPopover() {
  const { t } = useTranslation('navigation');
  const { user, cooperative, isCooperative } = useSelector(s => s.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const MENU_OPTIONS = [
    {
      label: t('actions.home'),
      linkTo: '/',
    },
    // {
    //   label: 'Profile',
    //   linkTo: PATH_DASHBOARD.user.profile,
    // },
    // {
    //   label: 'Settings',
    //   linkTo: PATH_DASHBOARD.user.account,
    // },
  ];

  const isMountedRef = useIsMountedRef();

  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const handleLogout = () => {
    try {
      navigate('/');
      dispatch(setUserNull());
      if (isMountedRef.current) {
       handleClose();
      }
      // Cleaning the data saved in the session
      //localStorage.clear();
      sessionStorage.clear()
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            { isCooperative ? cooperative?.name : user?.displayName }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            { isCooperative ? cooperative?.email : user?.email }
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map(option => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {t(('actions.logout'))}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
