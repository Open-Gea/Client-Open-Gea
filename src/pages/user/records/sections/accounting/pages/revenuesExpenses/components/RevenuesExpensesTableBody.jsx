import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import RevenuesExpensesMoreMenu from './RevenuesExpensesMoreMenu';
import { deleteRevenuesExpenses } from '../../../../../../../../redux/slices/actions/revenuesExpensesActions';
import { useTranslation } from 'react-i18next';

export default function RevenuesExpensesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteRevenuesExpenses(id));
  };
  const { i18n} = useTranslation();
  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id,type, date, category, amount, coin, detail } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{new Date(date).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' }) || '---'}</TableCell>
            <TableCell align="center">{type || '---'}</TableCell>
            <TableCell align="center">{category || '---'}</TableCell>
            <TableCell align="center">{amount || '---'}</TableCell>
            <TableCell align="center">{coin || '---'}</TableCell>
            <TableCell align="center">{detail || '---'}</TableCell>
            <TableCell>
              <RevenuesExpensesMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

RevenuesExpensesTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
