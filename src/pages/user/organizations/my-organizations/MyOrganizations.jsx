import { useEffect,useState } from 'react';
// @mui
import {
  Alert, 
  Card, 
  Table,
  TableRow, 
  TableBody, 
  TableCell, 
  Container,
  TableContainer, 
  TablePagination,
  LinearProgress,
 } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFound from '../../../../components/utils/SearchNotFound';
// sections
import { OrganizationsListHead, MyOrganizationsListToolbar } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { handleChangeRowsPerPage, setPage } from '../../../../redux/slices/organizationsUser';
import { getOrganizationsByUser } from './utils/getOrganizations';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
import OrganizationsMoreMenu from './components/OrganizationsMoreMenu';

// ----------------------------------------------------------------------

export function MyOrganizations() {
  const { i18n, t } = useTranslation('invites');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredOrganizations, isLoading, error } = useSelector(state => state.organizationsUserSlice);
  const { user } = useSelector(s => s.authSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // ---------------------------

  // General actions for the table and filters
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOrganizations.length) : 0;
  const filtered = applySortFilter(filteredOrganizations, getComparator(order, orderBy), filterName);

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
  // ---------------------------


  useEffect(() => {

    // Here we need to load the requests by the user
    dispatch(getOrganizationsByUser(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title={t('titleOrganization')}>
      
      <Container>
        <HeaderBreadcrumbs
            heading={t('titleOrganizations')}
            sx={{ mb: 0 }}
            links={[
              { name: t('inputs.home'), href: '/dashboard/main' },
              { name: t('inputs.organizations'), href: '/dashboard/main/organizations' },
              { name: t('titleOrganization'), href: '/dashboard/main/myFarms' },
            ]}
          />
        <Card>
          <MyOrganizationsListToolbar/>
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              filtered.length === 0 && !filterName ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    { t('inputs.notFoundOrganizations') } 
                </Alert>
               ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table stickyHeader>
                  <OrganizationsListHead />
                  <TableBody>
                    {
                    
                    filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      // Extracting the data from the invitations
                      const { id, cooperative } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{cooperative.name}  </TableCell>
                          <TableCell align="left">{cooperative.email} </TableCell>
                          <TableCell align="left">{cooperative.country}</TableCell>
                          <TableCell align="left" sx={{ width:'20%'}}>{cooperative.description}</TableCell>
                          <TableCell align="left">
                            <OrganizationsMoreMenu row={row} />
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
                <TablePagination
               rowsPerPageOptions={[5, 10, 25]}
               component="div"
               count={filteredOrganizations.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={(e, page) => dispatch(setPage(page))}
               onRowsPerPageChange={e => dispatch(handleChangeRowsPerPage(e.target.value))}
             />
              </TableContainer> 
               )
            
            )}
          </Scrollbar>
        </Card>
        {showAlert && <MyAlert message={t('noCertificateUploaded')} />}

      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// In this case we use new Date because we are ordering using a Date object
function descendingComparator(a, b, orderBy) {
  if ((b?.cooperative[orderBy]) < (a?.cooperative[orderBy])) {
    return -1;
  }
  if ((b?.cooperative[orderBy]) > (a?.cooperative[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// Change invites.user.name if you need to change the value you are searching in the search bar and orderby to define the filtering
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(organization => (organization.cooperative.name).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map(el => el[0]);
}
