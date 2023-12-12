import React, { useEffect, useState } from 'react';

import { Grid, Box, ButtonGroup, } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Green_Check_Mark_PNG_small from '../../../../../assets/video/soil_regeneration/Green_Check_Mark_PNG_small.png';
import Rectangle_137 from '../../../../../assets/video/soil_regeneration/Rectangle_137.png';
import Captura_Carbono from '../../../../../assets/video/soil_regeneration/Captura_Carbono.png';
// Translation module
import { useTranslation } from 'react-i18next';


const useDialog = (initialState) => {
    const [open, setOpen] = useState(initialState);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { open, handleClickOpen, handleClose };
};

export const SoilVocationOne = ({ setLink }) => {

    const dialog1 = useDialog(false);
    const dialog2 = useDialog(false);



    // Added for the translations
    const { t } = useTranslation('soil-regeneration');


    return (
        <>
            <div id='boxSoil_Regeneration'>
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_tex1' >
                                {t('messagesWithTitles.soilVocationMessage')}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_colorBox'>

                                <div id='boxSoil_Regeneration_ImageBox'><h1>{t('messagesWithTitles.soilVocationTitle')} </h1><img src={Captura_Carbono} /></div>
                            </div>
                        </Grid>
                        <Grid container item xs={12} justifyContent="space-between">
                            <Grid item>
                                <button
                                    className="ButtonFirst"
                                    onClick={dialog2.handleClickOpen}
                                >
                                    {t('buttons.no')}
                                </button>
                            </Grid>

                            <Grid item>
                                <button
                                    className="ButtonFirst"
                                    onClick={dialog1.handleClickOpen}
                                >
                                    {t('buttons.yes')}
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

            </div>
            <Dialog
                open={dialog1.open}
                onClose={dialog1.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div id='boxSoil_Regeneration_ImageBox'>
                                    <img src={Green_Check_Mark_PNG_small}></img>
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <p>{t('messagesWithTitles.soilVocationMessage2')} </p>

                            </Grid>
                            <Grid item xs={12}>
                                <h5>{t('messagesWithTitles.soilVocationRequest')}</h5>

                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        columnSpacing: 1,
                                        alignItems: 'start',
                                        '& > *': {
                                            m: 0.1,
                                        },
                                    }}
                                >
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button size="small" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.agricole')}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button size="small" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.livestock')}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button size="small" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.agroforestry')}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button size="small" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.forestry')}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button size="small" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.conservation')}</Button>
                                    </ButtonGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={4.5}>

                            </Grid>
                            <Grid item xs={7.5}>
                                <Button className="ButtonFirst"
                                    onClick={() =>
                                        setLink({
                                            sensitizationOne: false,
                                            sensitizationTwo: false,
                                            carbonCaptureOne: false,
                                            carbonCaptureTwo: false,
                                            carbonCaptureTree: false,
                                            soilVocationOne: false,
                                            soilIndicatorOne: true,

                                        })
                                    }>
                                    {t('buttons.next')}
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog
               open={dialog2.open}
                onClose={dialog2.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">


                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={8}>
                                <img src={Rectangle_137}></img>
                            </Grid>
                            <Grid item xs={12}>
                                <h3> {t('messagesWithTitles.soilVocationMessage3')}</h3>
                            </Grid>

                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={8}>
                                <Button className="ButtonFirst"
                                    onClick={() =>
                                        setLink({
                            
                                            soilVocationTwo: true,
                                        })
                                    }>
                                    {t('buttons.next')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>


        </>
    );
};
