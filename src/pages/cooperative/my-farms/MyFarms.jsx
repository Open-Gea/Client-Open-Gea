import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MyFarmsCards } from './components/MyFarmsCards';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SvgColor from '../../../components/svg-color/SvgColor';
import { Grid, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../../components/utils/Page';
import HeaderBreadcrumbs from '../../../components/utils/HeaderBreadcrumbs';
import { getButtons } from './components/MyFarmsButtons';
import { useTranslation } from 'react-i18next';

export const MyFarms = () => {
  const { farms, currentFarm } = useSelector(state => state.recordsSlice);
  const { user } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();
  const { t } = useTranslation(["navigation"]);

  const [farmId, setFarmId] = useState(currentFarm?.id !== undefined ? currentFarm.id : '');
  const navigate = useNavigate();
  const { page } = useParams();
  const modules = getButtons(100, page,t);


  return (
    <Page title={t('modules.farms')}>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ paddingTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={12}>
            {<HeaderBreadcrumbs heading={t('modules.farmsAssociated')} links={modules[0].breadcum?.links} />}
          </Grid>

          <Grid item>
            {page !== undefined && (
              <IconButton onClick={() => navigate('/dashboard/main/records/')}>
                <SvgColor src={`/assets/icons/records/return.svg`} sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <MyFarmsCards page={page} />
      </Container>
    </Page>
  );
};
