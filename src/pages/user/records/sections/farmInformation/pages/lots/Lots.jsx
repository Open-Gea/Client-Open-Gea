import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import { Alert, LinearProgress, Table, TableContainer, TablePagination } from '@mui/material';
// Translation module
import { useTranslation } from 'react-i18next';
// notistack
import { useSnackbar } from 'notistack';
// acations
import { handleCurrentLots } from '../../../../../../../redux/slices/records';
// components
import { getValidationError } from '../../../../../../../utils/getValidationError';
import { getFarmsRecords } from '../../../../utils/getFarmsRecords';
import Scrollbar from '../../../../../../../components/scrollbar/Scrollbar';
import EVTErrorComponent from '../../../../../carbon-footprint/components/EVTErrorComponent';
import GenericToolbar from '../../../../../../../components/utils/GenericToolbar';
import GenericTableHead from '../../../../../../../components/utils/GenericTableHead';
import Page from '../../../../../../../components/utils/Page';
import AddEditLots from './components/AddEditLot';
import LotsTableBody from './components/LotsTableBody';



const headLabel = [
  { id: 'id', label: 'Identificación del lote', alignRight: false },
  { id: 'location', label: 'Ubicación', alignRight: false },
  { id: 'surfaceM2', label: 'Superficie', alignRight: false },
  { id: 'characteristics', label: 'Caracteristicas', alignRight: false },
  { id: 'observableNotes', label: 'Notas observables', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function Lots() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { farms, isLoading, error, currentLots, currentFarm } = useSelector(state => state.recordsSlice);
  const [farmId, setFarmId] = useState(currentFarm.id !== undefined ? currentFarm.id : '');
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Added the translation for the tittle and other translations
  
  const { t } = useTranslation('records');
    
  const bcLinks = [
    { id: 'home', name: t('links.home'), href: '/dashboard/main' },
    { id: 'historicalRecord', name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { id: 'farmInfo', name: t('links.farms'), href: '/dashboard/main/records/farm' },
    { id: 'lots', name: t('links.lots'), href: '/dashboard/main/records/page/lots' },
  ];

  const handleChangeRowsPerPage = value => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) {
      dispatch(handleCurrentLots(value));
    }
  };

  const handleClickOpen = () => {
    if (!farmId) {
      enqueueSnackbar(t('farmsRegisterMessages.selectFarm'), { variant: 'error' });
      setOpen(false);
    } else setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getFarmsRecords(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);
  return (
    <Page title={t('recordsCommon.lots')}>
      <GenericToolbar
        breadcrumbs={true}
        bcLinks={bcLinks}
        menuElements={farms}
        handleClickOpen={handleClickOpen}
        handleChange={handleChange}
        idValue={farmId}
        andleClose={handleClose}
        error={!!error}
        isLoading={isLoading}
        labels={{ inputLabel: t('recordsCommon.farm'), buttonLabel: t('buttons.addLot'), bcTitle: t('recordsCommon.lots') }}
      />
      <AddEditLots open={open} onClose={handleClose} edit={false} title={t('farmsRegisterInputs.addLot')} t={t} />
      {isLoading ? (
        <LinearProgress sx={{ my: 5 }} />
      ) : error ? (
        <EVTErrorComponent errMsg="Ocurrió un error" onReload={() => dispatch(getFarmsRecords(user.id))} />
      ) : !currentLots.length && farmId ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('farmsRegisterMessages.addFarmFirst')}
        </Alert>
      ) : currentLots.length && farmId ? (
        <Scrollbar sx={{ maxHeight: '50%' }}>
          <TableContainer sx={{ minWidth: 800, my: 1, p: 0 }}>
            <Table stickyHeader>
              <GenericTableHead t={t} headLabel={headLabel} translateGroup={'farmsRegisterInputs.'} />
              <LotsTableBody lots={currentLots} currentFarm={currentFarm} page={page} rowsPerPage={rowsPerPage} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={currentLots.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={e => handleChangeRowsPerPage(e.target.value)}
            labelRowsPerPage={t('recordsCommon.recordsPerPage')}
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} ${t('recordsCommon.of')} ${count}`}
          />
        </Scrollbar>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          {' '}
          {t('farmsRegisterMessages.selectFarm')}{' '}
        </Alert>
      )}
    </Page>
  );
}

Lots.propTypes = {
  handleCloseModal: PropTypes.func,
};
