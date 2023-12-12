import { Alert, Box, Button, Card, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { FarmSelector } from "./FarmSelector";
import useFarmsByUser from "../../farms/hooks/useFarmsByUser.hook";
import { useSelector } from "react-redux";
import useAutodiagByUserAndRule from "../hooks/useAutodiagByUser.hook";
import ODSRow from "./ODSRow";
import useAnswersHook from "../hooks/useAnswers.hook";
import { useEffect, useState } from "react";
import Save from '@mui/icons-material/Save';

export default function AutoDiagV2({t, rule, title}){

    const { user } = useSelector(state => state.authSlice);
    const {farms, farmId, handleFarmSelect, error: errorFarms, isLoading: isLoadingFarms} = useFarmsByUser(user)
    const {  error: errorAutodiag, isLoading: isLoadingAtodiag, answersGroupByCategories, submitAnswers, changes} = useAutodiagByUserAndRule(user, rule, farmId)
    
    return (
        <>
        <Helmet>
            <title> {t('titleWeb')} | yvy </title>
        </Helmet>
        <Paper
            sx={{
            ml: '4%',
            width: '92%',
            boxShadow: 5,
            mt: 1,
            pb: 0,
            p: '15px', // Añadir un relleno interno para dar espacio al contenido
            backgroundColor: '', // Cambiar el color de fondo del Paper
            borderRadius: '8px', // Añadir bordes redondeados al Paper
            }}
        >
            <Typography variant="h4" align='center' sx={{ mt: 3, ml: 3 }}>
                {title}
            </Typography>
        </Paper>
        <Paper sx={{ ml: '4%', width: '92% ', boxShadow: 5, mt: 3, pb: 0 }}>
            <Card sx={{p: 2, display:'inline-flex', minWidth: '100%', justifyContent: 'space-between'}}>
                <FarmSelector 
                    farms={farms} 
                    farmId={farmId} 
                    error={errorFarms} 
                    isLoading={isLoadingFarms} 
                    handleChange={handleFarmSelect}
                    />
                
                <IconButton size="large" color="primary" onClick={submitAnswers} aria-label="close">
                    <Save size="large"/>
                </IconButton>
                
            </Card>
            <Stack spacing={4}>
                {errorFarms && (
                <Alert severity="error">
                {errorFarms}
                </Alert>
                )}
                {!farmId && (
                <Alert severity="info">
                {t('actionMessages.farmNotSelected')}
                </Alert>
                )}
                {errorAutodiag && (
                <Alert severity="error">
                {errorAutodiag}
                </Alert>
                )}
                {changes && (
                    <Alert severity="warning">{t('actionMessages.notSafe')}</Alert>
                )}
            </Stack>

            {
                farmId &&
                <Stack spacing={4}>
                <>
                {
                    // isLoadingAtodiag ? 
                    // <LinearProgress /> 
                    // :
                    answersGroupByCategories.map((a, index) =>(
                        <ODSRow
                        key={index} 
                        t={t} 
                        answersGroup={a}
                        farmId={farmId}
                        isLoading={isLoadingAtodiag}
                        />
                    ))
                }
                </>
            </Stack>}
        </Paper>
        </>
    )
}