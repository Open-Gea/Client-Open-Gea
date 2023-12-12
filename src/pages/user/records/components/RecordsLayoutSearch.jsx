import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Translation module
import { useTranslation } from 'react-i18next';
// MUI
import { Alert, Grid, LinearProgress, Table, TableContainer, TablePagination } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import EVTErrorComponent from '../../carbon-footprint/components/EVTErrorComponent';
import GenericToolbar from '../../../../components/utils/GenericToolbar';
// utils
import { getFarmsRecords } from '../utils/getFarmsRecords';
import FilterOrderTableHead from '../../../../components/utils/FilterOrderTableHead';
import { useState } from 'react';
import AddEditLots from '../sections/farmInformation/pages/lots/components/AddEditLot';

export default function RecordsLayoutSearch({
  breadcrumbs = true,
  idValue,
  emptyCondicion,
  fullCondicion,
  emptyMessage,
  selectMessage,
  bcLinks,
  headLabel,
  headTranslate,
  pageTitle,
  GTLabels,
  page,
  rowsPerPage,
  paginationCount,
  handleChangeRowsPerPage,
  handleOpen,
  onPageChange,
  children,
  addEditComponent,
  searchInput,
  searchPlaceholder,
  searchValue,
  handleSearchChange,
  handleRequestSort,
  handleFilter,
  order,
  orderBy,
  disableOptions = [],
  filterCells = [],
  filterChipLabels,
  handleResetFilter,
  data,
  useLots = false,
  lots = []
}) {
  // Added the translation for the tittle and other translations
  const { t } = useTranslation('records');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { isLoading, error, currentFarm } = useSelector(state => state.recordsSlice);

  const [openLotDialog, setOpenLotDialog] = useState(false);
  const [farmId, setFarmId] = useState(currentFarm.id !== undefined ? currentFarm.id : '');


  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) {
      dispatch(handleCurrentLots(value));
    }
  };

  return (
    <Page title={pageTitle}>
      <GenericToolbar
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        searchInput={searchInput}
        breadcrumbs={breadcrumbs}
        hasMenu={false}
        idValue={idValue}
        bcLinks={bcLinks}
        handleClickOpen={handleOpen}
        error={!!error}
        isLoading={isLoading}
        labels={GTLabels}
        t={t}
        filterChipLabels={filterChipLabels}
        handleResetFilter={() => dispatch(handleResetFilter())}
        disable={useLots && !lots.length}
      />

      {addEditComponent}

      {isLoading ? (
        <LinearProgress sx={{ my: 5 }} />
      ) : error ? (
        <EVTErrorComponent errMsg="Ocurrió un error" onReload={() => dispatch(getFarmsRecords(user.id))} />
      ) : useLots && !lots.length ? (
        <>
          <Grid item xs={12}>
          {lots.length ? (
            <Alert sx={{ mb: 2 }} severity="info">
              {t('forms.warningLot')}
            </Alert>
          ) : (
            <Alert sx={{ mb: 2 }} severity="error">
              {t('forms.errorNoLot')}
            </Alert>
          )}
          <GenericToolbar
            breadcrumbs={false}
            menuElements={[currentFarm]}
            handleClickOpen={() => setOpenLotDialog(true)}
            handleChange={handleChange}
            idValue={farmId}
            error={!!error}
            isLoading={isLoading}
            labels={{ inputLabel: t('recordsCommon.farm'), buttonLabel: t('buttons.addLot'), bcTitle: t('recordsCommon.lots') }}
            t={t}
          />
          <AddEditLots
            open={openLotDialog}
            onClose={() => setOpenLotDialog(false)}
            edit={false}
            title={t('farmsRegisterInputs.addLot')}
            t={t}
          />
        </Grid>
        </>
      ) : emptyCondicion ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t(emptyMessage || 'fertilizationRecordsMessages.addRecordFirst')}
        </Alert>
      ) : fullCondicion ? (
        <Scrollbar sx={{ maxHeight: '50%' }}>
          <TableContainer sx={{ minWidth: 600, my: 1, p: 0 }}>
            <Table stickyHeader>
              <FilterOrderTableHead
                t={t}
                headLabels={headLabel}
                handleRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                disableOptions={disableOptions}
                filterCells={filterCells}
                translateGroup={headTranslate}
                handleFilter={handleFilter}
                allData={data}
              />
              {children}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={paginationCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={e => handleChangeRowsPerPage(e.target.value)}
            labelRowsPerPage={t('recordsCommon.recordsPerPage')}
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} ${t('recordsCommon.of')} ${count}`}
          />
        </Scrollbar>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          {' '}
          {t(selectMessage || 'fertilizationRecordsMessages.selectType')}{' '}
        </Alert>
      )}
    </Page>
  );
}

RecordsLayoutSearch.propTypes = {
  breadcrumbs: PropTypes.bool,
  searchInput: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  idValue: PropTypes.string,
  emptyCondicion: PropTypes.bool.isRequired,
  fullCondicion: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
  selectMessage: PropTypes.string,
  headTranslate: PropTypes.string.isRequired,
  bcLinks: PropTypes.array.isRequired,
  headLabel: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  GTLabels: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  paginationCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func,
  handleOpen: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleResetFilter: PropTypes.func.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  children: PropTypes.any,
  addEditComponent: PropTypes.element,
  disableOptions: PropTypes.array,
  filterCells: PropTypes.array,
  filterChipLabels: PropTypes.object,
  data: PropTypes.array.isRequired,
};
