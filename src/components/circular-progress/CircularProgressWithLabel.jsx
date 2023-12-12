import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {

  return (
    <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
            {props.title}
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant={props.isLoading ? "indeterminate": "determinate"} size={'3rem'} {...props} />
        <Box
            sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
          {!props.isLoading && 
            <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
            </Typography>}
        </Box>
        </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string
};


