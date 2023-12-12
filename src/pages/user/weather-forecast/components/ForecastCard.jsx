import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// For reusability purposes, this component receives an array of bulletPoints, so we can look through them,
// and render them.
/*  
  // For example
    [ { title: 'Status', value: 'Sunny' }, { title: 'Temperature', value: '20 C' } ]

    Would be rendered as:
    <div>
      <p> Status: <span>Sunny</span> </p>
      <p> Temperature: <span>20 C</span> </p>
    </div>
*/
export const ForecastCard = ({ mainIcon = null, icon = <Cloud fontSize='large' />, bulletPoints = [{ title: 'Not available', value: '' }] }) => (
  <Card sx={{ display: 'flex', maxHeight: '208px' }}>
    {/* Card Icon */}
    <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', p: 2, pl: 4 }}>{(mainIcon || icon)}</Box>
    {/* Card bullet points */}
    <CardContent sx={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      {bulletPoints.map(({ title, value }, index) => {
        return (
          <Fragment key={`${index}-${title}-${value}`}>
            <Typography variant="body1" color="text.secondary">
              {`${title}: `}
              <Typography variant="body2" color="text.primary" component="span">
                {value}
              </Typography>
            </Typography>
          </Fragment>
        );
      })}
    </CardContent>
  </Card>
);

ForecastCard.propTypes = {
  mainIcon: PropTypes.element, // it will overwrite the default icon with an Image.
  icon: PropTypes.element,
  bulletPoints: PropTypes.array,
};
