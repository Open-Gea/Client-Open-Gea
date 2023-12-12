const forecastTypes = {
  temperature: {
    quarterly: '500:Temperatureanomalyheightaboveground3Month2',
    monthly: '500:Temperatureanomalyheightaboveground1Month2',
    weekly: '502:Temperatureanomalyheightaboveground7Day2',
  },
  precipitation: {
    quarterly: '500:Precipitationanomalysurface3Month2',
    monthly: '500:Precipitationanomalysurface1Month2',
    weekly: '502:Precipitationanomalysurface7Day2',
  },
};

export const getTWCForecastType = (forecastType, timeRange) => {
  const twcForecastType = forecastTypes[forecastType]?.[timeRange];
  return twcForecastType ?? null;
};

/*       
    Migrated ForecastTypes:        
    500:Precipitationanomalysurface1Month2
    500:Precipitationanomalysurface3Month2
    500:Temperatureanomalyheightaboveground1Month2
    500:Temperatureanomalyheightaboveground3Month2
    502:Precipitationanomalysurface7Day2
    502:Temperatureanomalyheightaboveground7Day2
*/
