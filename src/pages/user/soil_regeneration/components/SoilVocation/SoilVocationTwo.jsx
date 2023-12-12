import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//  import { Loading1 } from '../../page/Loading1';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';

import CuadroVocaciónDeUsoES from '../../../../../assets/video/soil_regeneration/Cuadro_Vocación_de_USO.png';
import CuadroVocaciónDeUsoOthers from '../../../../../assets/video/soil_regeneration/Cuadro_Vocación_de_USO_Otros.png';


// Translation module
import { useTranslation } from 'react-i18next';

export const SoilVocationTwo = ({ setLink }) => {
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

   // Added for translations
   const { t } = useTranslation('soil-regeneration');
   // Added to know the language
   const { i18n } = useTranslation();    

    return (
        <>
            <div id='boxSoil_Regeneration'>
               {/* <p> Image with text in Spanish only if the language is in Spanish /p> */}
               {i18n.language === 'es' ? <img src={CuadroVocaciónDeUsoES} ></img> : <img src={CuadroVocaciónDeUsoOthers} ></img> }
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_tex2'>
                                <p>{t('messagesWithTitles.soilVocationSelect')}</p>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnSpacing: 1,
                                    alignItems: 'center',
                                    '& > *': {
                                        m: 1,
                                    },
                                }}
                            >
                                <ButtonGroup size="large" aria-label="small button group">
                                    <Button size="large" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.agricole')}</Button>
                                </ButtonGroup>
                                <ButtonGroup size="large" aria-label="small button group">
                                    <Button size="large" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.livestock')}</Button>
                                </ButtonGroup>
                                <ButtonGroup size="large" aria-label="small button group">
                                    <Button size="large" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.agroforestry')}</Button>
                                </ButtonGroup>
                                <ButtonGroup size="large" aria-label="small button group">
                                    <Button size="large" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.forestry')}</Button>
                                </ButtonGroup>
                                <ButtonGroup size="large" aria-label="small button group">
                                    <Button size="large" aria-label="small button group" className='ButtonSecond'>{t('soilVocations.conservation')}</Button>
                                </ButtonGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={10}>

                        </Grid>
                        <Grid item xs={2
                        }>
                            <button
                                className="ButtonFirst"
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
                                }
                            >
                                {t('buttons.continue')}
                            </button>

                        </Grid>
                    </Grid>
                </Grid>


            </div>

        </>
    )


}