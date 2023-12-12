import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// @mui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import HelpIcon from '@mui/icons-material/HelpOutline';
// components
import { IconButtonAnimate } from '../../../components/animate/IconButtonAnimate';
import { getModuleHelpInfo } from '../../../utils/getModuleHelpInfo';

export default function AboutButton() {

  const { t } = useTranslation(['common']);

  const navigation = useLocation();
  const descriptionElementRef = useRef(null);

  const pathName = useMemo(
    // reads third and fourth param here: (e.g. /dashboard/[main]/[weather-forecast]).
    () => `${navigation.pathname.split('/')[2] ?? null}/${navigation.pathname.split('/')[3] ?? null}`,
    [navigation.pathname]
  );

  // returns help/about data. { available: boolean, helpElement: JSX.Element }
  const moduleInfo = useMemo(() => getModuleHelpInfo(pathName), [navigation.pathname]);

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      {moduleInfo?.available && (
        <>
          <IconButtonAnimate onClick={handleModalOpen} sx={{ p: 0 }}>
            <HelpIcon />
          </IconButtonAnimate>
          <Dialog
            open={isOpen}
            scroll="paper"
            maxWidth="md"
            onClose={handleModalClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{t('about')}</DialogTitle>
            <DialogContent>
              <Box variant="span" id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                {moduleInfo?.helpElement}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>{t('close')}</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
