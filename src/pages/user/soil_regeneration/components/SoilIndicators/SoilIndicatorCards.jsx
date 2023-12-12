import React, { useEffect, useState } from 'react';
import { Grid, FormControl, FormControlLabel, RadioGroup, Radio, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';

import Green_Check_Mark_PNG_small from '../../../../../assets/video/soil_regeneration/Green_Check_Mark_PNG_small.png';
import Rectangle_137 from '../../../../../assets/video/soil_regeneration/Rectangle_137.png';

import { useTranslation } from 'react-i18next';

export const SoilIndicatorCards = ({ titulo, imagen, descripcion, descripcion2, imagen2, additionalQuestion, inverseImageSrc }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [openDialogs, setOpenDialogs] = useState({ dialog1: false, dialog2: false });
    const [selectedValueAdditional, setSelectedValueAdditional] = useState('');

    const { t } = useTranslation('soil-regeneration');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRadioChangeAdditional = (event) => {
        setSelectedValueAdditional(event.target.value);
    };

    const handleDialog = (dialogNum, state) => {
        setOpenDialogs({ ...openDialogs, [dialogNum]: state });
    };

    const DialogBox = ({ isOpen, closeHandler, imageSrc, description }) => (

        <Dialog
            open={isOpen}
            onClose={closeHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle id="alert-dialog-title" />
            <DialogContent>
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {additionalQuestion.question && selectedValue === 'si' && (
                            <>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_text_tittle'>
                                        <p>{additionalQuestion.question}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl margin='none' sx={{ m: 1 }}>
                                        <RadioGroup
                                            aria-label="additional-question-radio-buttons-group"
                                            name="additional-question-radio-buttons-group"
                                            value={selectedValueAdditional}
                                            onChange={handleRadioChangeAdditional}
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label={t('buttons.yes')}
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio />}
                                                label={t('buttons.no')}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {selectedValueAdditional && (
                                    <Grid item xs={12}>
                                        <div id='boxSoil_Regeneration_text_tittle'>
                                            <p>
                                                {selectedValueAdditional === 'yes'
                                                    ? additionalQuestion.yesResponse
                                                    : additionalQuestion.noResponse}
                                            </p>
                                        </div>
                                    </Grid>
                                )}
                            </>
                        )}
                        {additionalQuestion.question && selectedValue !== 'si' && (
                            <>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_ImageBox'>
                                        <img src={imageSrc}></img>
                                        <img src={imagen2}></img>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_text_tittle'>
                                        <p>{description}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <Button className="ButtonFirst" onClick={closeHandler}>
                                        {t('buttons.next')}
                                    </Button>
                                </Grid>
                            </>
                        )}

                        {!additionalQuestion.question && (
                            <>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_ImageBox'>
                                        <img src={imageSrc}  />
                                        <img src={imagen2}  />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_text_tittle'>
                                        <p>{description}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <Button className="ButtonFirst" onClick={closeHandler}>
                                        {t('buttons.next')}
                                    </Button>
                                </Grid>
                            </>
                        )}

                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            <div>
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}><h5>{titulo}</h5></Grid>
                        <Grid item xs={12}><img src={imagen}></img></Grid>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_tex2'>
                                <FormControl margin='none' sx={{ m: 1 }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={selectedValue}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="si" control={<Radio />} label={t('buttons.yes')} onClick={() => handleDialog('dialog1', true)} />
                                        <FormControlLabel value="no" control={<Radio />} label={t('buttons.no')} onClick={() => handleDialog('dialog2', true)} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <DialogBox
                    isOpen={openDialogs.dialog2}
                    closeHandler={() => handleDialog('dialog2', false)}
                    imageSrc= {inverseImageSrc ? Rectangle_137 : Green_Check_Mark_PNG_small}
                    description={descripcion}
                />
                <DialogBox
                    isOpen={openDialogs.dialog1}
                    closeHandler={() => handleDialog('dialog1', false)}
                    imageSrc={inverseImageSrc ? Green_Check_Mark_PNG_small : Rectangle_137}
                    description={descripcion2}
                />
            </div>
        </>
    );
};

SoilIndicatorCards.defaultProps = {
    additionalQuestion: {
        question: '',
        yesResponse: '',
        noResponse: '',
    },
};


SoilIndicatorCards.propTypes = {
    titulo: PropTypes.string,
    imagen: PropTypes.any,
    descripcion: PropTypes.string,
    descripcion2: PropTypes.string,
    imagen2: PropTypes.any,
};