import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, IconButton } from '@mui/material';

// components
import Iconify from '../../../../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../../../../components/utils/MenuPopover';
import AddEditLots from './AddEditLot';

// Translation module
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function LotsMoreMenu({ onDelete, lotInfo }) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Added the translation for the tittle and other translations
  const { t } = useTranslation('records');

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
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
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
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {t('farmsRegisterInputs.delete')}
        </MenuItem>

        <MenuItem onClick={e => setOpenDialog(true)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {t('farmsRegisterInputs.edit')}
        </MenuItem>
      </MenuPopover>
      <AddEditLots
        open={openDialog}
        onClose={handleCloseDialog}
        title={t('farmsRegisterInputs.editLot')}
        edit={true}
        lotInfo = {lotInfo}
        t={t}
      />
    </>
  );
}

LotsMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  farmInfo: PropTypes.object,
  lotId: PropTypes.string
};
