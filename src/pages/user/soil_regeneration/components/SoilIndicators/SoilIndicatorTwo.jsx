import React, { useEffect, useState } from 'react';

//  import { Loading1 } from '../../page/Loading1';
import { Grid } from '@mui/material';
import { SoilIndicatorCards } from './SoilIndicatorCards';

// imagenes
import costras from '../../../../../assets/video/soil_regeneration/costras.png';
import fertilidad from '../../../../../assets/video/soil_regeneration/fertilidad.png';
import agregados from '../../../../../assets/video/soil_regeneration/agregados.png';
import infiltracion from '../../../../../assets/video/soil_regeneration/infiltracion.png';
import pendiente from '../../../../../assets/video/soil_regeneration/pendiente.png';
import sales from '../../../../../assets/video/soil_regeneration/sales.png';
import CuadroFertilidadEs from '../../../../../assets/video/soil_regeneration/Cuadro_Fertilidad.png';
import CuadroFertilidadOthers from '../../../../../assets/video/soil_regeneration/Cuadro_Fertilidad_Otros.png';

// Translation module
import { useTranslation } from 'react-i18next';

export const SoilIndicatorTwo = ({ setLink }) => {



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
                            <div id='boxSoil_Regeneration_tex2'>
                                <h1>{t('physicalSoilIndicators')}</h1>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards
                                    titulo={t('physicalSoilQuestions.crustsQuestion')}
                                    imagen={costras}
                                    descripcion=''
                                    descripcion2={t('physicalSoilQuestions.crustsAnswer')}
                                >
                                </SoilIndicatorCards>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards
                                    titulo={t('physicalSoilQuestions.saltsQuestion')}
                                    imagen={sales}
                                    descripcion=''

                                    descripcion2={t('physicalSoilQuestions.saltsAnswer')}
                                >

                                </SoilIndicatorCards>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards
                                    titulo={t('physicalSoilQuestions.waterInfiltrationQuestion')}
                                    imagen={infiltracion}
                                    descripcion=''
                                    descripcion2={t('physicalSoilQuestions.waterInfiltrationAnswer')}
                                >

                                </SoilIndicatorCards>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards
                                    titulo={t('physicalSoilQuestions.aggregatesQuestion')}
                                    imagen={agregados}
                                    descripcion={t('physicalSoilQuestions.aggregatesAnswer2')}
                                    descripcion2={t('physicalSoilQuestions.aggregatesAnswer1')}
                                    inverseImageSrc={true}
                                >

                                </SoilIndicatorCards>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards 
                                    titulo={t('physicalSoilQuestions.evaluateSoilQuestion')} 
                                    imagen={fertilidad} 
                                    imagen2={i18n.language === 'es' ? CuadroFertilidadEs : CuadroFertilidadOthers} 
                                    descripcion={t('physicalSoilQuestions.evaluateSoilAnswer')}  
                                    inverseImageSrc={true}
                                    
                                    >
                                    
                                </SoilIndicatorCards>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='boxSoil_Regeneration_CardBox'>
                                <SoilIndicatorCards
                                    titulo={t('physicalSoilQuestions.cropsLocationQuestion')}
                                    imagen={pendiente}
                                    descripcion=''
                                    descripcion2={t('physicalSoilQuestions.cropsAnswer')}
                                    additionalQuestion={{
                                        question: t('physicalSoilQuestions.additionalQuestion.question'),
                                        yesResponse: t('physicalSoilQuestions.additionalQuestion.yesResponse'),
                                        noResponse:t('physicalSoilQuestions.additionalQuestion.noResponse')
                                    }}
                                />


                            </div>
                        </Grid>
                        <Grid container item xs={12} justifyContent="space-between">
                            <Grid item>
                                <button
                                    className="ButtonFirst"
                                    onClick={() =>
                                        setLink({
                                            soilIndicatorOne: true,
                                        })
                                    }
                                >
                                    {t('buttons.back')}
                                </button>
                            </Grid>

                            <Grid item>
                                <button
                                    className="ButtonFirst"
                                    onClick={() =>
                                        setLink({
                                            coverManagement: true,
                                        })
                                    }
                                >
                                    {t('buttons.continue')}
                                </button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

            </div>
        </>
    );
};
