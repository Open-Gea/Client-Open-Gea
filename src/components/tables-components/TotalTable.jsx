import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TotalComponent = ({ dataToSum, unit, title }) => {
  const totalSum = dataToSum.reduce((sum, data) => sum + data, 0);

  return (
    <TableRow>
      <TableCell colSpan={3} align="right">
        <strong>{title}:</strong>
      </TableCell>
      <TableCell align="left">
        <strong>{totalSum.toFixed(2)} {unit}</strong>
      </TableCell>
      <TableCell colSpan={2} />
    </TableRow>
  );
};

export default TotalComponent;
