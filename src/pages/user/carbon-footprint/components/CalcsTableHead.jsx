// @mui
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const headLabel = (t) => [
  { id: 'fecha', label: t('calcTable.dateLabel'), alignRight: false },
  { id: 'product', label: t('calcTable.productLabel'), alignRight: false },
  { id: 'result', label: t('calcTable.resultLabel'), alignRight: false },
  { id: 'year', label: t('calcTable.yearLabel'), alignRight: false },
  { id: 'detail', label: t('calcTable.detailsLabel'), alignRight: false },
  { id: 'actions', label: t('calcTable.actionslabel'), alignRight: false },

];

export default function CalcsTableHead() {
  const { t } = useTranslation('carbon-footprint');

  return (
    <TableHead>
      <TableRow>
        {headLabel(t).map(headCell => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            <TableSortLabel hideSortIcon disabled>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
