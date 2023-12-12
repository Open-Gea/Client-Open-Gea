import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Modal } from './Modal';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { setGeneralInfoEdit } from '../../../../redux/slices/records';

export const RecordCard = ({ title, icon, path, form }) => {
  // Handles modal
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [openComponent, setOpenComponent] = useState('');

  const { currentFarm } = useSelector(s => s.recordsSlice);
  const dispatch = useDispatch();

  const handleOpenModal = (event, title, component) => {
    event.preventDefault();
    setModalTitle(title);
    setOpenComponent(React.cloneElement(component, { handleCloseModal, handleOpenModal }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    dispatch(setGeneralInfoEdit(false));
    setOpenModal(false);
    setModalTitle('');
    setOpenComponent('');
  };

  const navigate = useNavigate();

  const handleClick = event => {
    event.preventDefault();
    if (!currentFarm?.id || !currentFarm) {
      enqueueSnackbar('Selecciona una finca por favor', { variant: 'error' });
      return;
    }
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

RecordCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  path: PropTypes.string,
  form: PropTypes.any,
};
