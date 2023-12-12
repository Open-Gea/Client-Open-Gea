import { Grid } from '@mui/material';
import navConfigCooperative from '../../layouts/dashboard/navbar/NavConfigCooperative';
import { ModuleCardCooperative } from '../module-card-cooperative/ModuleCardCooperative';
import { useTranslation } from 'react-i18next';

export const ModuleCardsCooperatives = () => {
  const { t } = useTranslation(["navigation"]);
  const cooperative = navConfigCooperative(100, t);
  const modules = cooperative;
  return (
    <>
      <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
        {modules[0].items.map((module, i) => (
          <ModuleCardCooperative key={i} title={module.title} icon={module.icon} path={module.path} />
        ))}
      </Grid>
    </>
  );
};
