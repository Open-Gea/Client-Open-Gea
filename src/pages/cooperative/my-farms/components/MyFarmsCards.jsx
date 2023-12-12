import { Grid } from '@mui/material';
import { MyFarmsCard } from './MyFarmsCard';
import { getButtons } from './MyFarmsButtons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const MyFarmsCards = ({ page }) => {
  const { t } = useTranslation(["navigation"]);
  const modules = getButtons(100, page,t);

  return (
    <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
      {modules[0].items.map((module, i) => (
        <MyFarmsCard key={i} title={module.title} icon={module.icon} path={module.path} form={module.form} />
      ))}
    </Grid>
  );
};

MyFarmsCards.propTypes = {
  page: PropTypes.string,
};
