import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// notistack
import { useSnackbar } from 'notistack';
// utils
import { getValidationError } from '../../../../utils/getValidationError';

export default function useRecords({ getters, ueDependencies }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);
  const { isLoading, error } = useSelector(state => state.recordsSlice);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dependecies = ueDependencies ? [dispatch].concat(ueDependencies) : [dispatch];

  const handleChangeRowsPerPage = value => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleClose = e => setOpen(false);

  const handleOpen = e => setOpen(true);

  const onPageChange = (e, page) => setPage(page);

  useEffect(() => {
    getters.forEach(func => {
      dispatch(func(user.id));
    });
  }, dependecies);

  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);
  return { open, page, rowsPerPage, handleChangeRowsPerPage, handleClose, handleOpen, onPageChange };
}
useRecords.propTypes = {
  getters: PropTypes.array.isRequired,
  ueDependencies: PropTypes.array,
};
