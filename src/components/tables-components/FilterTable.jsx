import React, { useState } from 'react';
import { Select, MenuItem, Button, FormControl, InputLabel, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FilterTable = ({ filters, data, onFilter, t }) => {
  const [filterValue, setFilterValue] = useState({key:'',label:'' });
  const [filterType, setFilterType] = useState('');
  const [filterOptions, setFilterOptions] = useState([])
  const [flagFilter, setFlagFilter] = useState(false);

  const filtersType = filters.map(e => e.name);
  const { t: tCommon } = useTranslation('common');

  const applyFilters = () => {
    let filteredData = [];
    if(filterValue.key !== '' && filterType !== ''){
        if(!flagFilter) filteredData = data.filter(item => item[filterType] === filterValue.key);
        else filteredData = data;
        setFlagFilter(!flagFilter)
        onFilter(filteredData);
    }
  };

  const handleFilterValue = (e) => {
    const label = filterOptions.find(f => f.key === e.target.value)?.label || ""
    setFilterValue({
        key: e.target.value, 
        label
    })
    setFlagFilter(false);
  }

  const handleTypeFilter = (e) => {
    setFilterType(e.target.value);
    setFilterOptions(filters.find(f => f.type === e.target.value)?.values || []);
    setFlagFilter(false);
    if(e.target.value=== '') onFilter(data);
  }

  return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} padding={1}>
            <FormControl sx={{ minWidth: '20%' }}>
                    <InputLabel id="demo-simple-select-label">{t('filter.label.filterBy')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        defaultValue=""
                        id="demo-simple-select"
                        label={t('filter.label.filterBy')}
                        value={filterType}
                        sx={{ ml: 1 }}
                        onChange={handleTypeFilter}
                    >
                        <MenuItem value="">
                            <em>{tCommon('defaultSelectValue')}</em>
                        </MenuItem>
                        {filtersType.map((typeName, index) => (
                        <MenuItem key={index} value={filters.find(f => f.name === typeName).type}>{typeName}</MenuItem>
                        ))}
                    </Select>    
            </FormControl>
            {
                filterType !== '' &&
                <FormControl sx={{ minWidth: '20%' }}>
                    <InputLabel id="demo-simple-select-label">{t('filter.label.filter')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        defaultValue=""
                        id="demo-simple-select"
                        label={t('filter.label.filter')}
                        value={filterValue.key || ''}
                        sx={{ ml: 1 }}
                        onChange={handleFilterValue}
                        >
                        {filterOptions.map(option => (
                            <MenuItem key={option.key} value={option.key}>{option.label}</MenuItem>
                            ))}
                    </Select>    
            </FormControl>
            }
                <Button variant="contained" onClick={applyFilters}>{flagFilter ? t('filter.noFilter') : t('filter.applyFilter')}</Button>
        </Stack>

  );
};

export default FilterTable;
