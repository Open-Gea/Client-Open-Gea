import React, {  useState } from 'react';
import { Grid, Container, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Green_Check_Mark_PNG_small from '../../../../../assets/video/soil_regeneration/Green_Check_Mark_PNG_small.png';

export const CoverManagement = ({ setLink, setCurrentTab }) => {
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
            soilIndicatorTwo: true
        })
    };

    const handleContinue = (e) => {
        setLink({
            Tillage: true
        })
        setCurrentTab(e,3);
    };


    return (
        <Container>
            <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box textAlign="center" mb={4}>
                                <h1>{t('coverManagement.question')}</h1>
                            </Box>
                            <Grid container spacing={3} justifyContent="space-around">
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={handleOpenDialogNegativeAnswer}>
                                        {tCommon('yes')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={handleOpenDialogPositiveAnswer}>
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
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <Grid container direction="column" justifyContent="flex-end" alignItems="center">
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12}>
                                    <div id='boxSoil_Regeneration_ImageBox'>
                                        <img src={Green_Check_Mark_PNG_small}></img>
                                    </div>

                                </Grid>
                                <Grid item xs={12} >
                                    <p> {t('negativeAnswer')}</p>

                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={4.5}>

                                </Grid>
                                <Grid item xs={7.5}>
                                    <Button className="ButtonFirst"
                                        onClick={() =>
                                            setLink({

                                                CoverManagementTemplate: true,

                                            })
                                        }>
                                        {tCommon('continue')}
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </DialogContent>
                
                </Dialog>

                <Dialog
                    open={openDialogNegativeAnswer}
                    onClose={handleCloseDialogNegativeAnswer}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>

                        <Grid container >
                            <Alert severity="error">
                                <AlertTitle>{t('coverManagement.positiveAnswer.title')}</AlertTitle>
                                {t('coverManagement.positiveAnswer.body')}
                            </Alert>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{t('coverManagement.positiveAnswer.covercrops.title')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {t('coverManagement.positiveAnswer.covercrops.body')}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>  {t('coverManagement.positiveAnswer.mulching.title')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {t('coverManagement.positiveAnswer.mulching.body')}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography> {t('coverManagement.positiveAnswer.agroforestrySystems.title')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {t('coverManagement.positiveAnswer.agroforestrySystems.body')}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                    <Button className="ButtonFirst"
                                        onClick={() =>
                                            setLink({

                                                CoverManagementTemplate: true,

                                            })
                                        }>
                                        {tCommon('continue')}
                                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    )
}
