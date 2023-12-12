import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ConfirmationDialog({ open, onClose, onConfirm, actionName, notes }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas realizar la acción "{actionName}"? Esta acción es irreversible.
        </DialogContentText>
        {notes && 
        <DialogContentText sx={{py: '10px'}} fontStyle={'oblique'}>
          Nota: {notes}
        </DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
