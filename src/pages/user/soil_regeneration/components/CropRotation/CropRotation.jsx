import React, { useEffect, useState } from 'react';

import { Grid, Typography , Container , Card ,CardContent , Box} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Green_Check_Mark_PNG_small from '../../../../../assets/video/soil_regeneration/Green_Check_Mark_PNG_small.png';
import Rectangle_137 from '../../../../../assets/video/soil_regeneration/Rectangle_137.png';


import { useTranslation } from 'react-i18next';

export const CropRotation = ({ setLink, setCurrentTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');


    const [openDialogPositiveAnswer, setOpenDialogPositiveAnswer] = useState(false);
    const [openDialogNegativeAnswer, setOpenDialogNegativeAnswer] = useState(false);

    const handleOpenDialogPositiveAnswer = () => {
        setOpenDialogPositiveAnswer(true);
    };

    const handleOpenDialogNegativeAnswer = () => {
        setOpenDialogNegativeAnswer(true);
    };


    const handleCloseDialogPositiveAnswer = () => {
        setOpenDialogPositiveAnswer(false);
    };

    const handleCloseDialogNegativeAnswer = () => {
        setOpenDialogNegativeAnswer(false);
    };


    const handleBack = (e) => {
        setLink({
            PruningManagement: true
        })
        setCurrentTab(e,5)
    };

    const handleContinue = (e) => {
        setLink({
            IrrigationSystems: true
        })
        setCurrentTab(e,7)
    };

    return (
        <Container>
            <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box textAlign="center" mb={4}>
                                <h1>{t('croprotation.rotationQuestion')}</h1>
                            </Box>
                            <Grid container spacing={3} justifyContent="space-around">
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={handleOpenDialogPositiveAnswer}>
                                        {tCommon('yes')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={handleOpenDialogNegativeAnswer}>
                                        {tCommon('no')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="space-between">
                        <Grid item>
                            <Button fullWidth={isMobile} variant="outlined" className="ButtonFirst" onClick={handleBack}>
                                {tCommon('back')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth={isMobile} variant="outlined" className="ButtonFirst" onClick={handleContinue}>
                                {tCommon('continue')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                open={openDialogPositiveAnswer}
                onClose={handleCloseDialogPositiveAnswer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div id='boxSoil_Regeneration_ImageBox'>
                                    <img src={Green_Check_Mark_PNG_small}></img>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <Typography variant="body1">
                                        {t('croprotation.positiveResponse')}
                                    </Typography>

                                    <Box ml={2}>
                                        <ul>
                                            <li>
                                                <Typography variant="body2">
                                                    {t('croprotation.advantages.pestControl')}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="body2">
                                                    {t('croprotation.advantages.weedControl')}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="body2">
                                                    {t('croprotation.advantages.increaseResidualNutrients')}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="body2">
                                                    {t('croprotation.advantages.legumeContribution')}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="body2">
                                                    {t('croprotation.advantages.increaseAgriculturalSustainability')}
                                                </Typography>
                                            </li>
                                        </ul>
                                    </Box>
                                </Box>
                            </Grid>


                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid item xs={12} direction="column" justifyContent="flex-end" alignItems="center" >
                        <Button className="ButtonFirst"
                            onClick={() =>
                                setLink({
                                    CropRotationForm: true,
                                })
                            }>
                            {tCommon('continue')}
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDialogNegativeAnswer}
                onClose={handleCloseDialogNegativeAnswer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div id='boxSoil_Regeneration_ImageBox'>
                                    <img src={Rectangle_137}></img>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body1">
                                        {t('croprotation.negativeResponse')}
                                    </Typography>
                                </Box>

                                <Box mt={2}>

                                    <ul>
                                        <li>
                                            <Typography variant="body1">
                                                {t('croprotation.advantages.pestControl')}
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body1">
                                                {t('croprotation.advantages.weedControl')}
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body1">
                                                {t('croprotation.advantages.increaseResidualNutrients')}
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body1">
                                                {t('croprotation.advantages.legumeContribution')}
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body1">
                                                {t('croprotation.advantages.increaseAgriculturalSustainability')}
                                            </Typography>
                                        </li>
                                    </ul>
                                </Box>
                            </Grid>


                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Grid item xs={12} direction="column" justifyContent="flex-end" alignItems="center" >
                        <Button className="ButtonFirst"
                            onClick={() =>
                                setLink({
                                    CropRotationForm: true
                                })
                            }>
                            {tCommon('continue')}
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>


            </Grid>
        </Container>
    )



}

