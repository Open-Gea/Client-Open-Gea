import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Chip, Typography, Box, Divider } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LotsNotesDialog({ notes, lotName, t }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!notes) {
    return <Chip label="no" />;
  }

  return (
    <div>
      <Chip variant="outlined" onClick={handleClickOpen} clickable label={t('farmsRegisterInputs.check')} />

      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography sx={{ fontWeight: 600 }}>
            <Box component="span" color="info" sx={{ fontStyle: 'italic' }}>
              {t('farmsRegisterInputs.lot')}
            </Box>{' '}
            {lotName}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent dividers>
          <pre style={{ fontFamily: 'inherit' }}>{notes}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> {t('farmsRegisterInputs.close')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
LotsNotesDialog.propTypes = {
  notes: PropTypes.string,
  lotName: PropTypes.string,
  t: PropTypes.func,
};
