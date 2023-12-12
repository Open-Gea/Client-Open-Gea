import { useTranslation } from 'react-i18next';
import { Card, Alert, TableContainer, Table, LinearProgress, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import Page from '../../../../components/utils/Page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFarmsByCooperative, getFarmsCarbon } from './utils/getFarmsCarbon';
import { getValidationError } from '../../../../utils/getValidationError';
import { CarbonoToolbar } from './components';
import { setCalc } from '../../../../redux/slices/huellasCarbonoCooperativa';
import CalcsTableHead from './components/CalcsTableHead';
import CalcsTableBody from './components/CalcsTableBody';
import EVTErrorComponent from './components/EVTErrorComponent';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';



export default function CarbonFootprints() {
  const { t, i18n } = useTranslation('carbon-footprint');
  const [farmId, setFarmId] = useState('');
  const [year,setYear] = useState('');
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();



  const dispatch = useDispatch();
  const { cooperative, isCooperative } = useSelector(state => state.authSlice);
  // const { farms,isLoading,error } = useSelector(state => state.huellasCarbonoCooperativaSlice);
  const { farms, farmCalcs, isLoading, emissions, error } = useSelector(state => state.huellasCarbonoCooperativaSlice);

  const handleChange = event => {
    console.log("FarmID Changed "+event.target);
    const value = event.target.value;
    setFarmId(value);

    if (value) dispatch(setCalc(value,year));
  };

  const handleYearChange = event => {
    const value = event.target.value;
    console.log("Year Changed  "+event.target.value);
    setYear(value);
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
    // Setting the default value for year
    if(i18n.language === 'en') {
      setYear('All Years');
    }else{
      setYear('Todos los Años');
    }

    // Getting all the farms related to the current cooperative
    dispatch(getFarmsByCooperative(cooperative.id));
  }, [dispatch]);
  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title='Huella de Carbono'>
      <Card sx={{ p: 2 }}>
        <CarbonoToolbar
          handleClickOpen={handleClickOpen}
          handleChange={handleChange}
          handleYearChange={handleYearChange}
          farms={farms}
          year={year}
          farmId={farmId}
          handleClose={handleClose}
          error={!!error}
          isLoading={isLoading}
        />

        {isLoading ? (
          <LinearProgress sx={{ my: 5 }} />
        ) : error ? (
          <EVTErrorComponent errMsg={getValidationError(error.code)} onReload={() => dispatch(getFarmsByCooperative(cooperative.id))} />
        ) : !farmCalcs.length && farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {t('alerts.noCarbonFoorprintCalc')}
          </Alert>
        ) : !farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {t('alerts.selectFarm')}
          </Alert>
        ) : farmCalcs.length && farmId ? (
          <Scrollbar sx={{ maxHeight: '50%' }}>
            <TableContainer sx={{ minWidth: 800, my: 1, p: 0 }}>
              <Table stickyHeader>
                <CalcsTableHead />
                <CalcsTableBody isLoading={isLoading} farmCalcs={farmCalcs} emissions={emissions} farmId={farmId} year={year} />
              </Table>
            </TableContainer>
          </Scrollbar>
        ) : (
          <></>
        )}
      </Card>
    </Page>
  );
}
