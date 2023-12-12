import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//  import { Loading1 } from '../../page/Loading1';
import { Grid } from '@mui/material';

import lecturacritica_1 from '../../../../../assets/video/soil_regeneration/lecturacritica_1.png';

// Translation module
import { useTranslation } from 'react-i18next';


export const CarbonCaptureTree = ({ setLink }) => {
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

    // Added the translation for the tittle and other translations 
    const { t } = useTranslation('soil-regeneration');

    return (
        <>
            <div id='boxSoil_Regeneration'>
                <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <div id='boxSoil_Regeneration_tex1' >
                                <h1>{t('soilQuestion5')}</h1>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            
                        </Grid>
                        <Grid item xs={11}>
                            <img src={lecturacritica_1} ></img>
                        </Grid>
                        <Grid item xs={1}>
                            
                        </Grid>
                        <Grid item xs={6}>
                        <button
                                className="ButtonFirst"
                                onClick={() =>
                                    setLink({
                                        sensitizationOne: false,
                                        sensitizationTwo: false,
                                        carbonCaptureOne: false,
                                        carbonCaptureTwo: true,
                                        carbonCaptureTree: false,
                                    })
                                }
                            >
                               {t('buttons.question')}
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
                                        soilVocationOne: true,
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

