import { useParams } from 'react-router-dom';
import { MyCooperativeCards } from './components/MyCooperativeCards';
import SvgColor from '../../../components/svg-color/SvgColor';
import { Grid, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../../components/utils/Page';
import HeaderBreadcrumbs from '../../../components/utils/HeaderBreadcrumbs';
import { getButtons } from './components/MyCooperativeButtons';
import { useTranslation } from 'react-i18next';

export const MyCooperative = () => {
  const { t } = useTranslation(["navigation"]);
  const navigate = useNavigate();
  const { page } = useParams();
  const modules = getButtons(100, page,t);

  return (
    <Page title={t('cooperativeModules.myCooperative')}>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ paddingTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={12}>
            {<HeaderBreadcrumbs heading={t('cooperativeModules.myCooperative')} links={modules[0].breadcum?.links} />}
          </Grid>

          <Grid item>
            {page !== undefined && (
              <IconButton onClick={() => navigate('/dashboard/main/records/')}>
                <SvgColor src={`/assets/icons/records/return.svg`} sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <MyCooperativeCards page={page} />
      </Container>
    </Page>
  );
};
