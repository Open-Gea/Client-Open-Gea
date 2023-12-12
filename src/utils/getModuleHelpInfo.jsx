import 
{ 
  AgronomicDataHelp,
  CarbonFootprintHelp,
  EvotranspirationHelp,
  QRHelp,
  HomeHelp,
  SeasonalForecastHelp,
  IrrigationHelp,
  WeatherForecastHelp
} from '../components/moduleHelp';


const getHelpModuleElement = (modulePath = '') => {
  switch (modulePath) {
    case 'main/null': // null -> path index
      return <HomeHelp />;
    case 'main/agronomic-data':
      return <AgronomicDataHelp />;
    case 'main/carbon-footprint':
      return <CarbonFootprintHelp />;
    case 'main/evotranspiration':
      return <EvotranspirationHelp />;
    case 'main/qr':
      return <QRHelp />;
    case 'main/seasonal-forecast':
      return <SeasonalForecastHelp />;
    case 'main/irrigation':
      return <IrrigationHelp />;
    case 'main/weather-forecast':
      return <WeatherForecastHelp />;
    default:
      return null;
  }
}

export const getModuleHelpInfo = (modulePath = '') => {
  if (!modulePath) return null;
  const moduleElement = getHelpModuleElement(modulePath);
  return { available: !!moduleElement, helpElement: moduleElement };

};
