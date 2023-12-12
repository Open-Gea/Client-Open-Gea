import { useEffect,useState } from 'react';
import axios from 'axios';
// @mui
import { Card, Table, TableRow, TableBody, TableHead,Button,TableCell,Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, TableContainer, TablePagination,LinearProgress } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFound from '../../../../components/utils/SearchNotFound';
// sections
import { FarmsListHead, FarmsListToolbar, FarmsMoreMenu } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { deleteFarm, handleChangeRowsPerPage, setPage } from '../../../../redux/slices/farmsCooperativa';
import MapViewDialog from './components/MapviewDialog';
import { getFarmsByCooperative } from './utils/getFarms';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { Alert  } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';


// ----------------------------------------------------------------------

export function FarmsInformation() {
  const { t } = useTranslation('farms');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredFarms, isLoading, error } = useSelector(state => state.farmsCooperativaSlice);
  const { user, cooperative } = useSelector(s => s.authSlice);
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredFarms.length) : 0;

  const filtered = applySortFilter(filteredFarms, getComparator(order, orderBy), filterName);

  const isNotFound = !filtered.length && Boolean(filterName);

  const handleDeleteFarm = async id => {
    dispatch(deleteFarm(id));
  };

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null)
    setOpenModal(false);
  };

  const MyAlert = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <Alert
        severity="error"
        onClose={onClose}
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        {message}
      </Alert>
    );
  };

  useEffect(() => {
    dispatch(getFarmsByCooperative(cooperative.id));
  }, [dispatch]);
  useEffect(() => {
    if (!isLoading && error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title={t('title')}>
      
      <Container>
        <HeaderBreadcrumbs
            heading={t('title2')}
            sx={{ mb: 0 }}
            links={[
              { name: t('inputs.home'), href: '/dashboard/main' },
              { name: t('inputs.myFarms'), href: '/dashboard/main/myFarms' },
              { name: t('inputs.farmsInformation'), href: '/dashboard/main/myFarms/page/farmsInformation' },
            ]}
          />
        <Card>
          <FarmsListToolbar />
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table stickyHeader>
                  <FarmsListHead />
                  <TableBody>
                    {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      const { id, name, owner, phone, country, lat, lng, userId } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{owner}</TableCell>
                          <TableCell align="left">{country}</TableCell>
                          <TableCell align="left">
                            <MapViewDialog lat={lat} lng={lng} name={name} country={country} owner={owner} />
                          </TableCell>
                          <TableCell align="left" >
                          <Button  variant="contained" onClick={() => handleOpenModal(row)}>{t('farmTable.openCertificates')}</Button>
                        </TableCell>
                        <Dialog open={openModal} onClose={handleCloseModal} sx={{ '& .MuiDialog-paper': { maxWidth: '90%', maxHeight: '90%' } }}>
                          <DialogTitle align='center'>{t('certificateTable.title')}</DialogTitle>
                          <DialogContent>
                          <TableContainer sx={{ minWidth: 800, maxHeight: '70vh' }}>
                          <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>{t('certificateTable.nameHeader')}</TableCell>
                                  <TableCell>{t('certificateTable.uploadedDateHeader')}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selectedRow && selectedRow.urls && selectedRow.urls.map((urlObj) => (
                                  <TableRow key={urlObj.file_id} className="table-row">
                                    <TableCell sx={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd' }}>{urlObj && urlObj.filename}</TableCell>
                                    <TableCell sx={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd' }}>{urlObj && urlObj.fechaCarga}</TableCell>
                                    <TableCell align="right">
                                      <Button onClick={() => window.open(urlObj.url, '_blank')}>{t('open')}</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseModal}>{tCommon('close')}</Button>
                          </DialogActions>
                        </Dialog>
                          <TableCell align="right">
                            <FarmsMoreMenu onDelete={() => handleDeleteFarm(row.id)} farmInfo={row} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
          </Scrollbar>
          

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFarms.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => dispatch(setPage(page))}
            onRowsPerPageChange={e => dispatch(handleChangeRowsPerPage(e.target.value))}
          />
        </Card>
        {showAlert && <MyAlert message={t('noCertificateUploaded')} />}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
    return -1;
  }
  if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(_user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}
