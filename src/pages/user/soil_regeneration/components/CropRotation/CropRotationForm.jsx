import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Box, TextField, Button } from '@mui/material';
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

export const CropRotationForm = ({ setLink, setCurrentTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const textFieldStyle = isMobile ? { mr: 0, mt: 2 } : { mr: 2, mt: 2 };
    const [year, setYear] = useState('');
    const [lot, setLot] = useState('');
    const [speciesToCultivate, setSpeciesToCultivate] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [precedingSpecies, setPrecedingSpecies] = useState('');
    const [targetMarket, setTargetMarket] = useState('');
    const [tasks, setTasks] = useState('');
    const [deadline, setDeadline] = useState('');
    const [notesObservations, setNotesObservations] = useState('');
    const [personInCharge, setPersonInCharge] = useState('');
    const [goal, setGoal] = useState('');
    const [formValues, setFormValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const { user } = useSelector(s => s.authSlice);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () =>{
        const errors={};
        if(!year) errors.year = t("common:fieldRequired");
        if(!+year || year < 0) errors.year = t("common:positiveNumberRequired"); 
        if(!lot) errors.lot = t("common:fieldRequired");
        if(!speciesToCultivate) errors.speciesToCultivate = t("common:fieldRequired");
        if(!plantingDate) errors.plantingDate = t("common:fieldRequired");
        if(!harvestDate) errors.harvestDate = t("common:fieldRequired");
        if(!precedingSpecies) errors.precedingSpecies = t("common:fieldRequired");
        if(!targetMarket) errors.targetMarket = t("common:fieldRequired");
        if(!tasks) errors.tasks = t("common:fieldRequired");
        if(!deadline) errors.deadline = t("common:fieldRequired");
        if(!personInCharge) errors.personInCharge = t("common:fieldRequired");
        if(!goal) errors.goal = t("common:fieldRequired");
        return errors;
    }
    const clearForm = () => {
        setLot('');
        setYear('');
        setSpeciesToCultivate('');
        setPlantingDate('');
        setHarvestDate('');
        setPrecedingSpecies('');
        setTargetMarket('');
        setTasks('');
        setDeadline('');
        setPersonInCharge('');
        setNotesObservations('');
        setGoal('');
    }


    const cropRotationData = {
        year,
        lot,
        speciesToCultivate,
        plantingDate,
        harvestDate,
        precedingSpecies,
        targetMarket,
        tasks,
        deadline,
        notesObservations,
        personInCharge,
        goal,
        user: user.id
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setOpen(true);
            setSeverity("error")
            setMessage(tCommon('errorMessage'))
            return;
        } 

        setErrors({});
        setOpen(false);

        fetch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/soil-regeneration/croprotation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cropRotationData)
        })
            .then(response => {
                if (response.ok) {
                    setOpenDialog(true);
                    const { user, ...restCropRotationData } = cropRotationData;
                    setFormValues(restCropRotationData);
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
            IrrigationSystems: true,
        })
        setCurrentTab(e,7)
    };
    const handleBack = () => {
        setLink({
            CropRotation: true,
        })
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
                                {t('croprotation.form.title')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Card>

                        <CardContent>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div>
                                <TextField
                                    required
                                    label={t('croprotation.form.goal')}
                                    fullWidth={isMobile}
                                    value={goal}
                                    onChange={(e)=> setGoal(e.target.value)}
                                    id="goal"
                                    sx={textFieldStyle}
                                    error={!!errors.goal}
                                    helperText={errors.goal}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                />

                                    <TextField
                                        label={t('croprotation.form.year')}
                                        fullWidth={isMobile}
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        id="year"
                                        type="number"
                                        required
                                        error= {!!errors.year}
                                        helperText={errors.year}
                                        sx={textFieldStyle}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.lot')}
                                        fullWidth={isMobile}
                                        value={lot}
                                        onChange={(e) => setLot(e.target.value)}
                                        id="lot"
                                        required
                                        error= {!!errors.lot}
                                        helperText={errors.lot}
                                        sx={textFieldStyle}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.speciesToCultivate')}
                                        fullWidth={isMobile}
                                        value={speciesToCultivate}
                                        onChange={(e) => setSpeciesToCultivate(e.target.value)}
                                        id="speciesToCultivate"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.speciesToCultivate}
                                        helperText={errors.speciesToCultivate}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />


                                    <TextField
                                        label={t('croprotation.form.plantingDate')}
                                        fullWidth={isMobile}
                                        value={plantingDate}
                                        type='date'
                                        onChange={(e) => setPlantingDate(e.target.value)}
                                        id="plantingDate"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.plantingDate}
                                        helperText={errors.plantingDate}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        type='date'
                                        label={t('croprotation.form.harvestDate')}
                                        fullWidth={isMobile}
                                        value={harvestDate}
                                        onChange={(e) => setHarvestDate(e.target.value)}
                                        id="harvestDate"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.harvestDate}
                                        helperText={errors.harvestDate}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.precedingSpecies')}
                                        fullWidth={isMobile}
                                        value={precedingSpecies}
                                        onChange={(e) => setPrecedingSpecies(e.target.value)}
                                        id="precedingSpecies"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.precedingSpecies}
                                        helperText={errors.precedingSpecies}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.targetMarket')}
                                        fullWidth={isMobile}
                                        value={targetMarket}
                                        onChange={(e) => setTargetMarket(e.target.value)}
                                        id="targetMarket"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.targetMarket}
                                        helperText={errors.targetMarket}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label={t('croprotation.form.tasks')}
                                        fullWidth={isMobile}
                                        value={tasks}
                                        onChange={(e) => setTasks(e.target.value)}
                                        id="tasks"
                                        sx={textFieldStyle}
                                        multiline
                                        rows={3}
                                        required
                                        error= {!!errors.tasks}
                                        helperText={errors.tasks}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        label={t('croprotation.form.deadline')}
                                        fullWidth={isMobile}
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        id="deadline"
                                        type='date'
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.deadline}
                                        helperText={errors.deadline}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.personInCharge')}
                                        fullWidth={isMobile}
                                        value={personInCharge}
                                        onChange={(e) => setPersonInCharge(e.target.value)}
                                        id="personInCharge"
                                        sx={textFieldStyle}
                                        required
                                        error= {!!errors.personInCharge}
                                        helperText={errors.personInCharge}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label={t('croprotation.form.notesObservations')}
                                        fullWidth={isMobile}
                                        value={notesObservations}
                                        onChange={(e) => setNotesObservations(e.target.value)}
                                        id="notesObservations"
                                        sx={textFieldStyle}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />


                                    <SummaryDialog
                                        values={formValues}
                                        translationKey="croprotation.form"
                                        open={openDialog}
                                        handleClose={handleCloseDialog}
                                        handleClearForm={clearForm}
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
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </form>
    );
};

