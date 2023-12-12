import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
} from '@mui/material';
import { useTheme } from '@emotion/react';
// Components
import Iconify from '../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import { useTranslation } from 'react-i18next'; 
import ActionToolIcon from '../../../../assets/actionTool2.png';
import FilterToolIcon from '../../../../assets/countryFilter.png';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InformationDialog({ onClose, open, title, edit, farmInfo }) {

  const { t } = useTranslation('georeferencing');
  const theme = useTheme();

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {t('useGuide')}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={8} md={6}>
              {t('useGuideMessages.general')}
              <br></br>
              <br></br>

              <table>
                <tr>
                  <th>{t('inputs.icon')}</th>
                  <th>{t('inputs.use')}</th>
                </tr>
                <br></br>
                <tr >
                  <td><a href=""><center><img src="https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=F|00AB55|FFFFFF" alt="icon" width="20" height="28" /></center></a></td>
                  <td>&nbsp; {t('useGuideMessages.mapIcon')}
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td><a href=""><img src={ActionToolIcon} alt="icon" width="45" height="45" /></a></td>
                  <td>&nbsp; {t('useGuideMessages.detailsIcon')} </td>
                </tr>
                <br></br>
                <tr>
                  <td><a href=""><img src={FilterToolIcon} alt="icon" width="45" height="45" /></a></td>
                  <td>&nbsp; {t('useGuideMessages.filterIcon')} </td>
                </tr>
              </table>



            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

InformationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  farmInfo: PropTypes.object,
};
