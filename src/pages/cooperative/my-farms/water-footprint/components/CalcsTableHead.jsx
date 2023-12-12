// @mui
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const headLabel = (t) => [
  { id: 'fecha', label: t('footprintTable.dateHeader'), alignRight: false },
  { id: 'product', label: t('footprintTable.productHeader'), alignRight: false },
  { id: 'detail', label: t('footprintTable.detailHeader'), alignRight: false },
];

export default function CalcsTableHead() {

  const { t } = useTranslation('water-footprint');

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
