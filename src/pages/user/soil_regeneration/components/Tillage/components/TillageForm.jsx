import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Box, TextField, Button, FormControl,FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import SummaryDialog from '../../SummaryDialog';



export const TillageForm = ({ setLink, setCurrentTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt:1, mb:1 };
    const textFieldDates = isMobile ? { mr: 2, mt: 2 } : { width: 195, mr: 2, mt: 1 };
    
    const [lot, setLot] = useState('');
    const [year, setYear] = useState('');
    const [machineryUsed, setMachineryUsed] = useState('');
    const [type, setType] = useState('');
    const [goal, setGoal] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [dateWork, setDateWork] = useState('');
    const [numberPassesPerWork, setNumberPassesPerWork] = useState('');
    const [tasksFulfillObjective, setTasksFulfillObjective] = useState('');
    const [deadlineCompletion, setDeadlineCompletion] = useState('');
    const [necessaryMaterial, setNecessaryMaterial] = useState('');
    const [coin, setCoin] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [budget, setBudget] = useState('');
    const [notes, setNotes] = useState('');

    const { user } = useSelector(s => s.authSlice);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('');
    const [formValues, setFormValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const [currencies, setCurrencies] = useState([]);

    const [showOtherField, setShowOtherField] = useState(false);
    const [errors, setErrors] = useState({});


    const validate = () => {
        let errors = {};
        if(!lot) errors.lot = t("common:fieldRequired");
        if(!year) errors.year = t("common:fieldRequired");
        if(year < 0) errors.year = t("common:positiveNumberRequired");
        if(!machineryUsed) errors.machineryUsed = t("common:fieldRequired");
        if(!dateWork) errors.dateWork = t("common:fieldRequired");
        if(!numberPassesPerWork) errors.numberPassesPerWork = t("common:fieldRequired");
        if(!tasksFulfillObjective) errors.tasksFulfillObjective = t("common:fieldRequired");
        if(!deadlineCompletion) errors.deadlineCompletion = t("common:fieldRequired");
        if(!necessaryMaterial) errors.necessaryMaterial = t("common:fieldRequired");
        if(!coin) errors.coin = t("common:fieldRequired");
        if(!personInCharge) errors.personInCharge = t("common:fieldRequired");
        if(!budget) errors.budget = t("common:fieldRequired");
        if(!type) errors.type = t("common:fieldRequired");
        if(!goal) errors.goal = t("common:fieldRequired");
        return errors;
    }

    useEffect(() => {
        fetch("/assets/currencies.json")
            .then((response) => response.json())
            .then((data) => {
                setCurrencies(data);
            });
    }, []);

    const tillageData = {
        lot,
        machineryUsed,
        type,
        goal,
        otherGoal,
        year,
        dateWork,
        numberPassesPerWork,
        tasks: tasksFulfillObjective,
        deadline: deadlineCompletion,
        necessaryMaterial,
        budget,
        notes,
        user: user.id,
        personInCharge,
        currency:coin

    };


    const handleClearForm = () => {
        setType('');
        setLot('');
        setYear('');
        setMachineryUsed('');
        setGoal('');
        setOtherGoal('');
        setDateWork('');
        setNumberPassesPerWork('');
        setTasksFulfillObjective('');
        setDeadlineCompletion('');
        setNecessaryMaterial('');
        setBudget('');
        setCoin('');
        setPersonInCharge('');
        setNotes('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


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
            setMessage(t('tillage.form.errorMessage'))
            return;
        } 
        
        setErrors({});
        setOpen(false);
        
        fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/tillage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tillageData)
        })
            .then(response => {
                if (response.ok) {

                    const { user, goal, ...restOfTillageData } = tillageData;
                    setFormValues(restOfTillageData);
                    setOpenDialog(true);
                    setMessage(t('common:successMessage'));
                    setSeverity('success');
                    setOpen(true);
                } else {
                    throw new Error("Error in response from server");
                }
            })
            
            .catch((error) => {
                setOpen(true);
                setSeverity("error")
                setMessage(tCommon('error'))
            });
            
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
                                {t('tillage.form.title')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    {t('tillage.form.tillageType')}
                                </InputLabel>
                                <Select
                                    required
                                    fullWidth={isMobile}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    error={!!errors.type}
                                >
                                    <MenuItem value={"Primaria"}>{t('tillage.form.primary')}</MenuItem>
                                    <MenuItem value={"Secundaria"}>{t('tillage.form.secondary')}</MenuItem>
                                </Select>
                                {errors.type && <FormHelperText error={true}>{errors.type}</FormHelperText>}
                            </FormControl>

                            <div>
                                <FormControl fullWidth sx={{ mt: 2 }} >
                                    <InputLabel id="demo-simple-select-label">{t('tillage.form.objective')} </InputLabel>
                                    <Select
                                        required
                                        labelId="demo-csimple-seclect-label"
                                        id="demo-simple-select"
                                        value={goal}
                                        onChange={handleGoalChange}
                                        error={!!errors.goal}
                                    >
                                        <MenuItem value={'implementTillage'}>{t('tillage.form.implementTillage')} </MenuItem>
                                        <MenuItem value={'calibrateMachinery'}>{t('tillage.form.calibrateMachinery')}</MenuItem>
                                        <MenuItem value={'other'}>{t('tillage.form.other')}</MenuItem>
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
                        <Typography variant="body1" component="h2" sx={{ ml: 2, mt: 2 }}>
                            {t('tillage.form.body')}
                        </Typography>
                        <CardContent>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div>
                                    
                                        <TextField
                                            label={t('tillage.form.lot')}
                                            fullWidth={isMobile}
                                            value={lot}
                                            onChange={(e) => setLot(e.target.value)}
                                            id="lot"
                                            sx={textFieldStyle}
                                            error={!!errors.lot}
                                            helperText={errors.lot}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />
                                        <TextField
                                            label={t('tillage.form.year')}
                                            fullWidth={isMobile}
                                            value={year}
                                            type='number'
                                            required
                                            onChange={(e) => setYear(e.target.value)}
                                            id="year"
                                            sx={textFieldStyle}
                                            error={!!errors.year}
                                            helperText={errors.year}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />

                                        <TextField
                                            label={t('tillage.form.machineryUsed')}
                                            fullWidth={isMobile}
                                            value={machineryUsed}
                                            onChange={(e) => setMachineryUsed(e.target.value)}
                                            id="machineryUsed"
                                            sx={textFieldStyle}
                                            error={!!errors.machineryUsed}
                                            helperText={errors.machineryUsed}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />
                                        <TextField
                                            label={t('tillage.form.numberPassesPerWork')}
                                            fullWidth={isMobile}
                                            type='number'
                                            required
                                            value={numberPassesPerWork}
                                            onChange={(e) => setNumberPassesPerWork(e.target.value)}
                                            id="numberPassesPerWork"
                                            sx={textFieldStyle}
                                            error={!!errors.numberPassesPerWork}
                                            helperText={errors.numberPassesPerWork}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />

                                        <TextField
                                            label={t('tillage.form.dateWork')}
                                            fullWidth={isMobile}
                                            type='date'
                                            value={dateWork}
                                            onChange={(e) => setDateWork(e.target.value)}
                                            id="dateWork"
                                            sx={textFieldDates}
                                            error={!!errors.dateWork}
                                            helperText={errors.dateWork}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />


                                        <TextField
                                            label={t('tillage.form.deadlineCompletion')}
                                            fullWidth={isMobile}
                                            value={deadlineCompletion}
                                            required
                                            type='date'
                                            onChange={(e) => setDeadlineCompletion(e.target.value)}
                                            id="deadlineCompletion"
                                            sx={textFieldDates}
                                            error={!!errors.deadlineCompletion}
                                            helperText={errors.deadlineCompletion}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}

                                        />

                                        <TextField
                                            label={t('tillage.form.necessaryMaterial')}
                                            fullWidth={isMobile}
                                            value={necessaryMaterial}

                                            onChange={(e) => setNecessaryMaterial(e.target.value)}
                                            id="necessaryMaterial"
                                            sx={textFieldStyle}
                                            error={!!errors.necessaryMaterial}
                                            helperText={errors.necessaryMaterial}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />

                                        <TextField
                                            label={t('tillage.form.personInCharge')}
                                            multiline
                                            fullWidth={isMobile}
                                            value={personInCharge}
                                            onChange={(e) => setPersonInCharge(e.target.value)}
                                            id="personInCharge"
                                            sx={textFieldStyle}
                                            error={!!errors.personInCharge}
                                            helperText={errors.personInCharge}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />

                                        <FormControl fullWidth={isMobile} 
                                          sx={textFieldDates}
                                          error={!!errors.coin}
                                          >
                                            
                                            <InputLabel id="currency-label">
                                            {t('tillage.form.currency')}</InputLabel>
                                            
                                                <Select                                                
                                                    fullWidth={isMobile}
                                                    labelId="currency-label"
                                                    id="currency"
                                                    value={coin}
                                                    
                                                    onChange={(e) => setCoin(e.target.value)}
                                                >
                                                    {currencies.map((currency, index) => (
                                                        <MenuItem key={index} value={currency.AlphabeticCode}>
                                                            {currency.Currency}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                        </FormControl>

                                        <TextField
                                            label={t('tillage.form.budget')}
                                            fullWidth={isMobile}
                                            value={budget}
                                            type='number'
                                         
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
                                            label={t('tillage.form.notesObservations')}
                                            multiline
                                            fullWidth={isMobile}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            id="notes"
                                            sx={textFieldStyle}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />
                                        <TextField
                                            label={t('tillage.form.tasksFulfillObjective')}
                                            required
                                            fullWidth={isMobile}
                                            value={tasksFulfillObjective}
                                            onChange={(e) => setTasksFulfillObjective(e.target.value)}
                                            id="tasksFulfillObjective"
                                            sx={textFieldStyle}
                                            multiline
                                            rows={3}
                                            error={!!errors.tasksFulfillObjective}
                                            helperText={errors.tasksFulfillObjective}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                              }}
                                        />

                                </div>
                            </Box>

                            <Button onClick={handleSubmit}
                                fullWidth={isMobile}
                                sx={{ mt: 2 }} variant="contained">{t('tillage.form.save')}</Button>


                            <Grid container spacing={3} sx={{ mt: 2 }} >
                                <Grid item xs={12} sm={6} container justifyContent="flex-start">
                                    <Button
                                        variant="contained"
                                        fullWidth={isMobile}
                                        className="ButtonFirst"
                                        onClick={() =>
                                            setLink({
                                                Tillage: true,
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
                                        onClick={(e) =>{
                                                setLink({
                                                    Fertilization: true,
                                                })
                                                setCurrentTab(e,4)
                                            }
                                        }
                                    >
                                        {tCommon('continue')}
                                    </Button>
                                </Grid>
                            </Grid>

                            <SummaryDialog
                                values={formValues}
                                translationKey="tillage.form"
                                open={openDialog}
                                handleClose={handleCloseDialog}
                                handleClearForm={handleClearForm}
                            />
                        </CardContent>

                    </Card>

                </Grid>

            </Grid>
        </form>
    );
};

