import { useEffect,useState } from 'react';
import axios from 'axios';
// @mui
import { Alert, Card, Table, TableRow, TableBody, TableCell, Container, TableContainer, TablePagination,LinearProgress } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFound from '../../../../components/utils/SearchNotFound';
// sections
import { UserListHead, OrganizationListHead, UsersInformationToolbar, UsersMoreMenu } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { handleChangeRowsPerPage, setPage } from '../../../../redux/slices/systemUsers';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
// utils 
import { getAllUsers } from './utils/getUsers';
// ----------------------------------------------------------------------

export function UsersInformation() {
  const { i18n, t } = useTranslation('users-management');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { page, rowsPerPage, order, orderBy, filterName, filteredUsers, isLoading, error } = useSelector(state => state.systemUsersSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Handle the state change
  const [stateUsers,setStateUsers] = useState('');
  // Handle the user state change 
  const [stateTypeUser,setStateTypeUser] = useState('');


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;
  let filtered = applySortFilter(filteredUsers, getComparator(order, orderBy), filterName, stateTypeUser);

  if(stateUsers){
    // Filter by the state selected
    filtered = filtered.filter(function(user){
        if(i18n.language === 'en') {
          if(stateUsers !== 'All users'){
            return  (user?.status[0]?.toLowerCase()) === (stateUsers[0]?.toLowerCase());
          }else{
            return true;
          }    
        }else{
          if(stateUsers !== 'Todos los usuarios'){
            return transformOutput(user?.status[0]?.toLowerCase()) === (stateUsers[0]?.toLowerCase());
          }else{
            return true;
          }    
        }
    }); 
  }else{
    // Define the default state if it is null or not defined
    if(i18n.language === 'en') {
      setStateUsers('All users');
    }else{
      setStateUsers('Todos los usuarios');
    }
  }

  if(!stateTypeUser){
     // Define the default state if it is null or not defined
     if(i18n.language === 'en') {
        setStateTypeUser('Farmers');
      }else{
        setStateTypeUser('Productores');
      }
  }

  const isNotFound = !filtered.length && Boolean(filterName);

  const handleStateChange = event => {
    const value = event.target.value;
    setStateUsers(value);
  };
  function transformOutput(element){
    return (element === 'd') ? 'i' : element;
  }
  function isOrganization(element){
    return (element[0]?.toLowerCase() === 'o');
  }


  // User Type change
  const handleStateTypeUser = event => {
    const value = event.target.value;
    setStateTypeUser(value);
    dispatch(getAllUsers(value));
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
    // Setting the default value for year and type of user
    if(i18n.language === 'en') {
      setStateUsers('All users');
    }else{
      setStateUsers('Todos los usuarios');
    }

    dispatch(getAllUsers(stateTypeUser));
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
              { name: t('inputs.home'), href: '/dashboard/admin' },
              { name: t('title'), href: '/dashboard/admin/administration' },
              { name: t('title2'), href: '/dashboard/admin/administration/page/usersInformation' },
            ]}
          />
        <Card>
          <UsersInformationToolbar 
            handleStateChange={handleStateChange}
            stateUsers={stateUsers}
            handleStateTypeUser={handleStateTypeUser}
            stateTypeUser={stateTypeUser}
          />
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (

              filtered.length === 0 && !filterName ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                   { stateUsers === 'Todos los usuarios' ||  stateUsers === 'All users' ? t('inputs.notFoundUsers') : t('inputs.notFoundUsers2') } 
                </Alert>
               ) : (

              <TableContainer sx={{ minWidth: 800 }}>
                <Table stickyHeader>
                  {isOrganization(stateTypeUser) ? <OrganizationListHead /> : <UserListHead /> }
                  <TableBody>
                      {
                      filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      // Extracting the data from the user information
                      const { id, name, displayName, lastName, country, status, email, phone, createdAt } = row;
                      // Defining the color based on the status
                      const colorStatus = status === 'ACTIVE' ? '#00AB55' : '#787777';

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <TableCell sx={{ width:'110px', height:'35px', padding:'5px 30px 5px 30px', borderStyle:'solid', borderRadius:'40px', 
                                borderColor:colorStatus, color:'black' }}> <center> {t('inputs.'+status)} </center>
                            </TableCell>
                          </TableCell>
                          <TableCell align="left"> {!isOrganization(stateTypeUser) ? displayName+' '+lastName : name } </TableCell>
                          <TableCell align="left">{country}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          {!isOrganization(stateTypeUser) ? <TableCell align="left">{phone}</TableCell> : ''}                         
                          <TableCell align="left">{new Date(createdAt).toLocaleDateString(i18n.language, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                          </TableCell>
                          <TableCell align="right">
                            <UsersMoreMenu  row={row} /> 
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
          

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
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
  if (b?.[orderBy]?.toLowerCase() < a?.[orderBy]?.toLowerCase()) {
    return -1;
  }
  if (b?.[orderBy]?.toLowerCase() > a?.[orderBy]?.toLowerCase()) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, stateTypeUser) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if(stateTypeUser[0]?.toLowerCase() === 'o'){
      return array.filter(_user => (_user?.name)?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }else{
      return array.filter(_user => (_user?.displayName)?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
  }
  return stabilizedThis.map(el => el[0]);
}
