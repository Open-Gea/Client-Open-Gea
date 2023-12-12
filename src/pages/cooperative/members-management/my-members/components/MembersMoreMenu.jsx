import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';

// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';

// Required for the Dialog with details to function correctly
import ShowDetailsDialog from './ShowDetailsDialog';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromCooperative } from '../../../../../redux/slices/membersCooperativa';

// ----------------------------------------------------------------------


export default function UserMoreMenu({ row, user }) {
  const { t } = useTranslation('members-management');
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { cooperative } = useSelector(s => s.authSlice);



  /* Required for the delete dialog to work */
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    handleClose();
  };
  const handleRemoveUserFromCooperative = async () => {
    setSelectedUser(row);
    setDeleteConfirmationOpen(true);
  };
  const handleDelete = async ()  => {
    await dispatch(removeUserFromCooperative(row.user_coopId));
    setDeleteConfirmationOpen(false);
    handleClose();
  };
  
  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} color="white" />
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
        <MenuItem onClick={handleRemoveUserFromCooperative} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {t('buttons.delete')}
        </MenuItem>

        <MenuItem >
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {<ShowDetailsDialog user={user} closeMoreMenu={handleClose}  />}
        </MenuItem>
      </MenuPopover>
      
      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
            <DialogTitle> {t('messages.confirmDelete')}  </DialogTitle>
            <DialogContent> {t('messages.confirmRemove')}{row.displayName} {row.lastName}{t('messages.confirmRemove2')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirmation}>{tCommon('cancel')}</Button>
              <Button onClick={() => handleDelete(selectedUser)} color="error" autoFocus>
                {tCommon('delete')}
              </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  farmInfo: PropTypes.object,
  user: PropTypes.object,
  row: PropTypes.object,
};
