import React, { useState } from 'react';
import { SensitizationOne, SensitizationTwo } from '../components/Sensitization.jsx';
import { CarbonCaptureOne } from '../components/CarbonCapture/CarbonCaptureOne.jsx';
import { CarbonCaptureTwo } from '../components/CarbonCapture/CarbonCaptureTwo.jsx';
import { CarbonCaptureTree } from '../components/CarbonCapture/CarbonCaptureTree.jsx';
import { SoilVocationOne } from '../components/SoilVocation/SoilVocationOne.jsx';
import { SoilVocationTwo } from '../components/SoilVocation/SoilVocationTwo.jsx';
import { SoilIndicatorOne } from '../components/SoilIndicators/SoilIndicatorOne.jsx';
import { SoilIndicatorTwo } from '../components/SoilIndicators/SoilIndicatorTwo.jsx';
import { SoilTreatment } from '../components/SoilTreatment/SoilTreatment.jsx';
import { CoverManagement } from '../components/CoverManagement/CoverManagement.jsx';
import { CoverManagementTemplate } from '../components/CoverManagement/CoverManagementTemplate.jsx';
import { Tillage } from '../components/Tillage/Tillage.jsx';
import { FarmingTypeComponent } from '../components/Tillage/components/FarmingTypeComponent.jsx';
import { TillageForm } from '../components/Tillage/components/TillageForm.jsx';
import { Fertilization } from '../components/Fertilization/Fertilization.jsx';
import { FertilizationForm } from '../components/Fertilization/FertilizationForm.jsx';
import { PruningManagement } from '../components/pruningManagement/PruningManagement.jsx';
import { PruningManagementForm } from '../components/pruningManagement/PruningManagementForm.jsx';
import { CropRotation } from '../components/CropRotation/CropRotation.jsx';
import { CropRotationForm } from '../components/CropRotation/CropRotationForm.jsx';
import { IrrigationSystems } from '../components/IrrigationSystems/IrrigationSystems.jsx';
import { IrrigationSystemsForm } from '../components/IrrigationSystems/IrrigationSystemsForm.jsx';
import { NavTab } from '../components/NavTab/NavTab.jsx';
import { Grid, Container, Box, Button, Card, CardContent } from '@mui/material';
import '../css/general.css';

export const Soil_Regeneration = () => {
  const [link, setLink] = useState({
    sensitizationOne: true,
    sensitizationTwo: false,
    carbonCaptureOne: false,
    carbonCaptureTwo: false,
    carbonCaptureTree: false,
    soilVocationOne: false,
    soilVocationTwo: false,
    soilIndicatorOne: false,
    soilIndicatorTwo: false,
    soilTreatment: false,
    coverManagement: false,
    CoverManagementTemplate: false,
    Tillage: false,
    FarmingTypeComponent: false,
    TillageForm: false,
    Fertilization: false,
    FertilizationForm: false,
    PruningManagement: false,
    PruningManagementForm: false,
    CropRotation: false,
    CropRotationForm: false,
    IrrigationSystems: false,
    IrrigationSystemsForm: false,
  });
  const handleLinkChange = newLink => {
    setLink(newLink);
  };

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <div>
      <Box mt={2} mb={2}>
        <NavTab value={currentTab} handleTabChange={handleTabChange} setLink={handleLinkChange} />
      </Box>
      {
        (link.sensitizationOne && <SensitizationOne setLink={handleLinkChange} setCurrentTab={handleTabChange} />) ||
        (link.sensitizationTwo && <SensitizationTwo setLink={handleLinkChange} />) ||
        (link.carbonCaptureOne && <CarbonCaptureOne setLink={handleLinkChange} setCurrentTab={handleTabChange} />) ||
        (link.carbonCaptureTwo && <CarbonCaptureTwo setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.soilVocationOne && <SoilVocationOne setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.soilVocationTwo && <SoilVocationTwo setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.soilIndicatorOne && <SoilIndicatorOne setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.soilIndicatorTwo && <SoilIndicatorTwo setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.coverManagement && <CoverManagement setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.CoverManagementTemplate && <CoverManagementTemplate setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.Tillage && <Tillage setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.FarmingTypeComponent && <FarmingTypeComponent setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.TillageForm && <TillageForm setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.Fertilization && <Fertilization setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.FertilizationForm && <FertilizationForm setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.PruningManagement && <PruningManagement setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.PruningManagementForm && <PruningManagementForm setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.CropRotation && <CropRotation setLink={handleLinkChange} setCurrentTab={handleTabChange} />) ||
        (link.CropRotationForm && <CropRotationForm setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.IrrigationSystems && <IrrigationSystems setLink={handleLinkChange} setCurrentTab={handleTabChange} />) ||
        (link.IrrigationSystemsForm && <IrrigationSystemsForm setLink={handleLinkChange} setCurrentTab={handleTabChange}/>) ||
        (link.soilTreatment && <SoilTreatment setLink={handleLinkChange} setCurrentTab={handleTabChange}/>)
      }
        
    </div>
  );
};
