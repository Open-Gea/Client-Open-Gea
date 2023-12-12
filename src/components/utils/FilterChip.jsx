import PropTypes from 'prop-types';
// mui
import styled from '@mui/material/styles/styled';
import { Chip, Typography } from '@mui/material';

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

const LabelStyle = styled(props => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));

const FilterChip = ({ filters = {}, handleResetFilter }) => {
  return (
    <RootStyle>
      {filters.name && (
        <WrapperStyle>
          <LabelStyle>{filters.name}:</LabelStyle>
          <Chip size="small" label={filters.value} onDelete={() => handleResetFilter()} sx={{ m: 0.5 }} />
        </WrapperStyle>
      )}
    </RootStyle>
  );
};

export default FilterChip;
FilterChip.propTypes = {
  handleResetFilter: PropTypes.func,
  filters: PropTypes.object.isRequired,
};
