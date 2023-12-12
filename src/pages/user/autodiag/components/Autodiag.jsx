import { Alert, Box, Card, Chip, Paper, Typography, useStepContext,
  TableRow,
  TableCell,
  Table,
  TableHead,
  LinearProgress,} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DialogAutodiag } from './DialogAutodiag';
import { DialogQuestion } from './DialogQuestion';
import { FarmSelector } from './FarmSelector';
// redux
import { useSelector } from 'react-redux';
import { getAnswers, getQuestions, saveAnswers, saveFiles } from '../utils/getQuestions';
import { Stack } from 'react-bootstrap';
import { getFarmsById } from '../utils/getFarms';
import { Helmet } from 'react-helmet-async';
// Translation module
import { useTranslation } from 'react-i18next';

export default function Autodiag() {
  const [isExpanded, setExpanded] = useState(-1);
  const [open, setOpen] = useState(false);
  const { user } = useSelector(s => s.authSlice);
  const [expand, setExpand] = useState(null);
  const [questions, setQuestions ] = useState([]);
  const [answers, setAnswers ] = useState([]);
  const [saveChanges, setSaveChanges] = useState(false);
  const [savingInProgress, setSavingInProgress] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [error, setError] = useState(null);
  const [farms, setFarms ] = useState([]);
  const [farmId, setFarmId] = useState('');

  const [actualDiag, setActualDiag] = useState({}); // Estado para almacenar las respuestas
  const [fileDiag, setFileDiag] = useState({}); // Estado para almacenar las respuestas
  const [loading, setLoading] = useState(false); // Variable de estado para el indicador de carga

  const handleClickOpen = id => {
    setOpen(true);
    setExpand(id);
  };
  const handleClose = () => {
    setActualDiag([])
    setFileDiag([])
    setOpen(false);
  };
  const { t } = useTranslation('self-diagnosis');
  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
  };
  //Enviamos las respuestas
  const handleSaveChanges = async () => {
    try {
      setLoading(true); 
      const userAnswers = {
        answers: Object.entries(actualDiag).map(([questionId, answer]) => ({ [questionId]: answer })),
        user: user.id,
        farm: farmId,
      };
      setSavingInProgress(true);
      await saveAnswers(userAnswers);
      await saveFiles(fileDiag.files,farmId,user.id)
      // setSaveChanges(true);
      // setLoading(false); 
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
    }
  };

  useEffect(() => {
    if (savingInProgress) {
      const timeout = setTimeout(() => {
        setSaveChanges(true);
        setAlertModal(true);
        setSavingInProgress(false);
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [savingInProgress]);
  
  //Obtenemos las preguntas
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions(); 
        const data =  response.data
        if(data === undefined){
          setError('Ocurrió un error al obtener las preguntas. Por favor, inténtalo más tarde.');
        }
        setQuestions(data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        setError('Ocurrió un error al obtener las preguntas. Por favor, inténtalo más tarde.');

      }
    };

    fetchQuestions();
  }, []);

  //Obtenemos las fincas
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await getFarmsById(user.id);
        const data =  response.data
        setFarms(data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        setError('Ocurrió un error al obtener las preguntas. Por favor, inténtalo más tarde.');

      }
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    if (alertModal) {
      const timer = setTimeout(() => {
        setAlertModal(false);
      }, 4500);
  
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alertModal]);

  //Obtenemos las respuestas
  useEffect(() => {
    const fetchAswers= async () => {
      try {
        setLoading(true); 
        const response = await getAnswers(user.id,farmId); 
        const data =  response.data;
        if(data === undefined){
          setError('Ocurrió un error al obtener las respuestas. Por favor, inténtalo más tarde.');
        }
          setAnswers(data);
          setSaveChanges(false);
          setLoading(false); 

      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        setError('Ocurrió un error al obtener las respuestas. Por favor, inténtalo más tarde.');

      }
    };
    if(farmId){
      fetchAswers();

    }
  }, [saveChanges,farmId]);


  // Agrupar las preguntas por categoría
  const groupedQuestions = questions.reduce((acc, question) => {
    const category = question.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {});

  // Obtener solo el criterio del topico
  function obtainCriteria(question) {
    const startIndex = question.indexOf('[');
    const endIndex = question.indexOf(']');
  
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      return '';
    }
  
    return question.substring(startIndex + 1, endIndex);
  }

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
    }}>
      <Typography variant="h4" align='center' sx={{ mt: 3, ml: 3 }}>
              {t('title')}
      </Typography>
    </Paper>
    <Paper sx={{ ml: '4%', width: '92% ', boxShadow: 5, mt: 3, pb: 0 }}>
      <Card sx={{ p: 2 }}>
        <FarmSelector
          // handleClickOpen={handleClickOpen}
          handleChange={handleChange}
          farms={farms}
          farmId={farmId}
          // handleClose={handleClose}
          error={!!error}
          // isLoading={isLoading}
        />
      </Card>
      <Stack spacing={4}>
        {alertModal && (
          <Alert severity="success">
            {t('actionMessages.answersSaved')}
          </Alert>)}
          {error && (
          <Alert severity="error">
          {error}
          </Alert>
          )}
          {!farmId && (
          <Alert severity="info">
          {t('actionMessages.selectFarm2')}
          </Alert>
          )}
      </Stack>
      <>
      <Stack spacing={4}>
        {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => {
          const completedCategory = answers && answers.categoryStatus?.find(categoryData => categoryData.categoryData.categoryName === category);
          const percentageRequired = completedCategory && completedCategory.categoryData.percentageRequired;
          const percentageNonRequired = completedCategory && completedCategory.categoryData.percentageNonRequired;
          if (error || !farmId) {
            return null; // No se renderiza el componente si hay un error o no esta definida la finca
          }
          if(loading) {
            return (   <LinearProgress sx={{ my: 5 }} />)
          }
          return (
            
            <DialogAutodiag
              open={open}
              handleClickOpen={handleClickOpen}
              id={category}
              expand={expand}
              key={category}
              title={t('topics.'+(obtainCriteria(category)+'.title'))}
              handleClose={handleClose}
              handleSaveChanges={handleSaveChanges}
              actualDiag={actualDiag}
              setActualDiag={setActualDiag}
              setFileDiag= {setFileDiag}
              categoryQuestions={categoryQuestions}
              answers={answers}
              percentageRequired={percentageRequired}
              percentageNonRequired={percentageNonRequired}
              categoryQuestion={(obtainCriteria(category))}
            >
            
              <Chip
                icon={<ReportIcon />}
                label={t('buttons.minimumIndicators')}
                color="warning"
                variant="outlined"
                sx={{ ml: { xs: 3, md: 3 }, mt: 5 }}
              />
              {categoryQuestions.filter(question => question.required).map((question, i) => (
                <DialogQuestion sentence={question.question} key={question.id} />
              ))}
              <hr />
              <Chip
                icon={<TaskAltIcon />}
                label={t('buttons.desirableIndicators')}
                color="info"
                variant="outlined"
                sx={{ ml: { xs: 3, md: 3 }, mt: 4 }}
              />
              {categoryQuestions.filter(question => !question.required).map((question, i) => (
                <DialogQuestion sentence={question.question} key={question.id} />
              ))}
            </DialogAutodiag>
          );
        })}
        </Stack>
      </>
    </Paper>

  </>
);
}
