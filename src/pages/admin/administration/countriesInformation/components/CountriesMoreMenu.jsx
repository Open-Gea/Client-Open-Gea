import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, IconButton, Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

// components
import Iconify from '../../../../../components/utils/Iconify';
import MenuPopover from '../../../../../components/utils/MenuPopover';
import AddEditCountryDialog from './AddEditCountryDialog';
// slice 
import { deleteCountry } from '../../../../../redux/slices/countriesAdmin';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------


export default function CountriesMoreMenu({ onDelete, countryInfo, officialCountries, countries }) {
  const { t } = useTranslation('countries');
  const { t: tCommon } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [declineConfirmationOpen, setDeclineConfirmationOpen] = useState(false);
  const dispatch = useDispatch();

  
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

  // Actions to reject request
  const handleCloseDeclineConfirmation = () => {
    setDeclineConfirmationOpen(false);
    handleClose();
  };
  const handleDeclineUserFromCooperative = async () => {
    setDeclineConfirmationOpen(true);
  };
  const handleDecline = async (countryInfo)  => {
    await dispatch(deleteCountry(countryInfo.id));
    setDeclineConfirmationOpen(false);
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
        <MenuItem onClick={handleDeclineUserFromCooperative} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {t('menuPopover.delete')}
        </MenuItem>

        {/* <MenuItem onClick={e => setOpenDialog(true)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {t('menuPopover.edit')}
        </MenuItem> */}
      </MenuPopover>

      <Dialog open={declineConfirmationOpen} onClose={handleCloseDeclineConfirmation} key={countryInfo.id+'-decline'}>
            <DialogTitle> {t('menuPopover.confirmDelCountry')}  </DialogTitle>
            <DialogContent> {t('menuPopover.confirmRemCountry')}{countryInfo.name}{t('menuPopover.confirmRem2Country')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeclineConfirmation}>{tCommon('cancel')}</Button>
              <Button onClick={() => handleDecline(countryInfo)} color="error" autoFocus>
                {t('menuPopover.delete')}
              </Button>
            </DialogActions>
        </Dialog>

      <AddEditCountryDialog open={openDialog} onClose={handleCloseDialog} title={t('menuPopover.title')} edit={true} countryInfo={countryInfo} countries={countries} officialCountries={officialCountries} />
    </>
  );
}

CountriesMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  countryInfo: PropTypes.object,
};
