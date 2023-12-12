import React, { useState, useEffect } from 'react';
import { Grid, Typography, CardActions, Card, CardContent, Box, TextField, Button, FormControl,FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
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

export const PruningManagementForm = ({ setLink, setCurrentTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt: 2 };
    const textFieldDates = isMobile ? { mr: 2, mt: 2 } : { width: 195, mt: 2, mr: 2 };

    const [lot, setLot] = useState('');
    const [tasks, setTasks] = useState('');
    const [selectObjective, setSelectObjective] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [materials, setMaterials] = useState('');
    const [notesObservations, setNotesObservations] = useState('');
    const [budget, setBudget] = useState('');
    const [year, setYear] = useState('');
    const [currency, setCurrency] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [currencies, setCurrencies] = useState([]);

    const { user } = useSelector(s => s.authSlice);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('');

    const [formValues, setFormValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    
    const [showOtherField, setShowOtherField] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () =>{
        const errors = {}
        if(!selectObjective) errors.selectObjective = t("common:fieldRequired");
        if(!lot) errors.lot = t("common:fieldRequired");
        if(!tasks) errors.tasks = t("common:fieldRequired");
        if(!deadline) errors.deadline = t("common:fieldRequired");
        if(!materials) errors.materials = t("common:fieldRequired");
        if(!budget) errors.budget = t("common:fieldRequired");
        if(!year) errors.year = t("common:fieldRequired");
        if(!+year || year < 0) errors.year = t("common:positiveNumberRequired");
        if(!currency) errors.currency = t("common:fieldRequired");
        if(!personInCharge) errors.personInCharge = t("common:fieldRequired");
        if(!currencies) errors.currencies = t("common:fieldRequired");
        return errors;
    }
    const data = {
        lot,
        objective: selectObjective,
        otherGoal,
        materials,
        tasks,
        deadline,
        budget,
        notesObservations,
        user: user.id,
        year
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const clearForm = () => {
        setLot('');
        setTasks('');
        setSelectObjective('');
        setOtherGoal('');
        setDeadline('');
        setMaterials('');
        setNotesObservations('');
        setBudget('');
        setYear('');
        setCurrency('');
        setPersonInCharge('');
    }

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
        setSelectObjective(selectedValue);
        setShowOtherField(selectedValue === 'other');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            console.log(errors)
            setOpen(true);
            setSeverity("error")
            setMessage(tCommon('errorMessage'))
            return;
        } 
        
        setErrors({});
        setOpen(false);

        
        fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/pruningManagement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    setOpenDialog(true);
                    const { user, objective, otherGoal, ...newData } = data;
                    setFormValues(newData);
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

    const handlePositiveAnswer = (e) => {
        setLink({
            CropRotation: true
        })
        setCurrentTab(e,6)
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
                                {t('pruningManagement.form.planPruningManagement')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">  {t('pruningManagement.form.selectObjective')}</InputLabel>
                                <Select
                                    required
                                    fullWidth={isMobile}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectObjective}
                                    onChange={handleGoalChange}
                                    error={!!errors.selectObjective}
                                >
                                    <MenuItem value={"compostPruning"}>{t('pruningManagement.form.compostPruning')}</MenuItem>
                                    <MenuItem value={"chipAndCover"}>{t('pruningManagement.form.chipAndCover')}</MenuItem>
                                    <MenuItem value={"other"}>{t('pruningManagement.form.other')}</MenuItem>
                                </Select>
                                {errors.selectObjective && <FormHelperText error={true}>{errors.selectObjective}</FormHelperText>}

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

                            <Box>
                                <div>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            label={tCommon('year')}
                                            fullWidth={isMobile}
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            id="year"
                                            type='number'
                                            sx={textFieldStyle}
                                            error={!!errors.year}
                                            helperText={errors.year}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            label={t('pruningManagement.form.lot')}
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
                                            label={t('pruningManagement.form.tasks')}
                                            required
                                            fullWidth={isMobile}
                                            value={tasks}
                                            onChange={(e) => setTasks(e.target.value)}
                                            id="tasks"
                                            multiline
                                            rows={3}
                                            sx={textFieldStyle}
                                            error={!!errors.tasks}
                                            helperText={errors.tasks}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            label={t('pruningManagement.form.deadline')}
                                            fullWidth={isMobile}
                                            value={deadline}
                                            required
                                            type='date'
                                            onChange={(e) => setDeadline(e.target.value)}
                                            id="deadline"
                                            sx={textFieldDates}
                                            error={!!errors.deadline}
                                            helperText={errors.deadline}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            label={t('pruningManagement.form.materials')}
                                            fullWidth={isMobile}
                                            value={materials}
                                            required
                                            sx={{ mr: 2, mt: 2 }}
                                            onChange={(e) => setMaterials(e.target.value)}
                                            id="materials"
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
                                                error={!!errors.currency}
                                                onChange={(e) => setCurrency(e.target.value)}
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
                                            label={t('pruningManagement.form.budget')}
                                            fullWidth={isMobile}
                                            value={budget}
                                            type='number'
                                            error={!!errors.budget}
                                            helperText={errors.budget}
                                            sx={{ mr: 2, mt: 2 }}
                                            min="0.00" max="10000.00" step="0.01"
                                            onChange={(e) => setBudget(e.target.value)}
                                            id="budget"

                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label={t('pruningManagement.form.notesObservations')}
                                            multiline
                                            sx={{ mr: 2, mt: 2 }}
                                            fullWidth={isMobile}
                                            value={notesObservations}
                                            onChange={(e) => setNotesObservations(e.target.value)}

                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            label={t('tillage.form.personInCharge')}
                                            multiline
                                            fullWidth={isMobile}
                                            value={personInCharge}
                                            onChange={(e) => setPersonInCharge(e.target.value)}
                                            id="personInCharge"
                                            sx={{ mr: 2, mt: 2 }}
                                            error={!!errors.personInCharge}
                                            helperText={errors.personInCharge}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }}

                                        />
                                    </Grid>

                                </div>
                            </Box>

                            <Button onClick={handleSubmit}
                                fullWidth={isMobile}
                                sx={{ mt: 2 }} variant="contained">{tCommon('save')}</Button>

                            <SummaryDialog
                                values={formValues}
                                translationKey="pruningManagement.form"
                                open={openDialog}
                                handleClose={handleCloseDialog}
                                handleClearForm={clearForm}
                            />

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

                        </CardActions>
                    </Card>

                </Grid>

            </Grid>
        </form>
    );
};

