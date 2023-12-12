import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';

import { forwardRef, useState, useEffect } from 'react';
// MUI
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Slide,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListSubheader,
    IconButton
} from '@mui/material';

import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../components/utils/Iconify';

import SaveIcon from '@mui/icons-material/Save';

import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';

import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';

// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

// Translation module
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MultipleMediaUploader({ onClose, open }) {
    const theme = useTheme();
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector(s => s.authSlice);

    // Added for translations
    const { t } = useTranslation('user-profile');

    const UpdateProfileSchema = Yup.object().shape({
        profilePicture: Yup.string()
            .required(t('validations.introduceName'))
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
            const formData = new FormData();

            images.forEach((item, index) => {
                const blob = dataURLtoBlob(item.media);
                const fileType = item.type === 'image' ? 'image/png' : 'video/mp4';
                const fileName = `${item.title}-${index}.${fileType.split('/')[1]}`;
                formData.append('media', blob, fileName);
            });

            const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/media/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImages([]);
            onClose()

        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

    };

    const handleFileChange = (event) => {
        console.log(images);

        const file = event.target.files[0];

        if (!file) return;

        const fileType = file.type.split('/')[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const newMediaUrl = e.target.result;
            const newMedia = {
                media: newMediaUrl,
                title: 'Selected Media',
                type: fileType
            };
            setImages((prevImages) => [...prevImages, newMedia]);
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {

        if (open) {
            const fetchImages = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/media/${user.id}`);

                    for (let index = 0; index < response.data.length; index++) {

                        const uint8Array = new Uint8Array(response.data[index].file_data.data);
                        const fileType = response.data[index].type.split('/')[0];
                        const base64Flag = fileType === 'image' ? 'data:image/png;base64,' : 'data:video/mp4;base64,';
                        const mediaStr = arrayBufferToBase64(uint8Array.buffer);

                        const newMedia = {
                            media: base64Flag + mediaStr,

                            type: response.data[index].type
                        };
                        setImages((prevImages) => [...prevImages, newMedia]);
                    }
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            };

            fetchImages();
        }
        return () => {
            setImages([]);
        };

    }, [open]);


    function dataURLtoBlob(dataURL) {
        const binaryString = atob(dataURL.split(',')[1]);
        const mimeType = dataURL.split(',')[0].match(/:(.*?);/)[1];
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return new Blob([uint8Array], { type: mimeType });
    }

    const arrayBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };


    return (
        <div>
            <Dialog
                maxWidth='md'
                open={Boolean(open)}
                TransitionComponent={Transition}
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    {t('tittleGalery')}

                    <IconButtonAnimate onClick={onClose}>
                        <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
                    </IconButtonAnimate>
                </DialogTitle>
                <Divider />
                <DialogContent>

                    <ImageList sx={{ width: 500, height: 450 }}>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">{t('subtitlePhotos')}</ListSubheader>
                        </ImageListItem>
                        {images.map((item, index) => (
                            <ImageListItem key={index}>
                                {item.type === 'image' ? (
                                    <img
                                        src={item.media}
                                        srcSet={item.media}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <video
                                        src={item.media}
                                        width="100%"
                                        height="100%"
                                        controls
                                    />
                                )}
                                <ImageListItemBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label="delete image"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>



                </DialogContent>
                <DialogActions>
                    <LoadingButton variant="contained" loading={isSubmitting} onClick={onSubmit} sx={{ marginRight: '10px' }}>
                        <SaveIcon /> {t('buttons.save')}
                    </LoadingButton>


                    <input
                        accept="image/*,video/*"
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button">
                        <LoadingButton component="span" variant="contained">
                            <AddAPhotoSharpIcon />  {t('buttons.add')}
                        </LoadingButton>
                    </label>
                </DialogActions>
            </Dialog>
        </div>
    );
}
MultipleMediaUploader.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.any.isRequired
};