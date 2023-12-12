import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SummaryDialog = ({ values, translationKey, open, handleClose, handleClearForm }) => {
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');

    const handleOkClick = () => {
        handleClose();
        handleClearForm();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{tCommon('successMessage')}</DialogTitle>
            <DialogContent>
                <Box>
                    {Object.entries(values).map(([key, value]) => (
                        <Typography variant="body1" key={key}>
                            <strong>{t(`${translationKey}.${key}`)}:</strong> {value}
                        </Typography>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOkClick}>
                    {t('ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SummaryDialog;
