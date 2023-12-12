import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Select,
  CardActions,
  Grid,
  Container,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  InputLabel,
  FormControl,
  TablePagination,
  Typography,
} from '@mui/material';
import Page from '../../../../../components/utils/Page';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// Translation module
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


export function SoilTreatment({ setLink, setCurrentTab }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('soil-regeneration');
  const { t: tCommon } = useTranslation('common');

  const [selectedOption, setSelectedOption] = useState('cover');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useSelector(s => s.authSlice);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSeeMore = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleContinue = (e) => {
    setLink({
      sensitizationOne: true,
    });
    setCurrentTab(e,0)
  };
  const handleBack = (e) => {
    setLink({
      IrrigationSystemsForm: true,
    });
    setCurrentTab(e,7)
  };

  useEffect(() => {
    if (!selectedOption) return;
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/${selectedOption}/user/${user.id}`)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [selectedOption]);

  const handleOpenDeleteDialog = id => {
    setToBeDeleted(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setToBeDeleted(null);
  };

  const deleteRow = id => {
    axios
      .delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/${selectedOption}/${id}`)
      .then(response => {
        setData(data.filter(item => item.id !== id));
        handleCloseDeleteDialog();
      })
      .catch(err => {
        setError(err.message);
        handleCloseDeleteDialog();
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleCompleted = (taskId) => {
    const taskIndex = data.findIndex((item) => item.id === taskId);

    if (taskIndex === -1) return;

    const newData = [...data];

    if(data[taskIndex].completed === true) newData[taskIndex].completed = false;
    else newData[taskIndex].completed = true;

    setData(newData);
    editDataRequest(newData[taskIndex]);
  };

  const editDataRequest = (data) =>{

    axios
      .put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/${selectedOption}/${data.id}`,
            {data},
            {
              headers:{
                'Content-Type': 'application/json'
              }
            })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  console.log(selectedOption);
  return (
    <Page title={t('labels.soilTreatment')}>
      <Container>
        <Card sx={{ marginTop: '20px' }}>
          <FormControl sx={{ marginTop: '20px', marginLeft: '20px' }}>
            <InputLabel id="soil-treatment-select-label">{t('labels.soilTreatmentType')}</InputLabel>
            <Select
              labelId="soil-treatment-select-label"
              id="soil-treatment-select"
              value={selectedOption}
              onChange={e => setSelectedOption(e.target.value)}
            >
              <MenuItem value="cover">{t('menuItems.cover')}</MenuItem>
              <MenuItem value="tillage">{t('menuItems.tillage')}</MenuItem>
              <MenuItem value="fertilization">{t('menuItems.fertilization')}</MenuItem>
              <MenuItem value="pruningManagement">{t('menuItems.pruningManagement')}</MenuItem>
              <MenuItem value="croprotation">{t('menuItems.croprotation')}</MenuItem>
              `   <MenuItem value="irrigation">{t('menuItems.irrigation')}</MenuItem>
            </Select>
          </FormControl>

          {isLoading && <p>{t('labels.loading')}</p>}
          {error && (
            <p>
              {t('labels.error')} {error}
            </p>
          )}

          <Box paddingTop={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('labels.year')}</TableCell>
                    <TableCell>{t('labels.date')}</TableCell>
                    <TableCell>{t('labels.goal')}</TableCell>
                    <TableCell>{t('labels.complete')}</TableCell>
                    {/* <TableCell>{t('labels.delete')}</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{item.deadline}</TableCell>
                      <TableCell>{item.goal}</TableCell>
                      <TableCell>{item.completed ? <ThumbUpAltIcon onClick={() => handleToggleCompleted(item.id)} color="success"/> : <ThumbDownAltIcon color="action" onClick={() => handleToggleCompleted(item.id)}/>}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleSeeMore(item)}>
                          {t('labels.more')}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDeleteDialog(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{t('dialogs.deleteDialogTitle')}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{t('dialogs.deleteDialogContent')}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                {t('labels.cancel')}
              </Button>
              <Button onClick={() => deleteRow(toBeDeleted)} color="primary" autoFocus>
                {t('labels.confirm')}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={Boolean(selectedItem)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{t('labels.detailsItem')}</DialogTitle>
            <DialogContent>
              {selectedItem ? Object.entries(selectedItem).map(([key, value]) => 
                 typeof value == 'string' && key !== 'id' && key !== 'createdAt' ? (
                <Typography>{t(`${selectedOption}.form.${key}`)} : {value}</Typography>
              ): <></>): <></>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                {tCommon('close')}
              </Button>
            </DialogActions>
        </Dialog>

          <CardActions>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} container justifyContent="flex-start">
                <Button variant="contained" fullWidth={isMobile} className="ButtonFirst" onClick={handleBack}>
                  {tCommon('back')}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} container justifyContent="flex-end">
                <Button fullWidth={isMobile} className="ButtonFirst" onClick={handleContinue}>
                  {tCommon('continue')}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </Page>
  );
}
