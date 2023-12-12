import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// hooks

// pages
import LoginPage from '../pages/auth/LoginPage';
import LoginPageAdmin from '../pages/auth/LoginPageAdmin';
// components
import LoadingScreen from '../components/utils/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import {isUserActive, isCooperativeActive } from '../../src/pages/user/userProfile/utils/getUser';
import { setUserNull } from '../redux/slices/auth';
import useIsMountedRef from '../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { user, cooperative, isAuthenticated, isLoading, isCooperative, isAdmin } = useSelector(s => s.authSlice);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const dispatch = useDispatch();

  // ADD ALL THE COOPERATIVES ROUTES HERE IN ORDER TO LET THE COOPERATIVE ENTER AS REQUIRED
  const routesAllowedByCooperative = [
    '/dashboard/main/myFarms',
    '/dashboard/main/myFarms/page/carboonFootprints',
    '/dashboard/main/myFarms/page/waterFootprints',
    '/dashboard/main/myFarms/page/farmsInformation',
    '/dashboard/main/myFarms/page/agronomicData',
    '/dashboard/main/myFarms/page/wateringNeeds',
    '/dashboard/main/members',
    '/dashboard/main/members/page/myMembers',
    '/dashboard/main/members/page/invitesInformation',
    '/dashboard/main/members/page/requestsInformation',
    '/dashboard/main/georeferencing',
    '/dashboard/main/myOrganization',
    '/dashboard/main/cooperativeProfile',
  ]


  // Verify if the user and close session if it is no longer active
  async function checkActiveUser(){
  let isActive = true;
    try{
      if(isCooperative){
        isActive=  await isCooperativeActive(cooperative.id);
      }else{
        isActive=  await isUserActive(user.id);
      }
    } catch(e){ return e}

    if(!isActive){ 
      logoutUser();
    }
  }

  // Logout the user if it is inactivated
  function logoutUser(){
    try {
      navigate('/');
      dispatch(setUserNull());
      // Cleaning the data saved in the session
      // localStorage.clear();
      sessionStorage.clear()
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    // Verifying if the user is authenticated
    if (isAuthenticated) {
      checkActiveUser();
      // Checking if it's accesing as an admin user
      if (isAdmin && (pathname === '/register' || pathname === '/login' || pathname === '/loginAdmin')){
        navigate('/dashboard/admin');
      } else if (pathname === '/register' || pathname === '/login' || pathname === '/loginAdmin'){
        navigate('/dashboard/main');
      }
    }

  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    // If it's not authenticated, sending the user to the requested login location
    if(requestedLocation === '/loginAdmin'){
      return <LoginPageAdmin />;
    }else{
      return <LoginPage />;
    }
  }

  // Check if the user is authenticated and after that if the status is ACTIVE
  if(isAuthenticated){
    checkActiveUser();    
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // Validating the access to the route requested
  if((pathname === '/' || pathname === '/dashboard/main') && !(isAdmin) ) {
      return <>{children}</>;
  }else{

    // Checking the coopertive access
    if(isCooperative === true) {
      if(routesAllowedByCooperative.includes(pathname)){
        return <>{children}</>;
      }else{
        return <Navigate to='/dashboard/main' />;
      }

    }else{
      // Checking the admin access
      if(isAdmin === true){
        if(pathname.includes('/dashboard/admin')){
          return <>{children}</>;
        }else{
          return <Navigate to='/dashboard/admin' />;
        }

      }else{
        // Checking the normal user access
        if(routesAllowedByCooperative.includes(pathname) || (pathname.includes('/dashboard/admin'))){
          return <Navigate to='/dashboard/main' />;
        }else{
          return <>{children}</>;
        }
      }
    }
  }

}
