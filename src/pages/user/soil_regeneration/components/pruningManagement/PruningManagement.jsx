import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio, Grid, RadioGroup, FormControlLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card, Box } from '@mui/material';

export function PruningManagement({ setLink, setCurrentTab }) {
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const options = [
        { value: 'burn', label: t('pruningManagement.options.burn'), message: t('pruningManagement.messages.burn') },
        { value: 'trash', label: t('pruningManagement.options.trash'), message: t('pruningManagement.messages.trash') },
        { value: 'chipped', label: t('pruningManagement.options.chipped'), message: t('pruningManagement.messages.chipped') },
        { value: 'composted', label: t('pruningManagement.options.composted'), message: t('pruningManagement.messages.composted') },
    ];

    const handleChange = (event) => {
        const option = options.find(op => op.value === event.target.value);
        setSelectedOption(option.label);
        setAlertMessage(option.message);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <><Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Grid item xs={12}>
                <Card style={{ padding: '20px' }}>
                    <h3>{t('pruningManagement.title')}</h3>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="options" name="options" onChange={handleChange}>
                            {options.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label} />
                            ))}
                        </RadioGroup>


                    </FormControl>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{`${t('pruningManagement.dialogTitle')}${selectedOption}`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {alertMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                {t('pruningManagement.closeButton')}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>
            </Grid>
        </Box>
            <Box display="flex" justifyContent="space-between">
                <Grid item xs={6}>
                    <Button className="ButtonFirst"
                        onClick={(e) => {
                            setLink({
                                sensitizationOne: false,
                                sensitizationTwo: false,
                                carbonCaptureOne: false,
                                carbonCaptureTwo: false,
                                carbonCaptureTree: false,
                                soilVocationOne: false,
                                FertilizationForm: true,
                            })
                            setCurrentTab(e,4)
                        }
                        }>
                        {tCommon('back')}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className="ButtonFirst"
                        onClick={() => setLink({
                            sensitizationOne: false,
                            sensitizationTwo: false,
                            carbonCaptureOne: false,
                            carbonCaptureTwo: false,
                            carbonCaptureTree: false,
                            soilVocationOne: false,
                            FertilizationForm: false,
                            PruningManagementForm:true,
                        })}>
                        {tCommon('continue')}
                    </Button>
                </Grid>
            </Box>


        </>



    );
}
