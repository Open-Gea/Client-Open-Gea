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
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
 } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFound from '../../../../components/utils/SearchNotFound';
// sections
import { InvitesListHead, InvitesListToolbar } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { handleChangeRowsPerPage, setPage, rejectUserRequest, approveUserRequest } from '../../../../redux/slices/invitesUser';
import { getInvitationsByUser } from './utils/getInvites';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
import Iconify from '../../../../components/utils/Iconify';
import MenuPopover from '../../../../components/utils/MenuPopover';
import InvitesMoreMenu from './components/InvitesMoreMenu';


// ----------------------------------------------------------------------

export function InvitesInformation() {
  const { i18n, t } = useTranslation('invites');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredInvitesUser, isLoading, error } = useSelector(state => state.invitesUserSlice);
  const { user } = useSelector(s => s.authSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [stateRequests,setStateRequests] = useState('');
  // ---------------------------

  // General actions for the table and filters
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredInvitesUser.length) : 0;
  let filtered = applySortFilter(filteredInvitesUser, getComparator(order, orderBy), filterName);
  if(stateRequests){
      // Filter by the state selected
      filtered = filtered.filter(function(invite){
          if(i18n.language === 'en') {
            if(stateRequests !== 'All Invites'){
              return  (invite.status[0].toLowerCase()) === (stateRequests[0].toLowerCase());
            }else{
              return true;
            }    
          }else{
            if(stateRequests !== 'Todas las invitaciones'){
              return (invite.status[0].toLowerCase()) === (stateRequests[0].toLowerCase());
            }else{
              return true;
            }    
          }
      }); 
  }else{
    // Define the default state if it is null or not defined
    if(i18n.language === 'en') {
      setStateRequests('All Invites');
    }else{
      setStateRequests('Todas las invitaciones');
    }
  }

  const isNotFound = !filtered.length && Boolean(filterName);

  const handleStateChange = event => {
    const value = event.target.value;
    setStateRequests(value);
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
  // ---------------------------


  useEffect(() => {
    // Setting the default value for year
    if(i18n.language === 'en') {
      setStateRequests('All Invites');
    }else{
      setStateRequests('Todas las invitaciones');
    }

    // Here we need to load the requests by the user
    dispatch(getInvitationsByUser(user.id));
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
              { name: t('inputs.organizations'), href: '/dashboard/main/organizations' },
              { name: t('title'), href: '/dashboard/main/myFarms' },
            ]}
          />
        <Card>
          <InvitesListToolbar
            handleStateChange={handleStateChange}
            stateRequests={stateRequests}
          />
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              filtered.length === 0 && !filterName ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                   { stateRequests === 'Todas las invitaciones' ||  stateRequests === 'All Invites' ? t('inputs.notFoundInvitations') : t('inputs.notFound2Invitations') } 
                </Alert>
               ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table stickyHeader>
                  <caption>{t('validations.captionTable')}</caption>
                  <InvitesListHead />
                  <TableBody>
                    {
                    
                    filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      // Extracting the data from the invitations
                      const { id, messageBody, status, coop, createdAt } = row;
                      // Defining the color based on the status
                      const colorStatus = status === 'APPROVED' ? '#00AB55' : status  === 'REJECTED' ? '#d11528' : '#787777';

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                              <TableCell sx={{ width:'auto', height:'auto', padding:'5px 30px 5px 30px', borderStyle:'solid', borderRadius:'40px', 
                              borderColor:colorStatus, color:'black' }}>{t('inputs.'+status)}</TableCell>
                          </TableCell>
                          <TableCell align="left" sx={{ width:'20%'}}>{coop.name} <br></br> {coop.email} </TableCell>
                          <TableCell align="left" sx={{ width:'40%'}}>{messageBody}</TableCell>
                          <TableCell align="left" sx={{ width:'20%'}}>  
                          {new Date(createdAt).toLocaleDateString(i18n.language, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                          </TableCell>
                          <TableCell align="left">
                            <InvitesMoreMenu row={row} />
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
               count={filteredInvitesUser.length}
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
  if (new Date(b?.[orderBy]) < new Date(a?.[orderBy])) {
    return -1;
  }
  if (new Date(b?.[orderBy]) > new Date(a?.[orderBy])) {
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
    return array.filter(invites => (invites.coop.name).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map(el => el[0]);
}
