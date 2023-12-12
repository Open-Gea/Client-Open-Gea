import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import AgrochemicalMoreMenu from './AgrochemicalMoreMenu';
import { deleteAgrochemical } from '../../../../../../../../redux/slices/actions/agrochemicalActions';
import { useTranslation } from 'react-i18next';

export default function AgrochemicalTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteAgrochemical(id));
  };
  const { i18n} = useTranslation();
  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, purchaseDate, brand, volume, unit, activeIngredient, expirationDate  } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{new Date(purchaseDate).toLocaleDateString(i18n.language, { year: 'numeric', month : 'numeric', day: 'numeric' }) || '---'}</TableCell>
            <TableCell align="center">{brand || '---'}</TableCell>
            <TableCell align="center">{volume || '---'}</TableCell>
            <TableCell align="center">{unit || '---'}</TableCell>
            <TableCell align="center">{activeIngredient || '---'}</TableCell>
            <TableCell align="center">{new Date(expirationDate).toLocaleDateString('es-ES', { year: 'numeric', month : 'numeric', day: 'numeric' }) || '---'}</TableCell>
            <TableCell>
              <AgrochemicalMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
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

AgrochemicalTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
