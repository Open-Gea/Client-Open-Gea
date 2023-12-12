import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import ShowDetailsDialog from './ShowDetailsDialog';

const CalcsTableBody = ({ isLoading, farmCalcs, products }) => {

  const { i18n } = useTranslation('water-footprint');
  const { t } = useTranslation('water-footprint');


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
