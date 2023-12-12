import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import ShowDetailsDialog from './ShowDetailsDialog';

const CalcsTableBody = ({ isLoading, farmCalcs, products, year }) => {

  const { i18n } = useTranslation('water-footprint');
  const { t } = useTranslation('water-footprint');

   // Filtering by year 
   farmCalcs = farmCalcs.filter(function(waterFootprint){
    if(i18n.language === 'en') {
      if(year !== 'All Years'){
        return (new Date(waterFootprint.detail.fechaSiembra)).getFullYear().toString() === year;
      }else{
        return true;
      }    
    }else{
      if(year !== 'Todos los Años'){
        return (new Date(waterFootprint.detail.fechaSiembra)).getFullYear().toString() === year;
      }else{
        return true;
      }    
    }
  });
  
  // Order by year if the year is not specified
  if(year === 'All Years' || year === 'Todos los Años'){
    farmCalcs.sort((a, b) => parseInt((new Date(a.detail.fechaSiembra)).getFullYear()) - parseInt((new Date(b.detail.fechaSiembra)).getFullYear()));
  }

  return (
    <TableBody>
      {farmCalcs.map(row => {
        const { id, fecha, producto, detail } = row;
        let prodName = products.find(prod => prod.id === producto)?.name;
        if(i18n.language !== 'es'){
          prodName = t('footprintProducts.'+prodName)
        }
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="left">
              {new Date(fecha).toLocaleDateString(i18n.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell align="left">{prodName}</TableCell>
            <TableCell align="left">{<ShowDetailsDialog details={detail} fecha={fecha} producto={prodName} />}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

CalcsTableBody.propTypes = {
  isLoading: PropTypes.bool,
  farmCalcs: PropTypes.array,
  products: PropTypes.array,
};

export default CalcsTableBody;
