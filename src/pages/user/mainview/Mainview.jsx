import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTermsConditions, setCooperativeNull, setUserNull, acceptTermsConditionsCooperative } from '../../../redux/slices/auth';
// @mui
import { Container } from '@mui/material';
// components
import { ModuleCards } from '../../../components/module-cards';
import { ModuleCardsCooperatives } from '../../../components/module-cards-cooperative';
import StepsQrBreadcums from './components/StepsQrBreadcums';
import TermsAndConditionsModal from '../../../components/register-form/TermsAndConditionsModal';

// Translation module
import { useTranslation } from 'react-i18next';

// sections

// ----------------------------------------------------------------------

export default function DashboardUser() {

  const { user, cooperative, isCooperative } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Adding validation to check if cooperative is logged or an user is logged in
  const [isTermsConditionsModalOpen, setIsTermsConditionsModalOpen] = (user===null ? useState(!cooperative.acceptedTermsConditions): useState(!user.acceptedTermsConditions));

  const handleTermsConditionsChange = isAccepted => {
    if (!isAccepted) {
      if(isCooperative && (cooperative !== null)){
        dispatch(setCooperativeNull());
      }else{
        dispatch(setUserNull());
      }
      navigate('/dashboard/main');

    } else {
      if(isCooperative && (cooperative !== null)){
        dispatch(acceptTermsConditionsCooperative({ id: cooperative.id }))
      }else{
        dispatch(acceptTermsConditions({ id: user.id }))
      }
    }
  };

   // Added for translations
   const { t } = useTranslation('navigation');

  return (
    <>
      <Helmet>
        <title> {t('actions.home')} | yvy </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <StepsQrBreadcums /> */}
        { isCooperative ? <ModuleCardsCooperatives /> :  <ModuleCards />}
      </Container>

      <TermsAndConditionsModal
        oldUser
        isOpen={isTermsConditionsModalOpen}
        setIsOpen={setIsTermsConditionsModalOpen}
        onModalClose={handleTermsConditionsChange}
      />
    </>
  );
}
/**
 * TODO: Change hard-coded module names for locale variable ones
 * @returns {Component} Big Card Buttons for modules
 */
