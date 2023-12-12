import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHhResults } from '../../../../redux/slices/huellaCarbono';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function HhDialog() {
  const { t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { hhResults } = useSelector(s => s.huellaCarbonoSlice);
  const handleClose = () => {
    dispatch(setHhResults({ isOpen: false }));
  };
  console.log("hh results: " ,hhResults);
  return (
    <>
      <Dialog
        open={hhResults.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${t('dialogs.calcResultTitle')}: `}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={4}>
            <Stack>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                <b>{t('dialogs.calcResultTitle')}: </b>
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle" sx={{ pl: 1 }} color="text.secondary">
                {hhResults.data.result} 
              </Typography>
  
            </Stack>
          </Stack>
        </DialogContent>
        <Button sx={{ mb: 1 }} onClick={handleClose}>
          {tCommon('close')}
        </Button>
      </Dialog>
    </>
  );
}
