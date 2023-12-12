import PropTypes from 'prop-types';
import * as Yup from 'yup';


import { forwardRef, useState, useEffect } from 'react';
// MUI
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Slide,
    Avatar,
} from '@mui/material';

import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../components/utils/Iconify';

import SaveIcon from '@mui/icons-material/Save';
import { EditSharp } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

import { updateProfilePictureCooperative } from '../../../../redux/slices/auth';

// Translation module
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ChangeProfilePicture({ onClose, open, profilePictureDataURL }) {
    const theme = useTheme();
    const [selectedImageURL, setSelectedImageURL] = useState(profilePictureDataURL);
    const [newProfileImage, setNewProfileImage] = useState('');

    const dispatch = useDispatch();

    const { user } = useSelector(s => s.authSlice);

    // Added for translations
    const { t } = useTranslation('user-profile');

    const UpdateProfileSchema = Yup.object().shape({
        profilePicture: Yup.string()
            .required('Introduce un nombre')
    });
    const defaultValues = { profilePicture: '' };

    const methods = useForm({
        resolver: yupResolver(UpdateProfileSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async () => {
        try {

            if (newProfileImage) {
                const bufferJSON = arrayBufferToBufferJSON(newProfileImage);
                dispatch(updateProfilePictureCooperative(bufferJSON));
              }

          reset();
           onClose();
        } catch (error) {

            console.log(error);

        }
      };
    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {

            setSelectedImageURL(e.target.result);

        };

        reader.readAsDataURL(file);


        const bufferReader = new FileReader();
        bufferReader.onload = (e) => {
          setNewProfileImage(e.target.result);
        };
        bufferReader.readAsArrayBuffer(file);
    };


    const arrayBufferToBufferJSON = (buffer) => {
        const uint8Array = new Uint8Array(buffer);
        const data = Array.from(uint8Array);
        return { type: "Buffer", data };
      };

    useEffect(() => {
        setSelectedImageURL(profilePictureDataURL);
    }, [profilePictureDataURL]);

    return (
        <div>
            <Dialog
                maxWidth='sm'
                open={Boolean(open)}
                TransitionComponent={Transition}
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    {t('titlePhoto')}

                    <IconButtonAnimate onClick={onClose}>
                        <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
                    </IconButtonAnimate>
                </DialogTitle>
                <Divider />
                <DialogContent>

                    <Avatar
                        alt="Profile Picture"
                        src={selectedImageURL}
                        sx={{ width: 300, height: 300 }}
                    />

                </DialogContent>
                <DialogActions>
                    <LoadingButton variant="contained" loading={isSubmitting}  sx={{ marginRight: '10px' }} onClick={onSubmit }>
                        <SaveIcon />   {t('buttons.change')}
                    </LoadingButton>

                    <input
                        accept="image/*"
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button">
                        <LoadingButton component="span" variant="contained">
                            <EditSharp /> {t('buttons.choosePhoto')}
                        </LoadingButton>
                    </label>
                </DialogActions>
            </Dialog>
        </div>
    );
}
ChangeProfilePicture.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.any.isRequired
};