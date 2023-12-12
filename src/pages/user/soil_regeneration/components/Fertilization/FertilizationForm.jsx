import React, { useState, useEffect } from 'react';
import { Grid, Typography, CardActions, Card, CardContent, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
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
import { error } from 'pdf-lib';


export const FertilizationForm = ({ setLink }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt: 1, mb: 1 };
    const textFieldDates = isMobile ? { mr: 2, mt: 2 } : { width: 195, mr: 2, mt: 1, mb: 1 };
    const [lot, setLot] = useState('');
    const [fertilizationType, setFertilizationType] = useState('');
    const [cultivatedSpecies, setCultivatedSpecies] = useState('');
    const [goal, setGoal] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [tasks, setTasks] = useState('');
    const [deadlineCompletion, setDeadlineCompletion] = useState('');
    const [notes, setNotes] = useState('');
    const [budget, setBudget] = useState('');
    const [year, setYear] = useState('');

    const { user } = useSelector(s => s.authSlice);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('');
    const [formValues, setFormValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [currency, setCurrency] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [currencies, setCurrencies] = useState([]);


    const [showOtherField, setShowOtherField] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () =>{
        const errors = {}
        if(!fertilizationType) errors.fertilizationType = t("common:fieldRequired");
        if(!goal) errors.goal = t("common:fieldRequired");
        if(!tasks) errors.tasks = t("common:fieldRequired");
        if(!deadlineCompletion) errors.deadlineCompletion = t("common:fieldRequired");
        if(!lot) errors.lot = t("common:fieldRequired");
        if(!budget) errors.budget = t("common:fieldRequired");
        if(!year) errors.year = t("common:fieldRequired");
        if(!+year || year < 0) errors.year = t("common:positiveNumberRequired"); 
        if(!currency) errors.currency = t("common:fieldRequired");
        if(!currencies) errors.currencies = t("common:fieldRequired");
        if(!cultivatedSpecies) errors.cultivatedSpecies = t("common:fieldRequired");
        if(!personInCharge) errors.personInCharge = t("common:fieldRequired");
        return errors
    }

    const fertilizationData = {
        lot,
        fertilizationType,
        cultivatedSpecies,
        goal,
        otherGoal,
        tasks,
        deadline: deadlineCompletion,
        budget,
        notes,
        user: user.id,
        year,
        currency,
        personInCharge
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

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const clearForm = () => {
        setLot('');
        setFertilizationType('');
        setCultivatedSpecies('');
        setGoal('');
        setOtherGoal('');
        setTasks('');
        setDeadlineCompletion('');
        setNotes('');
        setBudget('');
        setYear('');
        setCurrency('');
        setPersonInCharge('');
    }

    const handleGoalChange = (e) => {
        const selectedValue = e.target.value;
        setGoal(selectedValue);
        setShowOtherField(selectedValue === 'other');
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setOpen(true);
            setSeverity("error")
            setMessage(t('fertilization.form.errorMessage'))
            return;
        } 

        setErrors({});
        setOpen(false);

        
        fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/fertilization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fertilizationData)
        })
            .then(response => {
                if (response.ok) {

                    setOpenDialog(true);
                    const { user, fertilizationType, goal, otherGoal, ...restFertilizationData } = fertilizationData;
                    setFormValues(restFertilizationData);
                } else {
                    throw new Error("Error in response from server");
                }
            })
            .then(data => console.log(data))
            .catch((error) => {
                setOpen(true);
                setSeverity("error")
                setMessage(tCommon('error'))
            });
    };

    const handlePositiveAnswer = () => {
        setLink({
            PruningManagement: true
        })
    };
    const handleBack = () => {
        setLink({
            Fertilization: true,
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
                                {t('fertilization.form.title')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>

                            <FormControl fullWidth>
                                <InputLabel id="simple-select-label">  {t('fertilization.form.selectType')}</InputLabel>
                                <Select
                                    required
                                    fullWidth={isMobile}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fertilizationType}
                                    error={!!errors.fertilizationType}
                                    onChange={(e) => setFertilizationType(e.target.value)}
                                >
                                    <MenuItem value={"chemical"}>{t('fertilization.form.chemicalOption')}</MenuItem>
                                    <MenuItem value={"organic"}>{t('fertilization.form.organicOption')}</MenuItem>
                                </Select>
                                {errors.fertilizationType && <FormHelperText error={true}>{errors.fertilizationType}</FormHelperText>}
                            </FormControl>

                        <div>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label">{t('fertilization.form.selecObjectives')}</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={goal}
                                    onChange={handleGoalChange}
                                    error={!!errors.goal}
                                >
                                    {fertilizationType === "chemical" ?
                                        [
                                            <MenuItem key="1" value={'getNutritionalRequirements'}>{t('fertilization.form.getNutritionalRequirements')}</MenuItem>,
                                            <MenuItem key="2" value={'createMonitoringPlan'}>{t('fertilization.form.createMonitoringPlan')}</MenuItem>,
                                            <MenuItem key="3" value={'applyFertilizersBasedOnRequirements'}>{t('fertilization.form.applyFertilizersBasedOnRequirements')}</MenuItem>,
                                            <MenuItem key="4" value={'calibrateMachineryForAccuracy'}>{t('fertilization.form.calibrateMachineryForAccuracy')}</MenuItem>,
                                            <MenuItem key="5" value={'conductSoilAnalysis'}>{t('fertilization.form.conductSoilAnalysis')}</MenuItem>,
                                            <MenuItem key="6" value={'consultWithTrainedPersonnel'}>{t('fertilization.form.consultWithTrainedPersonnel')}</MenuItem>,
                                            <MenuItem key="7" value={'performFertigation'}>{t('fertilization.form.performFertigation')}</MenuItem>,
                                            <MenuItem key="8" value={'conductTraining'}>{t('fertilization.form.conductTraining')}</MenuItem>,
                                            <MenuItem key="9" value={'other'}>{t('fertilization.form.other')}</MenuItem>,
                                        ]
                                        :
                                        [
                                            <MenuItem key="9" value={'conductAndIncorporateOrganicFertilizers'}>{t('fertilization.form.conductAndIncorporateOrganicFertilizers')}</MenuItem>,
                                            <MenuItem key="10" value={'buyOrganicFertilizersNew'}>{t('fertilization.form.buyOrganicFertilizersNew')}</MenuItem>,
                                            <MenuItem key="11" value={'applyFertilizersBasedOnCropRequirements'}>{t('fertilization.form.applyFertilizersBasedOnCropRequirements')}</MenuItem>,
                                            <MenuItem key="12" value={'conductTrainingOnTopic'}>{t('fertilization.form.conductTrainingOnTopic')}</MenuItem>,
                                            <MenuItem key="13" value={'other'}>{t('fertilization.form.other')}</MenuItem>,
                                        ]
                                    }
                                </Select>
                                {errors.goal && <FormHelperText error={true}>{errors.goal}</FormHelperText>}
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
                            
                        </div>

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
                                            type='number'
                                            required
                                            error={!!errors.year}
                                            helperText = {errors.year}
                                            sx={textFieldStyle}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('fertilization.form.lot')}
                                            fullWidth={isMobile}
                                            value={lot}
                                            onChange={(e) => setLot(e.target.value)}
                                            id="lot"
                                            sx={textFieldStyle}
                                            error={!!errors.lot}
                                            helperText = {errors.lot}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('fertilization.form.cultivatedSpecies')}
                                            fullWidth={isMobile}
                                            required
                                            value={cultivatedSpecies}
                                            onChange={(e) => setCultivatedSpecies(e.target.value)}
                                            id="cultivatedSpecies"
                                            sx={textFieldStyle}
                                            error={!!errors.cultivatedSpecies}
                                            helperText = {errors.cultivatedSpecies}
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
                                            >
                                                {currencies.map((currency, index) => (
                                                    <MenuItem key={index} value={currency.AlphabeticCode}>
                                                        {currency.Currency}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            label={t('fertilization.form.budget')}
                                            fullWidth={isMobile}
                                            value={budget}
                                            type='number'
                                            required
                                            min="0.00" max="10000.00" step="0.01"
                                            onChange={(e) => setBudget(e.target.value)}
                                            id="budget"
                                            sx={textFieldStyle}
                                            error={!!errors.budget}
                                            helperText = {errors.budget}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('fertilization.form.notesObservations')}
                                            multiline
                                            fullWidth={isMobile}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            id="notes"
                                            sx={textFieldStyle}
                                            error={!!errors.notes}
                                            helperText = {errors.notes}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('fertilization.form.tasks')}
                                            required
                                            fullWidth={isMobile}
                                            value={tasks}
                                            onChange={(e) => setTasks(e.target.value)}
                                            id="tasks"
                                            multiline
                                            rows={3}
                                            sx={textFieldStyle}
                                            error={!!errors.tasks}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('fertilization.form.deadlineCompletion')}
                                            fullWidth={isMobile}
                                            value={deadlineCompletion}
                                            required
                                            type='date'
                                            onChange={(e) => setDeadlineCompletion(e.target.value)}
                                            id="deadlineCompletion"
                                            sx={textFieldDates}
                                            error={!!errors.deadlineCompletion}
                                            helperText = {errors.deadlineCompletion}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />
                                    
                                        <TextField
                                            label={t('fertilization.form.personInCharge')}
                                            fullWidth={isMobile}
                                            value={personInCharge}
                                            onChange={(e) => setPersonInCharge(e.target.value)}
                                            id="personInCharge"
                                            sx={textFieldStyle}
                                            error={!!errors.personInCharge}
                                            helperText = {errors.personInCharge}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                    />
                                </div>
                            </Box>

                            <Button onClick={handleSubmit}
                                fullWidth={isMobile}
                                sx={{ mt: 2 }} variant="contained">{t('fertilization.form.save')}</Button>

                        </CardContent>
                        <CardActions>

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
                                translationKey="fertilization.form"
                                open={openDialog}
                                handleClose={handleCloseDialog}
                                handleClearForm={clearForm}
                            />

                        </CardActions>
                    </Card>

                </Grid>

            </Grid>
        </form>
    );
};

