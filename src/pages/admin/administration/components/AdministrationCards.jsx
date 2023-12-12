import { Grid } from '@mui/material';
import { AdministrationCard } from './AdministrationCard';
import { getButtons } from './AdministrationButtons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const AdministrationCards = ({ page }) => {
  const { t } = useTranslation(["navigation"]);
  const modules = getButtons(100, page,t);

  return (
    <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
      {modules[0].items.map((module, i) => (
        <AdministrationCard key={i} title={module.title} icon={module.icon} path={module.path} form={module.form} />
      ))}
    </Grid>
  );
};

AdministrationCards.propTypes = {
  page: PropTypes.string,
};
