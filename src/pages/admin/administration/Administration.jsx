import { useParams } from 'react-router-dom';
import { AdministrationCards } from './components/AdministrationCards';
import SvgColor from '../../../components/svg-color/SvgColor';
import { Grid, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../../components/utils/Page';
import HeaderBreadcrumbs from '../../../components/utils/HeaderBreadcrumbs';
import { getButtons } from './components/AdministrationButtons';
import { useTranslation } from 'react-i18next';

export const Administration = () => {
  const { t } = useTranslation(["navigation"]);
  const navigate = useNavigate();
  const { page } = useParams();
  const modules = getButtons(100, page,t);

  return (
    <Page title={t('adminModules.management')}>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ paddingTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={12}>
            {<HeaderBreadcrumbs heading={t('adminModules.managementLong')} links={modules[0].breadcum?.links} />}
          </Grid>

          <Grid item>
            {page !== undefined && (
              <IconButton onClick={() => navigate('/dashboard/main/records/')}>
                <SvgColor src={`/assets/icons/records/return.svg`} sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <AdministrationCards page={page} />
      </Container>
    </Page>
  );
};
