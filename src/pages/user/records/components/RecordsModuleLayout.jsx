import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Translation module
import { useTranslation } from 'react-i18next';
// MUI
import { Alert, LinearProgress, Table, TableContainer, TablePagination } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import EVTErrorComponent from '../../carbon-footprint/components/EVTErrorComponent';
import GenericToolbar from '../../../../components/utils/GenericToolbar';
import GenericTableHead from '../../../../components/utils/GenericTableHead';
// utils
import { getFarmsRecords } from '../utils/getFarmsRecords';

export default function RecordsModuleLayout({
  breadcrumbs = true,
  hasMenu = true,
  menuElements,
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
  handleChange,
  handleChangeRowsPerPage,
  handleOpen,
  onPageChange,
  children,
  addEditComponent,
}) {
  // Added the translation for the tittle and other translations
  const { t } = useTranslation('records');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { isLoading, error } = useSelector(state => state.recordsSlice);

  return (
    <Page title={pageTitle}>
      <GenericToolbar
        breadcrumbs={breadcrumbs}
        hasMenu={hasMenu}
        menuElements={menuElements}
        idValue={idValue}
        handleChange={handleChange}
        bcLinks={bcLinks}
        handleClickOpen={handleOpen}
        error={!!error}
        isLoading={isLoading}
        labels={GTLabels}
        t={t}
      />

      {addEditComponent}

      {isLoading ? (
        <LinearProgress sx={{ my: 5 }} />
      ) : error ? (
        <EVTErrorComponent errMsg={t('errors.generic')} onReload={() => dispatch(getFarmsRecords(user.id))} />
      ) : emptyCondicion ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t(emptyMessage || 'helpers.noRecords')}
        </Alert>
      ) : fullCondicion ? (
        <Scrollbar sx={{ maxHeight: '50%' }}>
          <TableContainer sx={{ minWidth: 600, my: 1, p: 0 }}>
            <Table stickyHeader>
              <GenericTableHead t={t} headLabel={headLabel} translateGroup={headTranslate} />
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

RecordsModuleLayout.propTypes = {
  breadcrumbs: PropTypes.bool,
  hasMenu: PropTypes.bool,
  menuElements: PropTypes.array,
  idValue: PropTypes.string,
  handleChange: PropTypes.func,
  emptyCondicion: PropTypes.bool.isRequired,
  fullCondicion: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
  selectMessage: PropTypes.string,
  headTranslate: PropTypes.string.isRequired,
  bcLinks: PropTypes.array.isRequired,
  headLabel: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  GTLabels: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  paginationCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  children: PropTypes.element,
  addEditComponent: PropTypes.element,
};
