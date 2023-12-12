import { useEffect,useState } from 'react';
// @mui
import { Alert, Card, Button,Dialog, DialogTitle, DialogContent, DialogActions, Container, LinearProgress, TableBody, TableRow, TableCell } from '@mui/material';
// components
import Page from '../../../../components/utils/Page';
import SearchNotFoundMembers from '../../../../components/utils/SearchNotFoundMembers';
// sections
import { MembersToolbar, MembersMoreMenu } from './components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { removeUserFromCooperative } from '../../../../redux/slices/membersCooperativa';
import { getMembersByCooperative } from './utils/getMembers';
import 'leaflet/dist/leaflet.css';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import { useSnackbar } from 'notistack';
import { getValidationError } from '../../../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../../components/utils/HeaderBreadcrumbs';
// Required for the Image List Component:
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DefaultProfilePicture from '../../../../../src/assets/mainviewImg/default_profile_picture.jpg';

// ----------------------------------------------------------------------

export function MyMembers() {
  const { t } = useTranslation('members-management');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useDispatch();
  const { order, orderBy, filterName, filteredMembers, isLoading, error } = useSelector(state => state.membersCooperativaSlice);
  const { cooperative } = useSelector(s => s.authSlice);
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const filtered = applySortFilter(filteredMembers, getComparator(order, orderBy), filterName);
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

  // Define image for the autocomplete, default image if the user is not having a profile picture available
  const createImageSrc = (data) => {
    if(data === undefined){
      return DefaultProfilePicture;
    }else{
      if(data.profilePicture === null){
        return DefaultProfilePicture;
      }else{
        return URL.createObjectURL(new Blob([new Uint8Array((data.profilePicture)?.data)], { type: 'image/png' }));
      }
    }
  };

  useEffect(() => {
    dispatch(getMembersByCooperative(cooperative.id));
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
            heading={t('title')}
            sx={{ mb: 0 }}
            links={[
              { name: t('navigation.home'), href: '/dashboard/main' },
              { name: t('navigation.membersManagement'), href: '/dashboard/main/members' },
              { name: t('navigation.myMembers'), href: '/dashboard/main/members/page/myMembers' },
            ]}
          />
        <Card>
          <MembersToolbar />
          <br />
          <Scrollbar sx={{ maxHeight: '50%' }}>
            {isLoading ? (
              <LinearProgress sx={{ my: 5 }} />
            ) : (
              <ImageList sx={{ maxWidth: '100%', height: '60%'  }} cols={4} >
              {filtered.map((row) => (
                  <ImageListItem key={row.img}>
                    <img
                      src={`${createImageSrc(row)}`}
                      style={{fit:'crop', auto:'format'}}
                      srcSet={`${createImageSrc(row)} 2x`}
                      alt={row.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={row.displayName + ' '+row.lastName}
                      subtitle={row.country}
                      actionIcon={
                        <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${'sss'}`}
                        >
                        <MembersMoreMenu  row={row} user={row} />
                      </IconButton>
                      }      
                    />
                </ImageListItem>
              ))}
               {isNotFound  && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                          <SearchNotFoundMembers searchQuery={filterName} t={t}/>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
            </ImageList>
            

            )}
          </Scrollbar>
          {filtered.length === 0 && !filterName && (
            <Alert severity="info" sx={{ mt: 2 }}>
                {t('messages.emptyMembers')}
            </Alert>
           )}

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
    return array.filter(_user => _user.displayName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}
