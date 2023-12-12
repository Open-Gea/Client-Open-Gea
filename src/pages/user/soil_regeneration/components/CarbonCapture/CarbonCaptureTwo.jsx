import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//  import { Loading1 } from '../../page/Loading1';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Green_Check_Mark_PNG_small from '../../../../../assets/video/soil_regeneration/Green_Check_Mark_PNG_small.png';
import Rectangle_137 from '../../../../../assets/video/soil_regeneration/Rectangle_137.png';


// Translation module
import { useTranslation } from 'react-i18next';

export const CarbonCaptureTwo = ({ setLink, setCurrentTab }) => {
    const [value, setValue] = useState('');
    /*  esto del cookies se puede comentar e ignorar por el momento */
    useEffect(() => {
        const cookieValue = Cookies.get('miCookie');
        setValue(cookieValue);
    }, []);
    const handleCookie = () => {
        // para borrar la cookie
        Cookies.remove('miCookie');
    }
    const [error, setError] = React.useState(false);
    const handleRadioChange = (event) => {
        setValue(event.target.value);

        setError(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (value === 'best') {
            setError(false);
        } else {
            setError(true);
        }
    };
    const handleAnswer = (event) => {
        if (value === 'best') {
            /*  setLink({
                sensitizationOne: true,
                sensitizationTwo: false,
                carbonCaptureOne: false,
                carbonCaptureTwo: false,
            })  */
            handleClickOpen()


        } else {
            handleClickOpen2()

        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    // Added the translation for the title and other translations 
    const { t } = useTranslation('soil-regeneration');


    return (
        <>
            <div id='boxSoil_Regeneration_two'>
                <div id='boxSoil_Regeneration_tex2'>
                    <h1 id='boxSoil_Regeneration_text_tittle'>{t('carbonQuestionAnswers1.question')}</h1>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 3 }} error={error} variant="standard">
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={value}
                                onChange={handleRadioChange}>
                                <FormControlLabel value="best" control={<Radio />} label={t('carbonQuestionAnswers1.answer1')} />
                                <br></br>
                                <FormControlLabel value="wrong" control={<Radio />} label={t('carbonQuestionAnswers1.answer2')} />
                                <br></br>
                                <FormControlLabel value="wrong2" control={<Radio />} label={t('carbonQuestionAnswers1.answer3')} />
                            </RadioGroup>
                        </FormControl>

                        <Grid container item xs={12} justifyContent="space-between">
                            <Grid item>
                                <button
                                    className="ButtonFirst"
                                    onClick={() =>
                                        setLink({
                                            carbonCaptureOne: true
                                        })
                                    }
                                >
                                    {t('buttons.back')}
                                </button>
                            </Grid>

                            <Grid item>
                            <Button sx={{ mt: 1, mr: 1 }} type='button' className='ButtonFirst' onClick={handleAnswer}>
                                        {t('buttons.continue')}
                                    </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
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
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                                <div id='#boxSoil_Regeneration_ImageBox'>
                                    <img src={Green_Check_Mark_PNG_small}></img>
                                </div>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={8}>
                                <Button className="ButtonFirst"
                                    onClick={(e) =>{
                                            setLink({
                                                soilVocationOne: true,
                                            })
                                            setCurrentTab(e,2)
                                        }
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
                open={open2}
                onClose={handleClose2}
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
                                <h3>    {t('carbonQuestionAnswers1.warningMessage')} </h3>
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={5}>
                                <Button className="ButtonFirst"
                                    onClick={(e) =>{
                                            setLink({
                                                sensitizationOne: false,
                                                sensitizationTwo: true,
                                                carbonCaptureOne: false,
                                                carbonCaptureTwo: false,
                                            })
                                            
                                        }
                                    }
                                >
                                    {t('buttons.watch')}
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button className="ButtonFirst"
                                    onClick={(e) =>{
                                        setLink({

                                            soilVocationOne: true,
                                        })
                                        setCurrentTab(e,2);
                                    }
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