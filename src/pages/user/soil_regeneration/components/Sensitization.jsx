import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import verde_40724 from '../../../../assets/video/soil_regeneration/verde-40724.mp4';
import imgVerde_40724 from '../../../../assets/video/soil_regeneration/verde_40724.png';
import './Sensitization.css';
import { Loading1 } from '../page/Loading1';
// Translation module
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export const SensitizationOne = ({ setLink, setCurrentTab }) => {
  const [value, setValue] = useState('');
  // Added the translation for the tittle and other translations
  const { t } = useTranslation('soil-regeneration');

  useEffect(() => {
    const cookieValue = Cookies.get('miCookie');
    if (cookieValue) setValue(cookieValue);
  }, []);
  const [textEntered, setTextEntered] = useState(false);

  return (
    <>
      <Helmet>
        <title> {t('titlePage')} | yvy </title>
      </Helmet>
      <div id="boxSensOne">
        {/* Vídeo de <a href="https://pixabay.com/es/users/ha11ok-1785462/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=40724">ha11ok</a> de <a href="https://pixabay.com/es//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=40724">Pixabay</a> */}
        <video src={verde_40724} autoPlay muted loop title="Vídeo de ha11ok de Pixabay" poster={imgVerde_40724} />
        <div id="overLaySens">
          <div className="TextSens1">
            <div className="Preg">
              <p className="Preg1">{t('initialQuestion1')}</p>
              <p className="Preg2">{t('initialQuestion2')}</p>
            </div>
            <p className="TextSens1a">
              {t('initialMessage.0')} <br></br>
              {t('initialMessage.1')} <br></br>
              {t('initialMessage.2')}
            </p>
          </div>
          <div className="ActionSens1">
            {/* TODO: Revisar si en la base de datos existe resumen del vídeo para habilitar el botón de continuar sin ver el vídeo; ya que dicha lógica está escrita mediante cookie. */}

            <button
              className="ButtonFirst"
              onClick={e => {
                setLink({
                  carbonCaptureOne: true,
                });
                setCurrentTab(e, 1);
              }}
            >
              {t('buttons.continue')}{' '}
            </button>
            <button
              className="ButtonFirst"
              onClick={e => {
                setLink({
                  sensitizationTwo: true,
                });
              }}
            >
              {t('buttons.watch')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const SensitizationTwo = ({ setLink }) => {
  const [textEntered, setTextEntered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // Added the translation for the tittle and other translations
  const { t } = useTranslation('soil-regeneration');

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleTextareaChange = event => {
    const value = event.target.value.trim();
    setTextEntered(value.length > 0);
    // Establece una cookie con un valor y una caducidad de 360 días
    Cookies.set('miCookie', value, { expires: 360 });
  };

  return (
    <>
      <div id="boxSensTwo">
        <div id="overLaySensTwo">
          <h2> {t('soilQuestion3')} </h2>
          {/* Vídeo YouTube */}
          {!iframeLoaded && <Loading1 />}
          <iframe
            width="668.44"
            height="376"
            src={t('soilVideo')}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; playsinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleIframeLoad}
            style={{ display: iframeLoaded ? 'block' : 'none' }}
          ></iframe>

          <div className="FormTextSens">
            <h4>{t('soilQuestion4')}</h4>
            <div className="FormTextEditSens">
              <textarea placeholder={t('videoDescription')} onChange={handleTextareaChange}>
                {Cookies.get('miCookie')}
              </textarea>
            </div>
          </div>
        </div>
        <div className="ActionSens2">
          <button
            className="ButtonFirst"
            onClick={() =>
              setLink({
                carbonCaptureOne: true,
              })
            }
          >
            {t('buttons.continue')}
          </button>
        </div>
      </div>
    </>
  );
};
