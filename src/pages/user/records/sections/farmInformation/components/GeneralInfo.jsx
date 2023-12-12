import { useSelector } from 'react-redux';
// MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, Stack } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import MapViewSimple from '../pages/lots/components/MapSimpleView';
import { useEffect } from 'react';
// components

export const GeneralInfo = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const { currentFarm } = useSelector(s => s.recordsSlice);

  const { name, owner, lat, lng, totalSurface,country, perimetralFence, infrastructure, hidricRes, start } = currentFarm;
  
  const ubication = { lat, lng};

  const rows = [
    { name: 'Propietario', value: owner },
    {
      name: 'Fecha de inicio',
      value: new Date(parseInt(start)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
    },
    { name: 'País', value: country },
    { name: 'Superficie', value: `${totalSurface} ha.` },
    { name: 'Tipo de cerco perimetral', value: perimetralFence || '--' },
    { name: 'Número de infraestructuras', value: infrastructure || '--' },
    { name: 'Recursos Hídricos', value: hidricRes?.join(', ') || '--' },
  ];

  useEffect(() => {

  }, [currentFarm]);
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Finca:</StyledTableCell>
                <StyledTableCell align="right">{name}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.value || '---'}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MapViewSimple lat={ubication.lat} lng={ubication.lng} name={name} owner={owner} country={country} />
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
          <TextField variant="filled" disabled label={'Latitud'} value={ubication.lat} />
          <TextField variant="filled" disabled label={'Latitud'} value={ubication.lng} />
        </Stack>
      </Grid>
    </Grid>
  );
};
