import { Button, ButtonGroup, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Translation module
import { useTranslation } from 'react-i18next';

export function DialogQuestion({ question, handleChange, handleFileChange, isAnswered, isAnswerSelected, answers, positionI, category, typeQuestion}) {
  const { id, question: sentence } = question;

  // Added for translations
  const { t } = useTranslation('self-diagnosis');
  
  const hasAnswer = answers && answers.answers && answers.answers.find(answer => answer.id === id);
  const answer = hasAnswer ? hasAnswer.answer : null;
  const fileFromDB = hasAnswer && hasAnswer.file ? hasAnswer.file : null;
  const [selectedAnswer, setSelectedAnswer] = useState(answer);
  const [selectedFile, setSelectedFile] = useState(fileFromDB);
  const isFileButtonDisabled = !selectedAnswer || selectedAnswer.trim() === '' || selectedAnswer === 'No';
  const [nameFile, setNameFile] = useState('');
  const noFile = answer === "Si" && !fileFromDB ? true : false ;
  const [fileUrl, setFileUrl] = useState(null);
  const [buffer, setBuffer] = useState('')
  const handleYesClick = () => {
    handleChange(id, 'Si');
    setSelectedAnswer('Si');
  };

  const handleNoClick = () => {
    handleChange(id, 'No');
    setSelectedAnswer('No');
  };

  const handleFileChangee = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : '';
    setNameFile(fileName);
    const fileBuffer = file ? file.buffer : null; 
    setBuffer(fileBuffer)
    setSelectedFile(file);
    handleFileChange(id, file);

  };

  useEffect(() => {
    if (selectedFile) {
      if (fileFromDB) {
        setNameFile(selectedFile.filename);
      }
     
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFileUrl(fileReader.result);
      };
      const blob = new Blob([new Uint8Array(selectedFile.fileBuffer?.data)]);
      fileReader.readAsDataURL(blob);
    } else {
      setFileUrl(null);
    }
  }, [selectedFile]);

  const handleDownloadPdf = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = nameFile;
    link.click();
  };
  return (
    <>
      <Grid container sx={{ boxShadow: 1, display: 'flex', alignItems: 'center', px: 3, py: 1 }}>
        <Grid item xs={8} md={10}>
          <Typography sx={{ maxWidth: '92%' }}>{typeQuestion === 'M' ? t('topics.'+category+'.minimumIndicators.'+positionI) : t('topics.'+category+'.maximumIndicators.'+positionI)}</Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Stack sx={{ my: 2, alignItems: 'center' }} spacing={0}>
            <ButtonGroup>
              <Button
                id={id}
                color="success"
                variant={selectedAnswer === 'Si' ? 'contained' : 'outlined'}
                onClick={handleYesClick}
              >
                {t('buttons.yes')}
              </Button>
              <Button
                id={id}
                color="error"
                variant={selectedAnswer === 'No' ? 'contained' : 'outlined'}
                onClick={handleNoClick}
              >
                {t('buttons.no')}
              </Button>
            </ButtonGroup>
          </Stack>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              component="label"
              disabled={isFileButtonDisabled}
            >
              <AttachFileIcon /> 
              {t('buttons.uploadCertificate')}
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChangee}
                name="urls"
                style={{ display: "none" }}
              />
            </Button>
            {selectedFile && nameFile && (
                <a
                  href={fileUrl}
                  download={nameFile}
                  onClick={handleDownloadPdf}
                  style={{
                    color: '#00ab55', // Cambiar color de letra a verde oscuro
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    background: 'none', // Eliminar fondo
                  }}
              
                >
                  {nameFile.length > 20 ? `${nameFile.slice(0, 20)}...` : nameFile}
                </a>
              )}
            {noFile && !nameFile &&(
             <a style={{fontWeight: 'initial', color: 'red'}}>{t('buttons.missingEvidence')}</a>
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}

DialogQuestion.propTypes = {
  question: PropTypes.object,
  handleChange: PropTypes.func,
  isAnswered: PropTypes.bool,
  isAnswerSelected: PropTypes.func,
};