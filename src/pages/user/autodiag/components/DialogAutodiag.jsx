import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  MenuItem,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
  Typography,
  Chip,
  Paper,
  MenuList,
  Box,
  capitalize,
  Snackbar,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableContainer
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DialogQuestion } from './DialogQuestion';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogAutodiag({ id, title, open, handleClickOpen, handleClose, expand, handleSaveChanges, actualDiag, setActualDiag, setFileDiag, categoryQuestions, answers,percentageRequired,percentageNonRequired, categoryQuestion }) {
  const [open2, setOpen2] = useState(false);
  // Added for translations
  const { t } = useTranslation('self-diagnosis');

  const handleClose2 = () => {
    setOpen2(false);
    handleClose();
    
  };
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  function getColorFromPercentage(percentage) {
    if (percentage === 100) {
      return 'success';
    } else if (percentage >= 50 && percentage < 100) {
      return 'warning';
    } else {
      return 'error';
    }
  }
  
  const handleChange = (questionId, answer) => {
 
    setActualDiag((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));};

    const handleFileChange = (questionId, file) => {
      setFileDiag((prevState) => ({
        ...prevState,
        files: {
          ...prevState.files,
          [questionId]: file,
        },
      }));
    };  

  const isQuestionAnswered = (question) => {
    const questionId = question.id;
    return actualDiag.hasOwnProperty(questionId);
  };

  const isAnswerSelected = (question, answer) => {
    const questionId = question.id;
    return actualDiag[questionId] === answer;
  };

  const Question = ({ title }) => {
    const criteriaRegex = /\[([^[\]]+)\]/g;
    const questionParts = title.split(criteriaRegex);
  
    return (
      <Typography sx={{ my: '7px', maxWidth: '80%' }}>
        {questionParts.map((part, index) => {
          if (index % 2 === 1) {
            // Criterio en negrita
            return (
              <React.Fragment key={index}>
                [{<strong>{part}</strong>}]
              </React.Fragment>
            );
          }
          return part;
        })}
      </Typography>
    );
  };
  

  return (
    <>
      <Box>

        <MenuItem divider sx={{ justifyContent: 'space-between', whiteSpace: 'normal', alignContent: 'center' }} onClick={() => handleClickOpen(id)}>
        <Question title={title} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            sx={{ mr: '5px' }}
            icon={<ErrorOutlineIcon fontSize="small" />}
            label={ (percentageRequired === 100 ? t('actionMessages.completed') : `${percentageRequired}%`)}
            color={getColorFromPercentage(percentageRequired)}
          />
          <KeyboardArrowDownIcon sx={{}} />
            {typeof percentageNonRequired !== 'undefined' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                p: '4px'
              }}
            >
              <Typography variant="body2" color="textSecondary">
              {t('actionMessages.recomended')}:{percentageNonRequired}%
              </Typography>
            </Box>
          )}
          </Box>
        </MenuItem>
      </Box>
      <Dialog maxWidth='md' open={open && expand === id} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'sticky' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Question title={title} />
            <Button autoFocus color="inherit" onClick={() => {
              handleSaveChanges();
              handleClose();
              }}>
              {t('buttons.save')}
            </Button>
            <Snackbar
              open={open2}
              autoHideDuration={6000}
              onClose={handleClose2}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              TransitionComponent={TransitionLeft}
            >
            
            </Snackbar>
          </Toolbar>
        </AppBar>
        <Paper sx={{ width: '100%' }}>
          <MenuList>
            <Chip
              icon={<ReportIcon />}
              label={t('buttons.minimumIndicators')}
              color='primary' style={{backgroundColor:'#ccdccd'}}
              variant="outlined"
              sx={{ ml: { xs: 3, md: 3 }, mt: 5 }}
            />
            {categoryQuestions
              .filter(question => question.required)
              .map((question, i) => (
                <DialogQuestion
                  key={question.id}
                  question={question}
                  handleChange={handleChange}
                  handleFileChange= {handleFileChange}
                  isAnswered={isQuestionAnswered(question)}
                  isAnswerSelected={isAnswerSelected}
                  answers={answers}
                  positionI={i}
                  category={categoryQuestion}
                  typeQuestion="M"
                />
              ))}
            <hr />
            <Chip
              icon={<TaskAltIcon />}
              label={t('buttons.desirableIndicators')}
              color="warning"
              variant="outlined"
              sx={{ ml: { xs: 3, md: 3 }, mt: 4 }}
            />
            {categoryQuestions
              .filter(question => !question.required)
              .map((question, i) => (
                <DialogQuestion
                  key={question.id}
                  question={question}
                  handleChange={handleChange}
                  handleFileChange= {handleFileChange}
                  isAnswered={isQuestionAnswered(question)}
                  isAnswerSelected={isAnswerSelected}
                  answers={answers}
                  positionI={i}
                  category={categoryQuestion}
                  typeQuestion="D"
                />
              ))}
          </MenuList>
        </Paper>
      </Dialog>
    </>
  );
}

DialogAutodiag.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  expand: PropTypes.string,
  handleClickOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleSaveChanges: PropTypes.func,
  actualDiag: PropTypes.any,
  setActualDiag: PropTypes.func,
  categoryQuestions: PropTypes.array,
};