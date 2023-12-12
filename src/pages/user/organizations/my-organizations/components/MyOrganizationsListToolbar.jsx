import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { 
  Toolbar, 
  InputAdornment, 
  Stack
} from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import InputStyle from '../../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName } from '../../../../../redux/slices/organizationsUser';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

MyOrganizationsListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function MyOrganizationsListToolbar() {
  const { t } = useTranslation('invites');
  const { filterName } = useSelector(s => s.organizationsUserSlice);
  const dispatch = useDispatch();

  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>

        <InputStyle
          labelId="search-organization"
          stretchStart={300}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('inputs.searchCooperative2')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </RootStyle>
  );
}

MyOrganizationsListToolbar.propTypes ={
  handleStateChange: PropTypes.func,
  stateRequests: PropTypes.string,
}
