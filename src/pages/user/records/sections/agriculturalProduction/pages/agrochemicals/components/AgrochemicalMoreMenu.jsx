import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, IconButton } from '@mui/material';

// components
import Iconify from '../../../../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../../../../components/utils/MenuPopover';

// Translation module
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddEditAgrochemical from './AddEditAgrochemical';

// ----------------------------------------------------------------------

export default function AgrochemicalMoreMenu({ onDelete, editInfo }) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { agrochemical } = useSelector(s => s.recordsSlice);

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

        <MenuItem onClick={() => setOpenDialog(true)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {t('farmsRegisterInputs.edit')}
        </MenuItem>
      </MenuPopover>
      <AddEditAgrochemical
        open={openDialog}
        onClose={() => handleCloseDialog()}
        edit={true}
        editInfo={editInfo}
      />
    </>
  );
}

AgrochemicalMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  editInfo: PropTypes.object,
};
