// utils
import { useSelector } from 'react-redux';
import createAvatar from '../../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export const MyAvatar = ({ ...other }) => {
  const { user, cooperative, isCooperative } = useSelector(s => s.authSlice);

  const defaultAvatar = '/assets/images/avatars/avatar_default.jpg';

  // Method to get the image
  const createImageSrc = data => {
    if (data === undefined) {
      return '/assets/avatars/avatar_default.jpg';
    } else {
      return URL.createObjectURL(new Blob([new Uint8Array(imageToUse?.data)], { type: 'image/png' }));
    }
  };

  // Method to define the avatar and name based on the user/cooperative
  const imageToUse = isCooperative ? cooperative?.profilePicture : user?.profilePicture;
  const displayName = isCooperative ? cooperative?.name : user?.displayName;

  return (
    <Avatar
      src={createImageSrc(imageToUse)}
      alt={isCooperative ? cooperative?.name : user?.firstName}
      color={createImageSrc(imageToUse) === defaultAvatar ? 'default' : createAvatar(displayName).color}
      {...other}
    >
      {createImageSrc(imageToUse) === defaultAvatar ? 'default' : createAvatar(displayName).name}
    </Avatar>
  );
};
