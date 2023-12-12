import React, { useEffect, useState } from 'react';


import { Grid } from '@mui/material';

import ImagenIlustrativaEs from '../../../../../assets/video/soil_regeneration/Imagen_Ilustrativa.png';
import ImagenIlustrativaOthers from '../../../../../assets/video/soil_regeneration/Imagen_Ilustrativa_Otros.png';


// Translation module
import { useTranslation } from 'react-i18next';


export const SoilIndicatorOne = ({ setLink }) => {
    const [value, setValue] = useState('');

    // Added for translations
    const { t } = useTranslation('soil-regeneration');
    // Added to know the language
    const { i18n } = useTranslation();

    return (
        <>
            <div id='boxSoil_Regeneration'>
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_tex1' >
                               <p>{t('messagesWithTitles.soilIndicatorMessage')}</p>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            
                        </Grid>
                        <Grid item xs={11}>
                             {/* <p> Image with text in Spanish only if the language is in Spanish /p> */}
                             {i18n.language === 'es' ? <img src={ImagenIlustrativaEs} ></img> : <img src={ImagenIlustrativaOthers} ></img> }
                        </Grid>
                        <Grid item xs={1}>
                            
                        </Grid>
                        <Grid item xs={6}>
                        <button
                                className="ButtonFirst"
                                onClick={() =>
                                    setLink({
                                        soilTreatment: true,
                                    })
                                }
                            >
                                {t('buttons.tasks')}
                            </button>

                        </Grid>
                        <Grid item xs={5
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
                                        soilIndicatorTwo: true,
                                    })
                                }
                            >
                                {t('buttons.next')}
                            </button>

                        </Grid>
                    </Grid>

                </Grid>


            </div>
        </>
    )



}