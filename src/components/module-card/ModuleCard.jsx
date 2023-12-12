import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

export const ModuleCard = ({ title, icon, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          '&:hover': { transform: 'scale(1.1)' },
          boxShadow: 10,
          transition: 'transform .2s',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <CardMedia sx={{ pt: 2 }}>{icon}</CardMedia>
        <CardContent>
          <Typography variant="h5" fontWeight="700">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

ModuleCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  path: PropTypes.string,
};
