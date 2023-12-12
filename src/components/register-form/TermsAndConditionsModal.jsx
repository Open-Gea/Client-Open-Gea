import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography } from '@mui/material';
import ShowPdf from '../showPdf/ShowPdf';

const pdfUrl = '/assets/docs/terms_and_conditions.pdf';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TermsAndConditionsModal({ isOpen, setIsOpen, onModalClose, oldUser = false }) {
  const handleRejection = () => {
    // closes modal
    setIsOpen(false);
    // user rejected terms, returns 'false' on the callback.
    onModalClose(false);
  };

  const handleAccepted = () => {
    // closes modal
    setIsOpen(false);
    // user accepted terms, returns 'true' on the callback.
    onModalClose(true);
  };

  return (
    <Dialog maxWidth="lg" fullWidth open={isOpen} TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description">
      <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>Términos y condiciones</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12}>
            {/* This condition will only show up when the user is an old YvY user. */}
            {oldUser ? (
              <Typography>Bienvenido(a) a la nueva versión de YvY. Hemos actualizado nuestros términos y condiciones, para poder utilizar el sistema, debe aceptarlos.</Typography>
            ) : (
              <Typography>Por favor, lea con detenimiento los siguientes términos y condiciones:</Typography>
            )}
            <ShowPdf pdfUrl={pdfUrl} scale={1.5} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleRejection}>
          Rechazar
        </Button>
        <Button variant="contained" onClick={handleAccepted}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TermsAndConditionsModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  oldUser: PropTypes.bool,
};
