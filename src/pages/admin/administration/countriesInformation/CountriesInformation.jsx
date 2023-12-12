import { useEffect,useState } from 'react';
import axios from 'axios';
// @mui
import { Card, Table, TableRow, TableBody, TableCell,Container, Typography, TableContainer, TablePagination,LinearProgress, Alert } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFound from '../../../../components/utils/SearchNotFound';
// sections
import { CountriesListHead, CountriesListToolbar, CountriesMoreMenu } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { handleChangeRowsPerPage, setPage } from '../../../../redux/slices/countriesAdmin';
import { getListCountries } from './utils/getCountries';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
import { getOfficialCountries } from './utils/getOfficialCountries';


// ----------------------------------------------------------------------

export function CountriesInformation() {
  const { t, i18n } = useTranslation('countries');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredCountries, isLoading, error, countries, officialCountries } = useSelector(state => state.countriesAdminSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredCountries.length) : 0;

  const filtered = applySortFilter(filteredCountries, getComparator(order, orderBy), filterName);

  const isNotFound = !filtered.length && Boolean(filterName);


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
    if(!officialCountries || !officialCountries.length) {
      dispatch(getOfficialCountries());
    }
    dispatch(getListCountries());
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
              { name: t('title'), href: '/dashboard/main/myFarms' },
              { name: t('inputs.countriesInformation'), href: '/dashboard/main/myFarms/page/farmsInformation' },
            ]}
          />
        <Card>
          <CountriesListToolbar />
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              filtered.length === 0 && !filterName ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                   { t('validations.noCountries') } 
                </Alert>
               ) : (

              
              <TableContainer sx={{ minWidth: 300 }}>
                              <br />
                <Table stickyHeader>
                  <CountriesListHead />
                  <TableBody>
                    {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      const { id, name, code, englishName} = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" noWrap>
                              {code?.toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                  src={`https://flagcdn.com/48x36/${code?.toLowerCase()}.png`}
                                  width="5.8%"
                                  style={{ marginLeft: '5px' }} 
                                />
                                <span>&nbsp;&nbsp; {i18n.language == 'es' ?  name : englishName}</span>
                          </div>
                          </TableCell>
                          <TableCell align="right"  sx={{ width: '4%' }}>
                            <CountriesMoreMenu countryInfo={row} countries={countries} officialCountries={officialCountries} />
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
               )
            )}
          </Scrollbar>
          <br />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCountries.length}
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
