import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import ArrowForecast from '@mui/icons-material/ArrowForwardIos';
import { DailyForecastCard } from './';
import './scrollableForecastList.css';

export const ForecastCarousel = ({ nextDaysForecast = [] }) => {
  const scrollForecastRef = useRef(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);


  const scrollTo = distance => {
    scrollForecastRef.current.scrollLeft += distance;
  };

  const handleScroll = e => {
    // scrollLeft = how long has the user scrolled.
    // offsetWidth = client size of the element (displaying the scrollbar).
    // scrollWidth = real size of the element, with the overflown elements.
    const { scrollLeft, offsetWidth, scrollWidth } = e.target;
    // Updates left button
    if (scrollLeft === 0) {
      setShowLeftButton(false);
    } else {
      setShowLeftButton(true);
    }

    // Updates right button
    if (scrollLeft + offsetWidth  >= scrollWidth) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  };

  return (
    <Paper elevation={3} className="forecast__scrollable">
      {/* Left button */}
      <Box className={`forecast__navigation forecast__navigation--left ${showLeftButton ? 'display' : ''}`}>
        <Button onClick={() => scrollTo(-200)}>
          <ArrowBack />
        </Button>
      </Box>
      {/* Forecast Card List */}
      <Box
        display="flex"
        flexWrap="noWrap"
        gap={4}
        sx={{ p: 2, backgroundColor: 'primary' }}
        className="forecast__scrollable__container"
        ref={scrollForecastRef}
        onScroll={handleScroll}
      >
        {nextDaysForecast.map(({ formattedDate, iconCode, pp, temperatureMin, temperatureMax, altText }, index) => (
          <DailyForecastCard
            key={formattedDate + index}
            formattedDate={formattedDate}
            iconCode={iconCode}
            altText={altText}
            pp={pp}
            temperatureMin={temperatureMin}
            temperatureMax={temperatureMax}
          />
        ))}
      </Box>
      {/* Right button */}
      <Box className={`forecast__navigation forecast__navigation--right ${showRightButton ? 'display' : ''}`}>
        <Button onClick={() => scrollTo(200)}>
          <ArrowForecast />
        </Button>
      </Box>
    </Paper>
  );
};

ForecastCarousel.propTypes = {
  nextDaysForecast: PropTypes.array.isRequired,
};
