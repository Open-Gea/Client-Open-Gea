import { useTranslation } from 'react-i18next';
// mui
import styled from '@mui/material/styles/styled';
import { Chip, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { resetFilteredUsers } from '../../../../../redux/slices/systemUsers';

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

const FilterChip = () => {
  const { t } = useTranslation('farms');
  const dispatch = useDispatch();
  const { filterCountry } = useSelector(s => s.systemUsersSlice);
  return (
    <RootStyle>
      {filterCountry !== 'All' && (
        <WrapperStyle>
          <LabelStyle>{t('inputs.country')}:</LabelStyle>
          <Chip size="small" label={filterCountry} onDelete={() => dispatch(resetFilteredUsers())} sx={{ m: 0.5 }} />
        </WrapperStyle>
      )}
    </RootStyle>
  );
};

export default FilterChip;
