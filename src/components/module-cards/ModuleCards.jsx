import { Grid } from '@mui/material';
import navConfig from '../../layouts/dashboard/navbar/NavConfig';
import { ModuleCard } from '../module-card/ModuleCard';
import { useTranslation } from 'react-i18next';

export const ModuleCards = () => {
  const { t } = useTranslation(["navigation"]);
  const user = navConfig(100, t);
  const modules = user;
  return (
    <>
      <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
        {modules[0].items.map((module, i) => (
          <ModuleCard key={i} title={module.title} icon={module.icon} path={module.path} />
        ))}
      </Grid>
    </>
  );
};
