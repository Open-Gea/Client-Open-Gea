import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Box, Button, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import SummaryDialog from '../SummaryDialog';

export const CoverManagementTemplate = ({ setLink }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('soil-regeneration');
  const { t: tCommon } = useTranslation('common');

  const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt:1, mb:1 };
  const textFieldDates = isMobile ? { mr: 2, mt: 2 } : { width: 195, mr: 2, mt: 1, mb: 1 };

  //fertilizers
  const [lot, setLot] = useState('');
  const [species, setSpecies] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [precedingCrop, setPrecedingCrop] = useState('');
  const [tasks, setTasks] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('');
  const [year, setYear] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [personInCharge, setPersonInCharge] = useState('');
  const [goalGreen, setGoalGreen] = useState('');

  //padding
  const [yearMulches, setYearMulches] = useState('');
  const [lotMulches, setLotMulches] = useState('');
  const [material, setMaterial] = useState('');
  const [quantityMaterial, setQuantityMaterial] = useState('');
  const [deadlineMulches, setDeadlineMulches] = useState('');
  const [currencyMulches, setCurrencyMulches] = useState('');
  const [budgetMulches, setBudgetMulches] = useState('');
  const [notesMulches, setNotesMulches] = useState('');
  const [personInChargeMulches, setPersonInChargeMulches] = useState('');
  const [tasksMulches, setTasksMulches] = useState('');
  const [currenciesMulches, setCurrenciesMulches] = useState([]);
  const [goalMulches, setGoalMulches] = useState('');
  
  
  
  const { user } = useSelector(s => s.authSlice);
  
  useEffect(() => {
    fetch("/assets/currencies.json")
      .then((response) => response.json())
      .then((data) => {
        setCurrenciesMulches(data);
        setCurrencies(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch("/assets/currencies.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCurrencies(data);
  //     });
  // }, []);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsGreen, setErrorsGreen] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({});

  const validateMulches = () => {
    let errors = {};
    if (!lotMulches) errors.lotMulches = t("common:fieldRequired");
    if (!material) errors.material = t("common:fieldRequired");
    if (!quantityMaterial) errors.quantityMaterial = t("common:fieldRequired");
    else if (quantityMaterial < 0) errors.quantityMaterial = t("common:positiveNumberRequired");
    if (!tasksMulches) errors.tasksMulches = t("common:fieldRequired");
    if (!deadlineMulches) errors.deadlineMulches = t("common:fieldRequired");
    if (!budgetMulches) errors.budgetMulches = t("common:fieldRequired");
    else if (budgetMulches < 0) errors.budgetMulches = t("common:invalidBudget");
    if (!yearMulches) errors.yearMulches = t("common:fieldRequired");
    if(!+yearMulches) errors.yearMulches = t("common:positiveNumberRequired");
    if (!personInChargeMulches) errors.personInChargeMulches = t("common:fieldRequired");
    if (!currencyMulches) errors.currencyMulches = t("common:fieldRequired");
    if (!goalMulches) errors.goalMulches = t("common:fieldRequired");
    return errors;
  };

  const validateGreen = () => {
    let errors = {};
    if (!lot) errors.lot = t("common:fieldRequired");
    if (!species) errors.species = t("common:fieldRequired");
    if (!plantingDate) errors.plantingDate = t("common:fieldRequired");
    if (!harvestDate) errors.harvestDate = t("common:fieldRequired");
    if (!precedingCrop) errors.precedingCrop = t("common:fieldRequired");
    if (!deadline) errors.deadline = t("common:fieldRequired");
    if (!budget) errors.budget = t("common:fieldRequired");
    else if (budget < 0) errors.budget = t("common:invalidBudget");
    if (!year) errors.year = t("common:fieldRequired");
    if(!+year) errors.year = t("common:positiveNumberRequired");
    if (!tasks) errors.tasks = t("common:fieldRequired");
    if (!currency) errors.currency = t("common:fieldRequired");
    if (!personInCharge) errors.personInCharge = t("common:fieldRequired");
    if (!goalGreen) errors.goalGreen = t("common:fieldRequired");
    return errors;
  };

  const clearInputsGreen = () => {
    setYear("");
    setLot("");
    setSpecies("");
    setPlantingDate("");
    setHarvestDate("");
    setPrecedingCrop("");
    setTasks("");
    setDeadline("");
    setBudget("");
    setPersonInCharge("");
    setCurrency("");
    setNotes("");
    setGoalGreen("");
  };

  const clearInputsMulches = () => {
    setYearMulches("");
    setLotMulches("");
    setMaterial("");
    setQuantityMaterial("");
    setTasksMulches("");
    setDeadlineMulches("");
    setBudgetMulches("");
    setPersonInChargeMulches("");
    setCurrencyMulches("");
    setNotesMulches("");
    setGoalMulches("");
  }


  const handleSubmit = () => {
    const errors = validateMulches();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      createData('mulches');
    }
  };

  const handleSubmitGreen = () => {
    const errors = validateGreen();
    if (Object.keys(errors).length > 0) {
      setErrorsGreen(errors);
    } else {
      createData('greenManures');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };



  const createData = (type) => {
    let data;

    if (type === 'mulches') {
      data = {
        material,
        quantityMaterial,
        tasks: tasksMulches,
        deadline: deadlineMulches,
        notes: notesMulches,
        budget: budgetMulches,
        user: user.id,
        lot: lotMulches,
        type,
        year: yearMulches,
        currency: currencyMulches,
        personInCharge: personInChargeMulches,
        goal: goalMulches
      };
    } else if (type === 'greenManures') {
      data = {
        lot,
        species,
        plantingDate,
        harvestDate,
        precedingCrop,
        tasks,
        deadline,
        notes,
        budget,
        user: user.id,
        type,
        year,
        currency,
        personInCharge,
        goal: goalGreen
      };
    }


    axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/cover`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setMessage(t('common:successMessage'));
        setSeverity('success');
        setOpen(true);
        const {user, ...rest} = data;
        setFormValues(rest);
        setOpenDialog(true);
        if(type === 'mulches') {
          clearInputsMulches();
          setErrors({})
        }
        else {
          clearInputsGreen();
          setErrorsGreen({})
        }
        
      })
      .catch(error => {
        setErrorsGreen({})
        setErrors({})
        setMessage(t('common:error'));
        setSeverity('warning');
        setOpen(true);

      });
  }

  return (


    <Grid container spacing={3}>

      <Grid item xs={12} sm={12}>
        <Collapse in={open}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>

        <Card>
          <CardContent>
            <Typography variant="subtitle1" component="h2">
              {t('coverManagement.coverManagementTemplate.title')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>


      <Grid item xs={12} sm={12}>
        <Card>
          <Typography variant="body1" component="h2" sx={{ ml: 2, mt: 2 }}>
            {t('coverManagement.coverManagementTemplate.usePadding')}
          </Typography>
          <CardContent>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
              <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.goal')}
                  fullWidth={isMobile}
                  value={goalMulches}
                  onChange={(e) => setGoalMulches(e.target.value)}
                  id="goalMulches"
                  sx={textFieldStyle}
                  error={!!errors.goalMulches}
                  helperText={errors.goalMulches}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={tCommon('year')}
                  fullWidth={isMobile}
                  value={yearMulches}
                  onChange={(e) => setYearMulches(e.target.value)}
                  id="year"
                  error={!!errors.yearMulches}
                  helperText={errors.yearMulches}
                  sx = {textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.lot')}
                  fullWidth={isMobile}
                  value={lotMulches}
                  onChange={(e) => setLotMulches(e.target.value)}
                  id="lot"
                  sx={textFieldStyle}
                  error={!!errors.lotMulches}
                  helperText={errors.lotMulches}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.material')}
                  fullWidth={isMobile}
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  id="material"
                  sx={textFieldStyle}
                  error={!!errors.material}
                  helperText={errors.material}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
          
                <TextField
                  required
                  fullWidth={isMobile}
                  label={t('coverManagement.coverManagementTemplate.form.quantityMaterial')}
                  value={quantityMaterial}
                  onChange={(e) => setQuantityMaterial(e.target.value)}
                  id="quantityMaterial"
                  sx={textFieldStyle}
                  type='number'
                  error={!!errors.quantityMaterial}
                  helperText={errors.quantityMaterial}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  fullWidth={isMobile}
                  type='date'
                  sx = {textFieldStyle}
                  value={deadlineMulches}
                  error={!!errors.deadlineMulches}
                  helperText={errors.deadlineMulches}
                  onChange={(e) => setDeadlineMulches(e.target.value)}
                  label={t('coverManagement.coverManagementTemplate.form.deadline')}
                  id="deadlineMulches"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <FormControl fullWidth={isMobile}
                  sx={textFieldDates}
                  >
                  <InputLabel id="currency-label">{t('coverManagement.coverManagementTemplate.form.currency')}</InputLabel>
                  <Select

                    fullWidth={isMobile}
                    labelId="currency-label"
                    id="currency"
                    value={currencyMulches}
                    error={!!errors.currencyMulches}
                    //helperText={errors.currencyMulches}
                    onChange={(e) => setCurrencyMulches(e.target.value)}
                  >
                    {currenciesMulches.map((currency, index) => (
                      <MenuItem key={index} value={currency.AlphabeticCode}>
                        {currency.Currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  required
                  fullWidth={isMobile}
                  label={t('coverManagement.coverManagementTemplate.form.budget')}
                  value={budgetMulches}
                  onChange={(e) => setBudgetMulches(e.target.value)}
                  id="budgetMulches"
                  type='number'
                  error={!!errors.budgetMulches}
                  helperText={errors.budgetMulches}
                  min="0.00" max="10000.00" step="0.01"
                  sx = {textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth={isMobile}
                  label={t('coverManagement.coverManagementTemplate.form.notes')}
                  value={notesMulches}
                  onChange={(e) => setNotesMulches(e.target.value)}
                  id="notesMulches"
                  sx = {textFieldStyle}
                  multiline
                  maxRows={4}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.personInCharge')}
                  fullWidth={isMobile}
                  value={personInChargeMulches}
                  error={!!errors.personInChargeMulches}
                  helperText={errors.personInChargeMulches}
                  onChange={(e) => setPersonInChargeMulches(e.target.value)}
                  id="personInChargeMulches"
                  sx = {textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  fullWidth={isMobile}

                  label={t('coverManagement.coverManagementTemplate.form.tasks')}
                  value={tasksMulches}
                  onChange={(e) => setTasksMulches(e.target.value)}
                  id="tasksMulches"
                  sx={textFieldStyle}
                  multiline
                  rows={3}
                  error={!!errors.tasksMulches}
                  helperText={errors.tasksMulches}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  maxRows={4}
                />
                <Button fullWidth={isMobile} onClick={handleSubmit} sx={{ mt: 2, mr: 2 }}
                  variant="contained" className="ButtonFirst">
                  {t('coverManagement.coverManagementTemplate.form.create')}
                </Button>


              </div>
            </Box>
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} sm={12}>
        <Card>
          <Typography variant="body1" component="h2" sx={{ ml: 2, mt: 2 }}>
            {t('coverManagement.coverManagementTemplate.implementGreenFertilizers')}
          </Typography>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
              <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.goal')}
                  fullWidth={isMobile}
                  value={goalGreen}
                  onChange={(e) => setGoalGreen(e.target.value)}
                  id="goalGreen"
                  sx={textFieldStyle}
                  error={!!errorsGreen.goalGreen}
                  helperText={errorsGreen.goalGreen}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={tCommon('year')}
                  fullWidth={isMobile}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  id="year"
                  sx = {textFieldStyle}
                  error={!!errorsGreen.year}
                  helperText={errorsGreen.year}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.lot')}
                  fullWidth={isMobile}
                  value={lot}
                  error={!!errorsGreen.lot}
                  helperText={errorsGreen.lot}
                  onChange={(e) => setLot(e.target.value)}
                  id="lot"
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  fullWidth={isMobile}
                  label={t('coverManagement.coverManagementTemplate.form.species')}
                  id="species"
                  value={species}
                  error={!!errorsGreen.species}
                  helperText={errorsGreen.species}
                  onChange={(e) => setSpecies(e.target.value)}
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  fullWidth={isMobile}
                  type='date'
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  sx={textFieldStyle}
                  label={t('coverManagement.coverManagementTemplate.form.datePlacement')}
                  id="plantingDate"
                  error={!!errorsGreen.plantingDate}
                  helperText={errorsGreen.plantingDate}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  fullWidth={isMobile}
                  type='date'
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  sx={textFieldStyle}
                  label={t('coverManagement.coverManagementTemplate.form.harvestDate')}
                  id="harvestDate"
                  error={!!errorsGreen.harvestDate}
                  helperText={errorsGreen.harvestDate}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.precedingCrop')}
                  fullWidth={isMobile}
                  value={precedingCrop}
                  onChange={(e) => setPrecedingCrop(e.target.value)}
                  id="precedingCrop"
                  sx={textFieldStyle}
                  error={!!errorsGreen.precedingCrop}
                  helperText={errorsGreen.precedingCrop}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  type='date'
                  fullWidth={isMobile}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  sx = {textFieldStyle}
                  label={t('coverManagement.coverManagementTemplate.form.deadline')}
                  id="deadline"
                  error={!!errorsGreen.deadline}
                  helperText={errorsGreen.deadline}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />

                <FormControl fullWidth={isMobile}
                  sx={textFieldDates}>
                  <InputLabel id="currency-label">{t('coverManagement.coverManagementTemplate.form.currency')}</InputLabel>
                  <Select

                    fullWidth={isMobile}
                    labelId="currency-label"
                    id="currency"
                    value={currency}
                    required
                    onChange={(e) => setCurrency(e.target.value)}
                    error={!!errorsGreen.currency}
                    //helperText={errorsGreen.currency}
                  >
                    {currencies.map((currency, index) => (
                      <MenuItem key={index} value={currency.AlphabeticCode}>
                        {currency.Currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  required
                  fullWidth={isMobile}
                  label={t('coverManagement.coverManagementTemplate.form.budget')}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  id="budget"
                  type='number'
                  error={!!errorsGreen.budget}
                  helperText={errorsGreen.budget}
                  min="0.00" max="10000.00" step="0.01"
                  sx = {textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  label={t('coverManagement.coverManagementTemplate.form.notes')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  id="note"
                   sx = {textFieldStyle}
                  multiline
                  fullWidth={isMobile}
                  maxRows={4}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />

                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.personInCharge')}
                  fullWidth={isMobile}
                  value={personInCharge}
                  error={!!errorsGreen.personInCharge}
                  helperText={errorsGreen.personInCharge}
                  onChange={(e) => setPersonInCharge(e.target.value)}
                  id="personInCharge"
                  sx = {textFieldStyle}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                <TextField
                  required
                  label={t('coverManagement.coverManagementTemplate.form.tasks')}
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  id="tasks"
                  sx = {textFieldStyle}
                  multiline
                  fullWidth={isMobile}
                  error={!!errorsGreen.tasks}
                  helperText={errorsGreen.tasks}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  maxRows={4}
                />
                <Button fullWidth={isMobile} onClick={handleSubmitGreen} sx={{ mt: 2, mr: 2 }}
                  variant="contained" className="ButtonFirst">
                  {t('coverManagement.coverManagementTemplate.form.create')}
                </Button>
              </div>
            </Box>
            <br />

          </CardContent>
          <SummaryDialog
                values={formValues}
                open={openDialog}
                handleClose={handleClose}
                translationKey="coverManagement.coverManagementTemplate.form"
            />
        </Card>
            <Grid container spacing={3} marginTop={3}>
              <Grid item xs={12} sm={6} container justifyContent="flex-start">
                <Button
                  fullWidth={isMobile}
                  className="ButtonFirst"
                  onClick={() =>
                    setLink({
                      coverManagement: true,
                    })
                  }
                >
                  {tCommon('back')}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} container justifyContent="flex-end">
                <Button
                  fullWidth={isMobile}
                  className="ButtonFirst"
                  onClick={() =>
                    setLink({
                      Tillage: true,
                    })
                  }
                >
                  {tCommon('continue')}
                </Button>
              </Grid>
            </Grid>
      </Grid>
    </Grid>
  );

}

