import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next';

import carbon from '../../assets/mainviewImg/landingCards/CarbonFootprint_en.png';
import waterFoot from '../../assets/mainviewImg/landingCards/WaterFootprint_en.png';
import agronomic from '../../assets/mainviewImg/landingCards/AgronomicData_en.png';
import climate from '../../assets/mainviewImg/landingCards/ClimateForecast_en.png';
import historical from '../../assets/mainviewImg/landingCards/HistoricalRecord_en.png';
import organizations from '../../assets/mainviewImg/landingCards/Organizations_en.png';
import qrCode from '../../assets/mainviewImg/landingCards/QRCode_en.png';
import seasonal from '../../assets/mainviewImg/landingCards/SeasonalForecast_en.png';
import soil from '../../assets/mainviewImg/landingCards/SoilRegenerationPlan_en.png';
import autodiagnostic from '../../assets/mainviewImg/landingCards/SustainabilityDiagnostics_en.png';
import irrigation from '../../assets/mainviewImg/landingCards/WateringNeeds_en.png';

const enCards = [carbon, waterFoot, agronomic, climate, historical, organizations,
qrCode, seasonal, soil, autodiagnostic, irrigation]

import carbonEs from  '../../assets/mainviewImg/landingCards/CarbonFootprint_es.png';
import waterFootEs from '../../assets/mainviewImg/landingCards/WaterFootprint_es.png';
import agronomicEs from '../../assets/mainviewImg/landingCards/AgronomicData_es.png';
import climateEs from '../../assets/mainviewImg/landingCards/ClimateForecast_es.png';
import historicalEs from '../../assets/mainviewImg/landingCards/HistoricalRecord_es.png';
import organizationsEs from '../../assets/mainviewImg/landingCards/Organizations_es.png';
import qrCodeEs from '../../assets/mainviewImg/landingCards/QRCode_es.png';
import seasonalEs from '../../assets/mainviewImg/landingCards/SeasonalForecast_es.png';
import soilEs from '../../assets/mainviewImg/landingCards/SoilRegenerationPlan_es.png';
import autodiagnosticEs from '../../assets/mainviewImg/landingCards/SustainabilityDiagnostics_es.png';
import irrigationEs from '../../assets/mainviewImg/landingCards/WateringNeeds_es.png';

const esCards = [carbonEs, waterFootEs, agronomicEs, climateEs, historicalEs, organizationsEs,
  qrCodeEs, seasonalEs, soilEs, autodiagnosticEs, irrigationEs]
  
const MyCarousel = () => {
  
  const isDesktop = useResponsive('up', 'lg');
  const { i18n } = useTranslation();

  const cards = i18n.language === 'es' ? esCards : enCards;

  return (
    <Carousel
      showStatus={false} // Para ocultar el indicador de estado del carrusel
      showThumbs={false} // Para ocultar las miniaturas del carrusel
      autoPlay
      infiniteLoop
      interval={5000}
      transitionTime={500}
      width={isDesktop && '75vh'}
      centerMode={isDesktop}
      centerSlidePercentage={isDesktop && 75}
    >
      {cards.map((c, i) => (<div key={i}>
        <img src={c} alt={'card'+i} style={{objectFit: 'scale-down'}}/>
      </div>))}
       
    </Carousel>
  );
};

export default MyCarousel;
