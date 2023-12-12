import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import SummaryDialog from '../SummaryDialog';

export const IrrigationSystemsForm = ({ setLink, setCurrentTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt: 2 };
    const textFieldDates = isMobile ? { mr: 2, mt: 2 } : { width: 195, mt: 2, mr: 2 };

    const [lot, setLot] = useState('');
    const [objective, setObjective] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [tasksList, setTasksList] = useState('');
    const [deadlineCompletion, setDeadlineCompletion] = useState('');
    const [materials, setMaterials] = useState('');
    const [budget, setBudget] = useState('');
    const [currency, setCurrency] = useState('');
    const [notesObservations, setNotesObservations] = useState('');
    const [management, setManagement] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [year, setYear] = useState('');
    const [currencies, setCurrencies] = useState([]);

    const { user } = useSelector(s => s.authSlice);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('');
    const [formValues, setFormValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const [showOtherField, setShowOtherField] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if(!lot) errors.lot = t("common:fieldRequired");
        if(!objective) errors.objective = t("common:fieldRequired");
        if(!tasksList) errors.tasksList = t("common:fieldRequired");
        if(!deadlineCompletion) errors.deadlineCompletion = t("common:fieldRequired");
        if(!materials) errors.materials = t("common:fieldRequired");
        if(!budget) errors.budget = t("common:fieldRequired");
        if(!currency) errors.currency = t("common:fieldRequired");
        if(!management) errors.management = t("common:fieldRequired");
        if(!personInCharge) errors.personInCharge = t("common:fieldRequired");
        if(!year) errors.year = t("common:fieldRequired");
        if(!+year || year < 0 ) errors.year = t("common:positiveNumberRequired"); 

        return errors;
    }

    const irrigationSystemsData = {
        lot,
        objective,
        otherGoal,
        tasks: tasksList,
        deadline: deadlineCompletion,
        materials,
        budget,
        currency,
        notes: notesObservations,
        management,
        user: user.id,
        year,
        personInCharge
    };

    const handleClearForm = () => {
        setYear('');
        setLot('');
        setObjective('');
        setOtherGoal('');
        setTasksList('');
        setDeadlineCompletion('');
        setMaterials('');
        setBudget('');
        setNotesObservations('');
        setCurrency('');
        setManagement('');
        setPersonInCharge('');
    };

    const handleClose = () => {
        setOpenDialog(false);
      };

      useEffect(() => {
        fetch("/assets/currencies.json")
            .then((response) => response.json())
            .then((data) => {
                setCurrencies(data);
                // if (data && data.length > 0) {
                //     setCurrency(data[0].AlphabeticCode);
                // }
            });
    }, []);

    const handleGoalChange = (e) => {
        const selectedValue = e.target.value;
        setObjective(selectedValue);
        setShowOtherField(selectedValue === 'other');
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setOpen(true);
            setSeverity("error")
            tCommon('errorMessage')
            return;
        } 

        setErrors({});
        setOpen(false);

        fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/irrigation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(irrigationSystemsData)
        })
            .then(response => {
                if (response.ok) {
                    const {user, otherGoal, ...rest} = irrigationSystemsData
                    setFormValues(rest);
                    setOpenDialog(true);
                    handleClearForm();

                } else {
                    throw new Error("Error in response from server");
                }
            })
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handlePositiveAnswer = (e) => {
        setLink({
            soilTreatment: true,
        })
        setCurrentTab(e,8)
    };
    const handleBack = () => {
        setLink({
            IrrigationSystems: true,
        })
    };

    return (
        <form onSubmit={handleSubmit}>
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


            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>

                            <Typography variant="subtitle1" component="h2">
                                {t('irrigation.form.title')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">  {t('irrigation.form.objective')}</InputLabel>
                                <Select
                                    required
                                    fullWidth={isMobile}
                                    labelId="irrigation"
                                    id="irrigation-select"
                                    value={objective}
                                    onChange={handleGoalChange}
                                    error= {!!errors.objective}
                                >
                                    <MenuItem value={'evaluateRisks'}>{t('irrigation.objectiveOptions.evaluateRisks')}</MenuItem>
                                    <MenuItem value={'waterAnalysis'}>{t('irrigation.objectiveOptions.waterAnalysis')}</MenuItem>
                                    <MenuItem value={'installFilters'}>{t('irrigation.objectiveOptions.installFilters')}</MenuItem>
                                    <MenuItem value={'protectClean'}>{t('irrigation.objectiveOptions.protectClean')}</MenuItem>
                                    <MenuItem value={'dripIrrigation'}>{t('irrigation.objectiveOptions.dripIrrigation')}</MenuItem>
                                    <MenuItem value={'laboratoryAnalysis'}>{t('irrigation.objectiveOptions.laboratoryAnalysis')}</MenuItem>
                                    <MenuItem value={'optimizeWaterUse'}>{t('irrigation.objectiveOptions.optimizeWaterUse')}</MenuItem>
                                    <MenuItem value={'treatWasteWater'}>{t('irrigation.objectiveOptions.treatWasteWater')}</MenuItem>
                                    <MenuItem value={'other'}>{t('irrigation.objectiveOptions.other')}</MenuItem>
                                </Select>
                                {errors.objective && <FormHelperText error={true}>{errors.objective}</FormHelperText>}
                            </FormControl>
                            {showOtherField && (
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <TextField
                                            label={t('tillage.form.other')}
                                            value={otherGoal}
                                            onChange={(e) => setOtherGoal(e.target.value)}
                                        />
                                    </FormControl>
                            )}        
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div>
                                    <TextField
                                        label={tCommon('year')}
                                        fullWidth={isMobile}
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        id="year"
                                        type="number"
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.year}
                                        helperText={errors.year}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('irrigation.form.lot')}
                                        fullWidth={isMobile}
                                        value={lot}
                                        onChange={(e) => setLot(e.target.value)}
                                        id="lot"
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.lot}
                                        helperText={errors.lot}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label={t('irrigation.form.tasksList')}
                                        fullWidth={isMobile}
                                        value={tasksList}
                                        onChange={(e) => setTasksList(e.target.value)}
                                        id="tasksList"
                                        sx={textFieldStyle}
                                        multiline
                                        rows={3}
                                        required
                                        error={!!errors.tasksList}
                                        helperText={errors.tasksList}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label={t('irrigation.form.deadlineCompletion')}
                                        fullWidth={isMobile}
                                        value={deadlineCompletion}
                                        onChange={(e) => setDeadlineCompletion(e.target.value)}
                                        id="deadlineCompletion"
                                        type='Date'
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.deadlineCompletion}
                                        helperText={errors.deadlineCompletion}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('irrigation.form.materials')}
                                        fullWidth={isMobile}
                                        value={materials}
                                        onChange={(e) => setMaterials(e.target.value)}
                                        id="materials"
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.materials}
                                        helperText={errors.materials}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                        <FormControl fullWidth={isMobile}
                                            sx={textFieldDates}>
                                            <InputLabel id="currency-label">{t('tillage.form.currency')}</InputLabel>
                                            <Select
                                                fullWidth={isMobile}
                                                labelId="currency-label"
                                                id="currency"
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                required
                                                error={!!errors.currency}
                                            >
                                                {currencies.map((currency, index) => (
                                                    <MenuItem key={index} value={currency.AlphabeticCode}>
                                                        {currency.Currency}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.currency && <FormHelperText error={true}>{errors.currency}</FormHelperText>}
                                        </FormControl>
                                        
                                    <TextField
                                        label={t('irrigation.form.budget')}
                                        fullWidth={isMobile}
                                        value={budget}
                                        type='number'
                                        required
                                        min="0.00" max="10000.00" step="0.01"
                                        onChange={(e) => setBudget(e.target.value)}
                                        id="budget"
                                        sx={textFieldStyle}
                                        error={!!errors.budget}
                                        helperText={errors.budget}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('irrigation.form.notesObservations')}
                                        fullWidth={isMobile}
                                        value={notesObservations}
                                        onChange={(e) => setNotesObservations(e.target.value)}
                                        id="notesObservations"
                                        sx={textFieldStyle}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label={t('irrigation.form.management')}
                                        fullWidth={isMobile}
                                        value={management}
                                        onChange={(e) => setManagement(e.target.value)}
                                        id="management"
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.management}
                                        helperText={errors.management}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('irrigation.form.personInCharge')}
                                        fullWidth={isMobile}
                                        value={personInCharge}
                                        onChange={(e) => setPersonInCharge(e.target.value)}
                                        id="personInCharge"
                                        sx={textFieldStyle}
                                        required
                                        error={!!errors.personInCharge}
                                        helperText={errors.personInCharge}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                </div>
                            </Box>

                            <Button onClick={handleSubmit}
                                fullWidth={isMobile}
                                sx={{ mt: 2 }} variant="contained">{tCommon('form.save')}</Button>

                            <Grid container spacing={3} sx={{ mt: 2 }} >
                                <Grid item xs={12} sm={6} container justifyContent="flex-start">
                                    <Button
                                        variant="contained"
                                        fullWidth={isMobile}
                                        className="ButtonFirst"
                                        onClick={handleBack}
                                    >
                                        {tCommon('back')}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                    <Button
                                        fullWidth={isMobile}
                                        className="ButtonFirst"
                                        onClick={handlePositiveAnswer}
                                    >
                                        {tCommon('continue')}
                                    </Button>
                                </Grid>
                            </Grid>


                            <SummaryDialog
                                values={formValues}
                                open={openDialog}
                                handleClose={handleClose}
                                translationKey="irrigation.form"
                            />
                        </CardContent>
                    </Card>

                </Grid>


            </Grid>
        </form>
    );
};

