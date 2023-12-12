import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

export const Modal = props => {
  const { title, openModal, component } = props;

  return (
    <Dialog open={openModal} maxWidth="lg">
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>{component}</DialogContent>
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  component: PropTypes.any,
};
