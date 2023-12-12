import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button  } from '@mui/material';

// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';
import { deleteCooperativeInvite } from '../../../../../redux/slices/invitesCooperativa';
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
    mr: -3,
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
    await dispatch(deleteCooperativeInvite(row.id));
    setDeclineConfirmationOpen(false);
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
              <Iconify icon={'typcn:delete'} sx={{ ...ICON }} />
              &nbsp; &nbsp; &nbsp;   {t('invitesTable.deleteInvite')}
            </MenuItem>

          </MenuPopover>

          <Dialog open={declineConfirmationOpen} onClose={handleCloseDeclineConfirmation}>
              <DialogTitle> {t('menuPopover.confirmDelRequest')}  </DialogTitle>
              <DialogContent> {t('menuPopover.confirmRemRequest')}{row.user.name} {row.user.lastname}{t('menuPopover.confirmRem2Request')}</DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeclineConfirmation}>{tCommon('cancel')}</Button>
                <Button onClick={() => handleDecline(row)} color="error" autoFocus>
                  {t('invitesTable.deleteInvite')}
                </Button>
              </DialogActions>
          </Dialog>

    </>
  );
}

InvitesMoreMenu.propTypes = {
  row: PropTypes.object,
};
