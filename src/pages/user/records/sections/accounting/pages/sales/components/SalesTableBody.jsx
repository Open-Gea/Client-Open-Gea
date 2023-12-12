import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import SalesMoreMenu from './SalesMoreMenu';
import { deleteSales } from '../../../../../../../../redux/slices/actions/salesActions';
import { useTranslation } from 'react-i18next';

export default function SalesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteSales(id));
  };
  const { i18n} = useTranslation();
  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, saleDate, revenue, coin, productSold, weightSold, buyerName, buyerCountry, unitSold } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{new Date(saleDate).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' }) || '---'}</TableCell>
            <TableCell align="center">{revenue || '---'}</TableCell>
            <TableCell align="center">{coin || '---'}</TableCell>
            <TableCell align="center">{productSold || '---'}</TableCell>
            <TableCell align="center">{weightSold || '---'}</TableCell>
            <TableCell align="center">{unitSold || '---'}</TableCell>
            <TableCell align="center">{buyerName || '---'}</TableCell>
            <TableCell align="center">{buyerCountry || '---'}</TableCell>

            <TableCell>
              <SalesMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  );
}

SalesTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
