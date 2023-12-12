import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { handleHoverEnter, handleHoverLeave, handleToggleCollapse } from '../../../redux/slices/settings';

// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR } from '../header/config';
// components
import LogoSimplificado from '../../../assets/mainviewImg/LogoSimplificado.png';

import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import navConfigCooperative from './NavConfigCooperative';
import navConfigAdmin from './NavConfigAdmin';
import NavbarAccount from './NavbarAccount';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import CollapseButton from './CollapseButton';
// import CollapseButton from './CollapseButton';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { collapseClick, collapseHover } = useSelector(s => s.settings);
  const isCollapse = collapseClick && !collapseHover;

  const { isCooperative, isAdmin } = useSelector(state => state.authSlice);
  
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component="img" src={LogoSimplificado} sx={{ height: isCollapse ? 50 : 150, m: '0 auto' }} />
          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={() => dispatch(handleToggleCollapse())} collapseClick={collapseClick} />
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      <NavSectionVertical navConfig={ (isCooperative ? navConfigCooperative : (isAdmin ? navConfigAdmin : navConfig) ) } isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={() => {
            dispatch(handleHoverEnter());
          }}
          onMouseLeave={() => {
            dispatch(handleHoverLeave());
          }}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'solid',
              boxShadow: 10,
              bgcolor: 'background.default',
              transition: theme =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: theme => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
