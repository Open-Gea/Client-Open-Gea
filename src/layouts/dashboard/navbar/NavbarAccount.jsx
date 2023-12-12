import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

// components
import { MyAvatar } from '../../../components/utils/MyAvatar';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { t } = useTranslation('navigation');
  const { user, cooperative, isCooperative, isAdmin } = useSelector(s => s.authSlice);

  return (
    <Link underline="none" color="inherit" component={RouterLink} to={ ( isCooperative ? "/dashboard/main/cooperativeProfile"  : (isAdmin ?  "/dashboard/admin" :  "/dashboard/main/user-profile") )     }  >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: theme =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            { isCooperative ? cooperative?.name  :  user?.displayName     }
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            { (isCooperative ? t('roles.organization')  : (isAdmin ? t('roles.admin') : t('roles.default-role')) )    }
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
