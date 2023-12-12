import { useSelector } from 'react-redux';

// eslint-disable-filex
export default function calcAdapter({
  id,
  register_date,
  evotranspiration,
  start_date,
  end_date,
  hectares,
  tons,
  score,
  status,
  extras,
  farm,
  user,
  product,
}) {
  return {
    id,
    fecha: register_date,
    producto: product,
    detail: {
      producto: product,
      fechaSiembra: start_date,
      fechaCocecha: end_date,
      toneladas: tons,
      hectareas: hectares,
      evotranspiracion: evotranspiration,
      score,
      extras,
      status,
    },
    user,
    farm,
  };
}
