import PropTypes from 'prop-types';

// components
import { IconButtonAnimate } from '../../../components/animate/IconButtonAnimate';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

// ----------------------------------------------------------------------

CollapseButton.propTypes = {
  collapseClick: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

export default function CollapseButton({ onToggleCollapse, collapseClick }) {
  return (
    <IconButtonAnimate onClick={() => onToggleCollapse()}>{collapseClick ? <PushPinOutlinedIcon /> : <PushPinIcon />}</IconButtonAnimate>
  );
}

// ----------------------------------------------------------------------
