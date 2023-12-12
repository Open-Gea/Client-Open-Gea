import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';
import { removeUserAccess, giveUserAccess, removeOrganizationAccess, giveOrganizationAccess } from '../../../../../redux/slices/systemUsers';
// redux
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------


export default function UserMoreMenu({ row }) {
  const { t } = useTranslation('users-management');
  const { t: tCommon } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  // Control the actions menu 
  const [removeConfirmationOpen, setRemoveConfirmationOpen] = useState(false);
  const [giveConfirmationOpen, setGiveConfirmationOpen] = useState(false);
  const handleOpen = event => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Remove Access
  const handleCloseRemoveConfirmation = () => {
    setRemoveConfirmationOpen(false);
    handleClose();
  };
  const handleRemoveUserAccess = async () => {
    setRemoveConfirmationOpen(true);
  };
  const handleDecline = async (row)  => {
    // Check if it is farmer or organization 
    if(row.name){
      // Organization
      await dispatch(removeOrganizationAccess({  id: row.id }));
    }else{
      // User
      await dispatch(removeUserAccess({  id: row.id }));
    }

    setRemoveConfirmationOpen(false);
    handleClose();
  };

  // Give Access
  const handleCloseGiveConfirmation = () => {
    setGiveConfirmationOpen(false);
    handleClose();
  };
  const handleGiveUserFromCooperative = async () => {
    setGiveConfirmationOpen(true);
  };
  const handleAccept = async (row)  => {
    // Check if it is farmer or organization 
    if(row.name){
      // Organization
      await dispatch(giveOrganizationAccess({  id: row.id }));
    }else{
      // User
      await dispatch(giveUserAccess({ id: row.id}));
    }
    setGiveConfirmationOpen(false);
    handleClose();
  };
  // --------------------------- 
  

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={40} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 0.8, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem  onClick={handleRemoveUserAccess}  sx={{ color: 'error.main' }}>
          <Iconify icon={'mdi:key-remove'} className="big-icon" px={{ ...ICON }} />
           &nbsp; {t('menuPopover.removeAccess')}
        </MenuItem>

        <MenuItem onClick={handleGiveUserFromCooperative} sx={{ color: 'green' }} >
          <Iconify icon={'mdi:key-add'} sx={{ ...ICON }} />
          {t('menuPopover.addAccess')}
        </MenuItem>
      </MenuPopover>

      <Dialog open={removeConfirmationOpen} onClose={handleCloseRemoveConfirmation} key={row.id+'-decline'}>
            <DialogTitle> {t('menuPopover.confirmAccessRemovalT')}  </DialogTitle>
            <DialogContent> {t('menuPopover.confirmAccessRemoval1')}{row.displayName} {row.lastName}{t('menuPopover.confirmAccessRemoval2')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRemoveConfirmation}>{tCommon('cancel')}</Button>
              <Button onClick={() => handleDecline(row)} color="error" autoFocus>
                {t('inputs.remove')}
              </Button>
            </DialogActions>
      </Dialog>

      <Dialog open={giveConfirmationOpen} onClose={handleCloseGiveConfirmation} key={row.id+'-accept'}>
            <DialogTitle> {t('menuPopover.confirmAccessT')}  </DialogTitle>
            <DialogContent> {t('menuPopover.confirmAccess1')}{row.displayName} {row.lastName}{t('menuPopover.confirmAccess2')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseGiveConfirmation} color="error">{tCommon('cancel')}</Button>
              <Button key={row.id+'-acceptButton'} onClick={() => handleAccept(row)}  autoFocus>
                {t('inputs.give')}
              </Button>
            </DialogActions>
        </Dialog>

    </>
  );
}

UserMoreMenu.propTypes = {
  row: PropTypes.object,
};
