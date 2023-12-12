import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { ModuleCardsAdmin } from '../../../components/module-cards-admin/ModuleCardsAdmin';
// translation
import { useTranslation } from 'react-i18next';
// sections

// ----------------------------------------------------------------------

export const DashboardAdmin = () => {
  const { t } = useTranslation(["navigation"]);

  return (
    <>
      <Helmet>
        <title>{t('adminModules.header')}</title>
      </Helmet>

      <Container maxWidth="xl">
        <ModuleCardsAdmin />
      </Container>
    </>
  );
};
/**
 * TODO: Change hard-coded module names for locale variable ones
 * @returns {Component} Big Card Buttons for modules
 */
