import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Toolbar, Stack, FormControl, InputLabel, Select, MenuItem, Button, InputAdornment } from '@mui/material';

import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import InputStyle from './InputStyle';
import Iconify from './Iconify';
import FilterChip from './FilterChip';
import { useTranslation } from 'react-i18next';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1, 1, 3),
}));

export default function GenericToolbar({
  idValue,
  handleChange,
  menuElements,
  handleClickOpen,
  error,
  isLoading,
  breadcrumbs,
  bcLinks,
  labels,
  hasMenu = true,
  searchInput = false,
  searchValue,
  handleSearchChange,
  searchPlaceholder,
  filterChipLabels,
  handleResetFilter,
  disable=false
}) {
  const { t } = useTranslation('records');
  return (
    <>
      {breadcrumbs ? (
        <RootStyle>
          <HeaderBreadcrumbs heading={labels.bcTitle} sx={{ mb: 0 }} links={bcLinks} />
        </RootStyle>
      ) : (
        <> </>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        {hasMenu && (
          <FormControl sx={{ minWidth: '50%' }}>
            <InputLabel id="demo-simple-select-label">{labels.inputLabel}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idValue}
              label="Finca"
              onChange={handleChange}
              sx={{ ml: 1 }}
              disabled={!!error || isLoading}
            >
              <MenuItem value="">
                <em>{t('recordsCommon.none')}</em>
              </MenuItem>
              {menuElements?.map(element => (
                <MenuItem key={element.id} value={element.id}>
                  {element.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        { !disable &&
          <Button variant="contained" onClick={handleClickOpen} disabled={!!error || isLoading}>
          {labels.buttonLabel}
        </Button>}
        {(searchInput && !disable) && (
          <InputStyle
            stretchStart={200}
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        <FilterChip filters={filterChipLabels} handleResetFilter={handleResetFilter} />
      </Stack>
    </>
  );
}

GenericToolbar.propTypes = {
  idValue: PropTypes.string,
  handleClickOpen: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  menuElements: PropTypes.array,
  error: PropTypes.bool,
  breadcrumbs: PropTypes.bool,
  isLoading: PropTypes.bool,
  bcLinks: PropTypes.array,
  labels: PropTypes.object,
  hasMenu: PropTypes.bool,
  searchInput: PropTypes.bool,
  searchValue: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleResetFilter: PropTypes.func,
  filterChipLabels: PropTypes.object,
};
