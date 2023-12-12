import { Grid } from '@mui/material';
import { RecordCard } from './RecordCard';
import { getButtons } from './RecordsButtons/';
import PropTypes from 'prop-types';


export const RecordCards = ({ page }) => {

  const modules = getButtons(100, page);

  return (
    <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
      {modules[0].items.map((module, i) => (
        <RecordCard key={i} title={module.title} icon={module.icon} path={module.path} form={module.form} />
      ))}
    </Grid>
  );
};

RecordCards.propTypes = {
  page: PropTypes.string,
};
