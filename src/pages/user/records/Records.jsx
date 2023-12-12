import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RecordCards } from './components/RecordCards';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SvgColor from '../../../components/svg-color/SvgColor';
import { Grid, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../../components/utils/Page';
import { getFarmsRecords } from './utils/getFarmsRecords';
import HeaderBreadcrumbs from '../../../components/utils/HeaderBreadcrumbs';
import { getButtons } from './components/RecordsButtons';
import { handleCurrentLots } from '../../../redux/slices/records';
// Translation module
import { useTranslation } from 'react-i18next';

export const Records = () => {
  const { farms, currentFarm } = useSelector(state => state.recordsSlice);
  const { user } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const [farmId, setFarmId] = useState(currentFarm?.id !== undefined ? currentFarm.id : '');
  const navigate = useNavigate();
  const { page } = useParams();

  const modules = getButtons(100, page);

  // Added the translation for the tittle and other translations
  const { t } = useTranslation('records');

  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) {
      dispatch(handleCurrentLots(value));
    }
  };

  useEffect(() => {
    dispatch(getFarmsRecords(user.id));
  }, [dispatch]);

  return (
    <Page title={t('title')}>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ paddingTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={12}>
            {<HeaderBreadcrumbs heading={t('title')} links={modules[0].breadcum?.links} />}
          </Grid>

          <Grid item>
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">{t('recordsCommon.farm')}</InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={farmId}
                label={t('recordsCommon.farm')}
                onChange={handleChange}
              >
                {farms.map(farm => (
                  <MenuItem key={farm.id} value={farm.id}>
                    {farm.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {page !== undefined && (
              <IconButton onClick={() => navigate('/dashboard/main/records/')}>
                <SvgColor src={`/assets/icons/records/return.svg`} sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <RecordCards page={page} />
      </Container>
    </Page>
  );
};
