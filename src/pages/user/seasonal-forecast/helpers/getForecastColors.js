const getPrecipitationColor = value => {
  const fixedValue = Number(value.toFixed(4));

  // Will return the one that matches with "true"
  switch (true) {
    // a positive value in precipitation is bluish (meaning it will rain more than usual, thus being "more humid")
    case fixedValue > 0:
      return 'info';
    // a negative value in precipitation is reddish (meaning it will rain less than usual, thus being "drier")
    case fixedValue < 0:
      return 'error';
    case fixedValue === 0:
      return 'warning';
    default:
      return 'gray';
  }
};

const getTemperatureColor = value => {
  const fixedValue = Number(value.toFixed(4));

  // Will return the one that matches with "true"
  switch (true) {
    // a positive value in precipitation is reddish (meaning temps will be higher than usual, thus being warmer)
    case fixedValue > 0:
      return 'error';
    // a negative value in precipitation is bluish (meaning temps will be lower than usual, thus being colder)
    case fixedValue < 0:
      return 'info';
    case fixedValue === 0:
      return 'warning';
    default:
      return 'gray';
  }
};

// Colors will change depending on forecastType.
export const getColorByForecastType = (forecastType, value) => {
  if (!forecastType || !value) return null;

  switch (forecastType) {
    case 'precipitation':
      return getPrecipitationColor(value);
    case 'temperature':
      return getTemperatureColor(value);
    default:
      return '';
  }
};
