import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button  } from '@mui/material';

// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';
import { rejectUserRequest, approveUserRequest } from '../../../../../redux/slices/requestsCooperativa';
// redux
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------


export default function RequestsMoreMenu({ row }) {
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
              <Iconify icon={'mingcute:user-remove-fill'} sx={{ ...ICON }} />
              {t('invitesTable.reject')}
            </MenuItem>

            <MenuItem onClick={handleAcceptUserFromCooperative} sx={{ color: 'green' }} >
              <Iconify icon={'mingcute:user-add-fill'} sx={{ ...ICON }} />
              {t('invitesTable.acept')} 
            </MenuItem>
          </MenuPopover>

          <Dialog open={declineConfirmationOpen} onClose={handleCloseDeclineConfirmation}>
              <DialogTitle> {t('menuPopover.confirmDelete')}  </DialogTitle>
              <DialogContent> {t('menuPopover.confirmRemove')}{row.user.name} {row.user.lastname}{t('menuPopover.confirmRemove2')}</DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeclineConfirmation}>{tCommon('cancel')}</Button>
                <Button onClick={() => handleDecline(row)} color="error" autoFocus>
                  {t('invitesTable.reject')}
                </Button>
              </DialogActions>
          </Dialog>

          <Dialog open={acceptConfirmationOpen} onClose={handleCloseAcceptConfirmation}>
              <DialogTitle> {t('menuPopover.confirmAceppt')}  </DialogTitle>
              <DialogContent> {t('menuPopover.confirmAcepptText')}{row.user.name} {row.user.lastname}{t('menuPopover.confirmAcepptText2')}</DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAcceptConfirmation} color="error">{tCommon('cancel')}</Button>
                <Button onClick={() => handleAccept(row)}  autoFocus>
                  {t('invitesTable.acept')}
                </Button>
              </DialogActions>
          </Dialog>
    </>
  );
}

RequestsMoreMenu.propTypes = {
  row: PropTypes.object,
};
