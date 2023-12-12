import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        Ninguna coincidencia encontrada para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Por favor introduce una palabra</Typography>
  );
}
