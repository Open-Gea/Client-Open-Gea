import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHhResults } from '../../../../../redux/slices/evotranspiracionCooperativa';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function HhDialog() {
  const dispatch = useDispatch();
  const { hhResults } = useSelector(s => s.evotranspiracionCooperativaSlice);

  const handleClose = () => {
    dispatch(setHhResults({ isOpen: false }));
  };

  return (
    <>
      <Dialog
        open={hhResults.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Resultado del calculo: '}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={4}>
            <Stack>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                <b>Huella Hídrica Total: </b>
              </Typography>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                <b>Huella Hídrica Verde: </b>
              </Typography>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                <b>Huella Hídrica Azul: </b>
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                {hhResults.data.hh_total} m3/ton
              </Typography>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                {hhResults.data.hh_green} m3/ton
              </Typography>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                {hhResults.data.hh_blue} m3/ton
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <Button sx={{ mb: 1 }} onClick={handleClose}>
          ok!
        </Button>
      </Dialog>
    </>
  );
}
