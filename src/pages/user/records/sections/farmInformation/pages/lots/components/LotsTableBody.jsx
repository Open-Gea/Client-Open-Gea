import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// MUI
import { TableBody, TableCell, TableRow } from '@mui/material';
// Translation module
import { useTranslation } from 'react-i18next';
// components
import MapViewDialog from '../../../../../../farms/components/MapviewDialog';
import { deleteLot } from '../../../../../../../../redux/slices/actions/lotsActions';
import LotsNotesDialog from './LotsNotesDialog';
import LotsMoreMenu from './LotsMoreMenu';

const LotsTableBody = ({ lots, currentFarm, page, rowsPerPage, readOnly=false }) => {
  const dispatch = useDispatch();
  const handleDeleteLot = async id => {
    dispatch(deleteLot(id));
  };
  const { country, owner } = currentFarm;
  // Added the translation for the tittle and other translations
  const { t } = useTranslation('records');

  return (
    <TableBody>
      {lots?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { name, id, ubication, surface, notes, characteristics } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">
              <MapViewDialog lat={ubication.lat} lng={ubication.lng} country={country} owner={owner} name={currentFarm.name} />
            </TableCell>
            <TableCell align="center">{surface}</TableCell>
            <TableCell align="center">
              <LotsNotesDialog notes={characteristics} lotName={name} t={t} />
            </TableCell>
            <TableCell align="center">
              <LotsNotesDialog notes={notes} lotName={name} t={t} />
            </TableCell>
            {!readOnly && 
              <TableCell>
                <LotsMoreMenu
                  onDelete={() => handleDeleteLot({ lotId: id, farmId: currentFarm?.id })}
                  lotInfo = {row}
                />
              </TableCell>
            }
          </TableRow>
        );
      })}
    </TableBody>
  );
};

LotsTableBody.propTypes = {
  lots: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
};

export default LotsTableBody;
