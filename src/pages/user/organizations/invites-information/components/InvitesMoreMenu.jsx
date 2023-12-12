import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button  } from '@mui/material';

// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';
import { rejectUserRequest, approveUserRequest } from '../../../../../redux/slices/invitesUser';
// redux
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------


export default function InvitesMoreMenu({ row }) {
  const { t } = useTranslation('invites');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();


  // Control the actions button
  const [open, setOpen] = useState(false);
  const [declineConfirmationOpen, setDeclineConfirmationOpen] = useState(false);
  const [acceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const handleOpen = event => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  // Actions to reject request
  const handleCloseDeclineConfirmation = () => {
    setDeclineConfirmationOpen(false);
    handleClose();
  };
  const handleDeclineUserFromCooperative = async () => {
    setDeclineConfirmationOpen(true);
  };
  const handleDecline = async (row)  => {
    // Putting the new state 
    const dataToUpdate= {
      "data": {
          "status": "REJECTED"
      }
    }
    await dispatch(rejectUserRequest({ data: dataToUpdate, id: row.id }));
    setDeclineConfirmationOpen(false);
    handleClose();
  };
  // ---------------------------

  // Actions to approve request 
  const handleCloseAcceptConfirmation = () => {
    setAcceptConfirmationOpen(false);
    handleClose();
  };
  const handleAcceptUserFromCooperative = async () => {
    setAcceptConfirmationOpen(true);
  };
  const handleAccept = async (row)  => {
    // Putting the new state 
    const dataToUpdate= {
      "data": {
          "status": "APPROVED"
      }
    }
    await dispatch(approveUserRequest({ data: dataToUpdate, id: row.id, requestInfo: row }));
    setAcceptConfirmationOpen(false);
    handleClose();
  };
  // ---------------------------
  

  return (
    <>
       <IconButton onClick={handleOpen} disabled={(t('inputs.'+row.status))[0].toLowerCase() === 'a' }>
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} color="#00AB55" />
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
            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          }}
        >
          <MenuItem onClick={handleDeclineUserFromCooperative} sx={{ color: 'error.main' }}>
            <Iconify icon={'mdi:home-group-remove'} sx={{ ...ICON }} />
            {t('invitesTable.reject')}
          </MenuItem>

          <MenuItem onClick={handleAcceptUserFromCooperative} sx={{ color: 'green' }} >
            <Iconify icon={'mdi:home-group-add'} sx={{ ...ICON }} />
            {t('invitesTable.acept')} 
          </MenuItem>
        </MenuPopover>

        <Dialog open={declineConfirmationOpen} onClose={handleCloseDeclineConfirmation} key={row.id+'-decline'}>
            <DialogTitle> {t('menuPopover.confirmDeleteInvite')}  </DialogTitle>
            <DialogContent> {t('menuPopover.confirmRemoveInvite')}{row.coop.name}{t('menuPopover.confirmRemove2Invite')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeclineConfirmation}>{tCommon('cancel')}</Button>
              <Button onClick={() => handleDecline(row)} color="error" autoFocus>
                {t('invitesTable.reject')}
              </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={acceptConfirmationOpen} onClose={handleCloseAcceptConfirmation} key={row.id+'-accept'}>
            <DialogTitle> {t('menuPopover.confirmAcepptInvite')}  </DialogTitle>
            <DialogContent> {t('menuPopover.confirmAcepptTextInvite')}{row.coop.name}{t('menuPopover.confirmAcepptText2Invite')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAcceptConfirmation} color="error">{tCommon('cancel')}</Button>
              <Button key={row.id+'-acceptButton'} onClick={() => handleAccept(row)}  autoFocus>
                {t('invitesTable.acept')}
              </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

InvitesMoreMenu.propTypes = {
  row: PropTypes.object,
};
