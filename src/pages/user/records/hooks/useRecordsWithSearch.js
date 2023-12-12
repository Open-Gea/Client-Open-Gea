import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// notistack
import { useSnackbar } from 'notistack';
// utils
import { getValidationError } from '../../../../utils/getValidationError';

export default function useRecordsWithSearch({ getters, ueDependencies, data, filteredData, searchFilter }) {
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
  const [searchName, setSearchName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(searchFilter);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const filtered = applySortFilter(filteredData, getComparator(order, orderBy), searchName);
  const isNotFound = !filtered.length && Boolean(searchName);

  const handleSearchChange = e => setSearchName(e.target.value);
  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return array.filter(_user => _user[searchFilter].toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map(el => el[0]);
  }
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
  return {
    open,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleClose,
    handleOpen,
    onPageChange,
    filtered,
    isNotFound,
    emptyRows,
    handleSearchChange,
    handleRequestSort,
    searchName,
    order,
    orderBy,
  };
}
useRecordsWithSearch.propTypes = {
  getters: PropTypes.array.isRequired,
  ueDependencies: PropTypes.array,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
    return -1;
  }
  if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}
