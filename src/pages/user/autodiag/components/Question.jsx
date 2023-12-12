import { AccordionDetails, Button, ButtonGroup, Grid, Stack, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import { useState } from 'react';
import UploadButton from './UploadButton';

export const Question = ({ sentence }) => {
  const [answer, setAnswer] = useState({ siColor: 'black', noColor: 'black', focus: null });

  const handleChange = e => {
    if (e.target.id === answer.focus) setAnswer({ siColor: 'black', noColor: 'black', focus: null });
    else if (e.target.id === 'si') setAnswer({ siColor: 'white', noColor: 'black', focus: 'si' });
    else if (e.target.id === 'no') setAnswer({ siColor: 'black', noColor: 'white', focus: 'no' });
  };

  return (
    <AccordionDetails sx={{ bgcolor: 'whitesmoke' }}>
      <Grid container sx={{ boxShadow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid item xs={8} md={10}>
          <Typography>{sentence}</Typography>
        </Grid>
        <Grid item xs={4} md={2}>
          <Stack sx={{ alignItems: 'center' }}>
            <ButtonGroup>
              <Button
                id="si"
                color="success"
                variant={answer.focus === 'si' ? 'contained' : 'outlined'}
                onClick={handleChange}
                sx={{ color: answer.siColor }}
              >
                Si
              </Button>
              <Button
                id="no"
                onClick={handleChange}
                color="error"
                sx={{ color: answer.noColor }}
                variant={answer.focus === 'no' ? 'contained' : 'outlined'}
              >
                No
              </Button>
            </ButtonGroup>
            <UploadButton sx={{ margin: 1 }} />
          </Stack>
        </Grid>
      </Grid>
    </AccordionDetails>
  );
};

Question.propTypes = {
  sentence: PropTypes.string,
};
