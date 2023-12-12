import { Box, capitalize, Chip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';
// Translation module
import { useTranslation } from 'react-i18next';

export const CustomAcordion = ({ id, title, children, isExpanded, handleChange, sx }) => {
  const aria = `panel${id}bh-content`;
  const acordionId = `panel${id}bh-header`;
  // Added for translations
  const { t } = useTranslation('self-diagnosis');

  return (
    <>
      <Accordion expanded={isExpanded === id} onChange={handleChange(id)} sx={{ ...sx, boxShadow: 5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={aria} id={acordionId}>
          <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
            <Typography sx={{ maxWidth: '70%', flexShrink: 0 }}>{capitalize(title)}</Typography>
            <Chip icon={<ErrorOutlineIcon fontSize="small" />} label={t('buttons.notCompleted')} color="warning" />
          </Box>
        </AccordionSummary>
        {children}
      </Accordion>
    </>
  );
};
CustomAcordion.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.any,
  isExpanded: PropTypes.number,
  handleChange: PropTypes.func,
  sx: PropTypes.object,
};
