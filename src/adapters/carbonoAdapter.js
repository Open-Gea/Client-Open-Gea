import { useSelector } from 'react-redux';

// eslint-disable-filex

export default function calcCarbonAdapter({
  id,
  created_at,
  farm,
  emissionFactor,
  result,
  consumption,
  year
}) {
  return {
    id,
    fecha: created_at,
    emissionFactor: emissionFactor,
    detail: {
      result,
      consumption,
      year
    },
    farm,
  };
}