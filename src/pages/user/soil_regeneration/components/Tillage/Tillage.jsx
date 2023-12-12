import React from 'react';

import { Grid, Container, Box, Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export const Tillage = ({ setLink , setCurrentTab}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');

    const handlePositiveAnswer = () => {
        setLink({
            FarmingTypeComponent: true
        })
    };

    const handleNegativeAnswer = () => {
        setLink({
            Fertilization: true
        })
    };

    const handleBack = (e) => {
        setLink({
            coverManagement: true
        })
        setCurrentTab(e,2)
    };

    const handleContinue = (e) => {
        setLink({
            Fertilization: true
        })
        setCurrentTab(e,4)
    };

    return (
        <Container>
            <Grid container spacing={3} direction="column" >
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box textAlign="center" mb={4}>  {/* Adding margin-bottom */}
                                <h1>{t('tillage.question')}</h1>
                            </Box>
                            <Grid container spacing={3} justifyContent="space-around">
                                <Grid item>
                                    <Button color="primary"  fullWidth={isMobile} variant="outlined" onClick={handlePositiveAnswer}>
                                        {tCommon('yes')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button   color="primary"  fullWidth={isMobile} variant="outlined"  onClick={handleNegativeAnswer}>
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
                            <Button fullWidth={isMobile} variant="outlined"    className="ButtonFirst" onClick={handleBack}>
                                {tCommon('back')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth={isMobile} variant="outlined"    className="ButtonFirst"  onClick={handleContinue}>
                                {tCommon('continue')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
