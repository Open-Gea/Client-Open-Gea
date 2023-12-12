import { useTranslation } from 'react-i18next';
import { Card, Alert, TableContainer, Table, LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import Page from '../../../../components/utils/Page';
import { EvaTransToolbar } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmsEvo } from './utils/getFarmsEvo';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import CalcsTableHead from './components/CalcsTableHead';
import { setCalc } from '../../../../redux/slices/evotranspiracionCooperativa';
import { getValidationError } from '../../../../utils/getValidationError';
import CalcsTableBody from './components/CalcsTableBody';
import EVTErrorComponent from './components/EVTErrorComponent';

export default function Evapotranspiration() {
  const { t, i18n } = useTranslation('water-footprint');
  const [farmId, setFarmId] = useState('');
  const [year,setYear] = useState('');
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { user, cooperative, isCooperative } = useSelector(state => state.authSlice);
  const { farms, farmCalcs, isLoading, products, error } = useSelector(state => state.evotranspiracionCooperativaSlice);

  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) dispatch(setCalc(value));
  };

  const handleClickOpen = () => {
    if (!farmId) {
      enqueueSnackbar(t('validations.noFarmSelected'), { variant: 'error' });
      setOpen(false);
    } else setOpen(true);
  };

  const handleYearChange = event => {
    const value = event.target.value;
    setYear(value);
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

    dispatch(getFarmsEvo(cooperative.id));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);

  return (
    <Page title={t('title')}>
      <Card sx={{ p: 2 }}>
        <EvaTransToolbar
          handleChange={handleChange}
          handleYearChange={handleYearChange}
          year={year}
          farms={farms}
          farmId={farmId}
          handleClose={handleClose}
          error={!!error}
          isLoading={isLoading}
        />

        {isLoading ? (
          <LinearProgress sx={{ my: 5 }} />
        ) : error ? (
          <EVTErrorComponent errMsg={getValidationError(error.code)} onReload={() => dispatch(getFarmsEvo(cooperative.id))} />
        ) : !farmCalcs.length && farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {
              t('validations.noCalculationDoneAlert')
            }
          </Alert>
        ) : !farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {t('inputs.waterFootprintsMessage')}
          </Alert>
        ): farmCalcs.length && farmId ? (
          <Scrollbar sx={{ maxHeight: '50%' }}>
            <TableContainer sx={{ minWidth: 800, my: 1, p: 0 }}>
              <Table stickyHeader>
                <CalcsTableHead />
                <CalcsTableBody isLoading={isLoading} farmCalcs={farmCalcs} products={products} year={year} />
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
