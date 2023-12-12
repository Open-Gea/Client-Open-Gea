import React, { useState } from "react";
import { Button, Card, Tooltip, CardContent, Box, Grid, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from 'react-i18next';


export const FarmingTypeComponent = ({ setLink }) => {
    const { t } = useTranslation('soil-regeneration');
    const { t: tCommon } = useTranslation('common');
    const [farmingType, setFarmingType] = useState("");
    const [primaryMachine, setPrimaryMachine] = useState("");
    const [secondaryMachine, setSecondaryMachine] = useState("");

    const handleChangeFarmingType = (event) => {
        setFarmingType(event.target.value);
    };

    const handleChangePrimaryMachine = (event) => {
        setPrimaryMachine(event.target.value);
    };

    const handleChangeSecondaryMachine = (event) => {
        setSecondaryMachine(event.target.value);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container >
            <Grid item xs={2} />
            <Card>
                <CardContent>
                    <Grid item xs={8}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: isMobile ? '100%' : '100ch', } }}>
                            <Typography variant="h6"> {t('tillage.farmingTypeComponent.question')}  </Typography>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t('tillage.farmingTypeComponent.type')} </FormLabel>
                                <RadioGroup value={farmingType} onChange={handleChangeFarmingType}>
                                    <Tooltip title={t('tillage.farmingTypeComponent.tooltip1')} >
                                        <FormControlLabel value="convencional" control={<Radio />} label={t('tillage.farmingTypeComponent.conventionalTillage')} />
                                    </Tooltip>
                                    <Tooltip title={t('tillage.farmingTypeComponent.tooltip2')}>
                                        <FormControlLabel value="conservacionista" control={<Radio />} label={t('tillage.farmingTypeComponent.conservationTillage')} />
                                    </Tooltip>
                                </RadioGroup>
                            </FormControl>

                            {farmingType && (
                                <>
                                    <Typography variant="h6">{t('tillage.farmingTypeComponent.questionMahine')}</Typography>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{t('tillage.farmingTypeComponent.selectMachine')}</FormLabel>
                                        <RadioGroup value={primaryMachine} onChange={handleChangePrimaryMachine}>
                                            {farmingType === "convencional" && (
                                                <>
                                                    <FormControlLabel value="aradoReja" control={<Radio />} label={t('tillage.farmingTypeComponent.moldboardplow')} />
                                                    <FormControlLabel value="aradoRotovator" control={<Radio />} label={t('tillage.farmingTypeComponent.roto')} />
                                                    <FormControlLabel value="aradoCasquetes" control={<Radio />} label={t('tillage.farmingTypeComponent.discplows')} />
                                                </>
                                            )}
                                            {farmingType === "conservacionista" && (
                                                <>
                                                    <FormControlLabel value="aradoSubsolador" control={<Radio />} label={t('tillage.farmingTypeComponent.subsoile')} />
                                                    <FormControlLabel value="aradoDescompactador" control={<Radio />} label={t('tillage.farmingTypeComponent.decompacting')} />
                                                    <FormControlLabel value="aradoCincel" control={<Radio />} label={t('tillage.farmingTypeComponent.chisel')} />
                                                </>
                                            )}
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{t('tillage.farmingTypeComponent.secondaryTillage')}</FormLabel>
                                        <RadioGroup value={secondaryMachine} onChange={handleChangeSecondaryMachine}>
                                            {farmingType === "convencional" && (
                                                <FormControlLabel value="rastraCasquetes" control={<Radio />} label={t('tillage.farmingTypeComponent.harrow')} />
                                            )}
                                            {farmingType === "conservacionista" && (
                                                <>
                                                    <FormControlLabel value="cultivadorCampo" control={<Radio />} label={t('tillage.farmingTypeComponent.fieldCultivator')} />
                                                    <FormControlLabel value="vibroCultivador" control={<Radio />} label={t('tillage.farmingTypeComponent.vibroCultivator')} />
                                                </>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </>
                            )}

                        </Box>
                        <Button
                            onClick={() =>
                                setLink({
                                    TillageForm: true
                                })
                            }
                            variant="contained" className="ButtonFirst">
                            {tCommon('continue')}
                        </Button>
                    </Grid>
                </CardContent>
            </Card>

            <Grid item xs={2} />
        </Grid>
    );
};