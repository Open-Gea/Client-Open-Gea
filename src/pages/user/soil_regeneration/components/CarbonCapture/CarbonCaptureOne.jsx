import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
//  import { Loading1 } from '../../page/Loading1';
import { Grid } from '@mui/material';
// Translation module
import { useTranslation } from 'react-i18next';

import carbon_img_01 from '../../../../../assets/video/soil_regeneration/carbon_img_01.png';

export const CarbonCaptureOne = ({ setLink, setCurrentTab }) => {

  const [value, setValue] = useState('');
  /*  esto del cookies se puede comentar e ignorar por el momento */
  useEffect(() => {
    const cookieValue = Cookies.get('miCookie');
    setValue(cookieValue);
  }, []);

  // Added the translation for the tittle and other translations
  const { t } = useTranslation('soil-regeneration');

  return (
    <>
      <div id="boxSoil_Regeneration">
        <Grid container direction="column" justifyContent="flex-end" alignItems="center">
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div id="boxSoil_Regeneration_tex1">{t('messagesWithTitles.carboonMessage')}</div>
            </Grid>
            <Grid item xs={12}>
              <div id="boxSoil_Regeneration_colorBox">
                <div id="boxSoil_Regeneration_ImageBox">
                  <h1>{t('messagesWithTitles.carboonTitle')}</h1>
                  <img src={carbon_img_01} alt="Imagen de captura de carbono" />
                </div>
              </div>
            </Grid>

            <Grid container item xs={12} justifyContent="space-between">
              <Grid item>
                <button
                  className="ButtonFirst"
                  onClick={e => {
                    setLink({
                      sensitizationOne: true,
                      sensitizationTwo: false,
                      carbonCaptureOne: false,
                      carbonCaptureTwo: false,
                      carbonCaptureTree: false,
                    });
                    setCurrentTab(e, 0);
                  }}
                >
                  {t('buttons.back')}
                </button>
              </Grid>

              <Grid item>
                <button
                  className="ButtonFirst"
                  onClick={e => {
                    setLink({
                      sensitizationOne: false,
                      sensitizationTwo: false,
                      carbonCaptureOne: false,
                      carbonCaptureTwo: true,
                      carbonCaptureTree: false,
                    });
                  }}
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
