import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Toolbar, InputAdornment, Button, Stack, Box } from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import InputStyle from '../../../../../components/utils/InputStyle';
// redux
import { useDispatch, useSelector } from 'react-redux';
// action
import { handleFilterByName } from '../../../../../redux/slices/membersCooperativa'
import { useState } from 'react';
import AddMemberDialog from './AddMemberDialog';
// Adding for the users field
import { getUsersByCooperative } from '../utils/getMembers';




// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));

// ----------------------------------------------------------------------

MembersToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function MembersToolbar() {
  const { t } = useTranslation('members-management');
  const { filterName } = useSelector(s => s.membersCooperativaSlice);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cooperative } = useSelector(state => state.authSlice);


  const handleClickOpen = () => {
    // Loading the available users list
    dispatch(getUsersByCooperative(cooperative.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <RootStyle>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          <AddIcon /> {t('buttons.registerMember')}
        </Button>
        <Box>
          <AddMemberDialog open={open} onClose={handleClose} title={t('title2')} edit={false} />
          
        </Box>

        <InputStyle
          stretchStart={300}
          value={filterName}
          onChange={event => dispatch(handleFilterByName(event.target.value))}
          placeholder={t('buttons.searchMember')}
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
