import { useTranslation } from 'react-i18next';
import { Card, Alert, TableContainer, Table, LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import Page from '../../../components/utils/Page';
import { EvaTransToolbar, EVTCalculateDialog } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmsEvo } from './utils/getFarmsEvo';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import CalcsTableHead from './components/CalcsTableHead';
import { setCalc } from '../../../redux/slices/evotranspiracion';
import { getValidationError } from '../../../utils/getValidationError';
import CalcsTableBody from './components/CalcsTableBody';
import EVTErrorComponent from './components/EVTErrorComponent';
import HhDialog from './components/HhDialog';

export default function Evapotranspiration() {
  const { t } = useTranslation('water-footprint');
  const [farmId, setFarmId] = useState('');
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { farms, farmCalcs, isLoading, products, error } = useSelector(state => state.evotranspiracionSlice);

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

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getFarmsEvo(user.id));
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
          handleClickOpen={handleClickOpen}
          handleChange={handleChange}
          farms={farms}
          farmId={farmId}
          handleClose={handleClose}
          error={!!error}
          isLoading={isLoading}
        />

        <EVTCalculateDialog open={open} onClose={handleClose} farmId={farmId} />
        <HhDialog />
        {isLoading ? (
          <LinearProgress sx={{ my: 5 }} />
        ) : error ? (
          <EVTErrorComponent errMsg={getValidationError(error.code)} onReload={() => dispatch(getFarmsEvo(user.id))} />
        ) : !farmCalcs.length && farmId ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {
              t('validations.noCalculationDoneAlert')
            }
          </Alert>
        ) : farmCalcs.length && farmId ? (
          <Scrollbar sx={{ maxHeight: '50%' }}>
            <TableContainer sx={{ minWidth: 800, my: 1, p: 0 }}>
              <Table stickyHeader>
                <CalcsTableHead />
                <CalcsTableBody isLoading={isLoading} farmCalcs={farmCalcs} products={products} />
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
