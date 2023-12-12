import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFoundMembers.propTypes = {
  searchQuery: PropTypes.string,
  t: PropTypes.func,
};

export default function SearchNotFoundMembers({ searchQuery = '', t, ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {t('messages.notFound')}
      </Typography>
      <Typography variant="body2" align="center">
        {t('messages.noCoincidence')} &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> {t('messages.pleaseEnterAWord')}</Typography>
  );
}
