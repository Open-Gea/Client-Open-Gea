import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mui/material';

export const NavTab = ({ value, handleTabChange, setLink }) => {
  const { t } = useTranslation('soil-regeneration');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ borderRadius: '10px', backgroundColor: '#0000' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          handleTabChange(event, newValue);
          const aux = {};
          aux[event.target.name] = true;
          setLink(aux);
        }}
        variant={isMobile ? 'scrollable' : 'fullWidth'}
        scrollButtons={isMobile ? 'auto' : 'false'}
      >
        <Tab label= {t('navTab.intro')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={0}  name="sensitizationOne" />
        <Tab label={t('navTab.carbonCapture')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={1} name="carbonCaptureOne" />
        <Tab label={t('navTab.soil')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={2} name="soilVocationOne" />
        <Tab label={t('navTab.tillage')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={3} name="Tillage" />
        <Tab label={t('navTab.fertilization')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={4} name="Fertilization" />
        <Tab label={t('navTab.pruning')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={5} name="PruningManagement" />
        <Tab label={t('navTab.cropRotation')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={6} name="CropRotation" />
        <Tab label={t('navTab.irrigation')} sx={{ '&.Mui-selected': { color: '#21B36' } }} value={7} name="IrrigationSystems" />
        <Tab label={t('navTab.tasks')} sx={{ '&.Mui-selected': { color: '#21B36' } }}value={8} name="soilTreatment" />
      </Tabs>
    </AppBar>
  );
};
