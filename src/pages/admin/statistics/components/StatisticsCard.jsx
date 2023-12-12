import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Modal } from './Modal';
import { useNavigate } from 'react-router';

export const StatisticsCard = ({ title, icon, path, form }) => {
  // Handles modal
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [openComponent, setOpenComponent] = useState('');

  const handleOpenModal = (event, title, component) => {
    event.preventDefault();
    setModalTitle(title);
    setOpenComponent(React.cloneElement(component, { handleCloseModal, handleOpenModal }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalTitle('');
    setOpenComponent('');
  };

  const navigate = useNavigate();

  const handleClick = event => {
    event.preventDefault();
    if (path) navigate(path);
    else handleOpenModal(event, title, form);
  };

  return (
    <>
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
      <Modal title={modalTitle} openModal={openModal} closeModal={handleCloseModal} component={openComponent} />
    </>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  path: PropTypes.string,
  form: PropTypes.any,
};
