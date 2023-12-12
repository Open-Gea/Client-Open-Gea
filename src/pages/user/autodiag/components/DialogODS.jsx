import { AppBar, Box, Button, ButtonGroup, Chip, Dialog, Grid, IconButton, MenuList, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Reset from '@mui/icons-material/RestartAlt';
import Close from '@mui/icons-material/Close';
import useResponsive from "../../../../hooks/useResponsive";
import { questions } from "../../../../_mock/db/autodiagQuestions";
import ReportIcon from '@mui/icons-material/Report';
import FileManager from "../../../../components/file-manager/FileManager";
import ConfirmationDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { useState } from "react";
import useAutodiagByUserAndRule from "../hooks/useAutodiagByUser.hook";
import { useSelector } from "react-redux";
import useFarmsByUser from "../../farms/hooks/useFarmsByUser.hook";
import useAnswersHook from "../hooks/useAnswers.hook";
import FileContainer  from "./FileContainer";

export default function DialogODS({open, onClose, name, description, questionsAndAnswers, odsId, rule, t, farmId}){
    const isDesk = useResponsive('up', 'lg')
    
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    
    const {refreshPreAnswers, watchAnswer, resetAnswers, setResetFilesFlag, resetFilesFlag} = useAnswersHook();


    const handleConfirmClose = () => {
        setConfirmationOpen(false);
        resetAnswers(odsId);
        };

    const sortedQandA = questionsAndAnswers.slice().sort((a, b) => {
        if (a.question.required && !b.question.required) {
          return -1;
        }
        if (!a.question.required && b.question.required) {
          return 1;
        }
        return 0;
      });
      
    
    return (
        <Dialog open={open === odsId}   onClose={onClose} maxWidth='md'>
            <AppBar >
                <Toolbar sx={{ justifyContent: 'space-between', py: '1vh' }}>
                    <Box display={"flex"} flexDirection='column'  >
                        <Typography><strong>{name}</strong></Typography>
                        <Typography>{description}</Typography>
                    </Box>
                    <Box>
                    <IconButton color="inherit" onClick={()=> setConfirmationOpen(true)} aria-label="close">
                        <Reset />
                    </IconButton>
                    <IconButton  color="inherit" onClick={onClose} aria-label="close">
                        <Close />
                    </IconButton>
                    </Box>
                </Toolbar>
                <Paper sx={{ width: '100%', overflowY: 'auto', maxHeight:'90vh'}}>
                    <MenuList>
                        {sortedQandA
                        .map((qA, index) => {
                            const {question, answer, completed} = qA;
                            return (
                                <Grid key={index} container spacing='true' sx={{ boxShadow: 1, py: '2vh'}}>
                                    <Grid item sx={{ paddingLeft: isDesk? '0' : '1vw', py: isDesk? '0' : '1vh',/* border: '1px solid black', */display: 'flex', alignItems:'center', justifyContent: isDesk? 'center' : 'flex-start'}} xs={12} md={1.2}>
                                        <Chip
                                        key={question.id}
                                        icon={<ReportIcon />}
                                        color={question.required ? 'primary' : 'warning'}     
                                        variant="outlined"
                                        label={question.required ? t('min') : t('desirable')}
                                        />  
                                    </Grid>
                                    <Grid item xs={12} md={7.8} sx={{display: 'flex', alignItems:'center', px: isDesk? '1vw' : '5vw'}}>
                                        <Typography>{question.question}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3} 
                                    sx={{display: 'flex', justifyContent: 'space-around',
                                     alignItems:'center', py: !isDesk && '1vh'
                                      }}>
                                        <Stack spacing={0}>
                                            <ButtonGroup>
                                            <Button
                                                color="success"
                                                onClick={() => {
                                                    refreshPreAnswers(question.id, answer?.id, {answer:'YES', urls: answer?.urls}, odsId)
                                                }}
                                                variant={watchAnswer(question.id)?.answer=== 'YES' ? 'contained' : 'outlined'}
                                            >
                                                {t('yes')}
                                            </Button>
                                            <Button
                                                //id={id}
                                                color="error"
                                                onClick={() => {
                                                    refreshPreAnswers(question.id, answer?.id, {answer: 'NO', urls: []}, odsId)
                                                }}
                                                variant={watchAnswer(question.id)?.answer === 'NO' ? 'contained' : 'outlined'}
                                            >
                                                {t('no')}
                                            </Button>
                                            </ButtonGroup>
                                        </Stack>
                                        <FileContainer 
                                        questionId={question.id} 
                                        odsId={odsId}
                                        resetFilesFlag={resetFilesFlag}
                                        setResetFilesFlag={setResetFilesFlag}/>
                                    </Grid>

                                </Grid>
                            )
                        })}
                    </MenuList>
                </Paper>
                <ConfirmationDialog
                    open={confirmationOpen}
                    onClose={() => setConfirmationOpen(false)}
                    onConfirm={handleConfirmClose}
                    actionName="Reset"
                    notes="Se perderan los cambios"
                />
            </AppBar>
        </Dialog>
    )
}

