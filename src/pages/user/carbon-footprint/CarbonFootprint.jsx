import { useTranslation } from 'react-i18next';
import { Card, Alert, TableContainer, Table, LinearProgress, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import Page from '../../../components/utils/Page';
import { CarbonoToolbar, EVTCalculateDialog } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmsCarbon } from './utils/getFarmsCarbon';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import CalcsTableHead from './components/CalcsTableHead';
import { setCalc } from '../../../redux/slices/huellaCarbono';
import { getValidationError } from '../../../utils/getValidationError';
import CalcsTableBody from './components/CalcsTableBody';
import EVTErrorComponent from './components/EVTErrorComponent';
import TotalComponent from './../../../components/tables-components/TotalTable'
import FilterTable from './../../../components/tables-components/FilterTable'

export default function CarbonFootprint() {
  const { t } = useTranslation('carbon-footprint');
  const [farmId, setFarmId] = useState('');
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { farms, farmCalcs, isLoading, emissions, error } = useSelector(state => state.huellaCarbonoSlice);
  const [filteredData, setFilteredData] = useState([]);
  const [plainDataFilter, setPlainDataFilter] = useState([]); 

  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) 
      dispatch(setCalc(value));
  };



  
  const handleClickOpen = () => {
    if (!farmId) {
      enqueueSnackbar(t('alerts.noFarmSelected'), { variant: 'error' });
      setOpen(false);
    } else setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getFarmsCarbon(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  useEffect(() => {
    const initialFilterData = farmCalcs.map(item => {
      return {
        ...item,
        year: item.detail.year,
        result: item.detail.result,
        consumption: item.detail.consumption
      }
    })
    setPlainDataFilter(initialFilterData)
    setFilteredData(initialFilterData);
  }, [farmCalcs])

  const handleFilter = filteredData => {
    setFilteredData(filteredData);
  };

  const efData = emissions.filter(e => farmCalcs.find(data => data.emissionFactor == e.id));
  const yearData = [...new Set(farmCalcs.map(e => e.detail.year))];
  
  
  const filters = [
    {
      name: t('filter.label.emissionFactor'),
      type: 'emissionFactor',
      values: efData.map( e => { return {label: e.name, key: e.id} })
    },
    {
      name: t('filter.label.year'),
      type: 'year',
      values: yearData.map(e => { return {label: e, key: e} })
    }
  ]

  return (
    <Page title={t('title')}>
      <Card sx={{ p: 2 }}>
        <CarbonoToolbar
          handleClickOpen={handleClickOpen}
          handleChange={handleChange}
          farms={farms}
          farmId={farmId}
          handleClose={handleClose}
          error={!!error}
          isLoading={isLoading}
        />

        <EVTCalculateDialog open={open} onClose={handleClose} farmId={farmId} />
        {/* <HhDialog /> */}
        {isLoading ? (
          <LinearProgress sx={{ my: 5 }} />
        ) : error ? (
          <EVTErrorComponent errMsg={getValidationError(error.code)} onReload={() => dispatch(getFarmsCarbon(user.id))} />
        ) : !farmCalcs.length && farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {t('alerts.noCarbonFoorprintCalc')}
          </Alert>
        ) : filteredData.length && farmId ? (
          <Scrollbar sx={{ maxHeight: '50%' }}>
            <TableContainer sx={{ minWidth: 800, my: 1, p: 0 }}>
              <FilterTable filters={filters} data={plainDataFilter} onFilter={handleFilter} t={t}/>
              <Table stickyHeader>
                <CalcsTableHead />
                <CalcsTableBody isLoading={isLoading} farmCalcs={filteredData} emissions={emissions} farmId={farmId} />
              </Table>
              {filteredData.length && farmId && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  <TotalComponent dataToSum={filteredData.map(c => c.detail.result)} unit={'Kg CO2eq'} title={'Total de Huella de Carbono'} />
                </Box>
            )}
            </TableContainer>
          </Scrollbar>
        ) : (
          <></>
        )}
      </Card>
    </Page>
  );
}
