import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
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
  IconButton,
  Button,
} from '@mui/material';
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@emotion/react';
// components
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../../../../../components/utils/Iconify';
import DeleteIcon from '@mui/icons-material/Delete';

import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DocumentUpload({ preloadedFiles, setPreloadedFiles }) {
  
  const {t} = useTranslation('records');
  
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteImage = index => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    const reader = new FileReader();
    reader.onload = e => {
        const newFileUrl = e.target.result;
        const newFile = {
          image:{
            url: newFileUrl,
            filename: file.name,
            type: fileType,
            size: file.size
          },
         file: file
        };
          setImages([...images, newFile]);
        };
        
    reader.readAsDataURL(file);
  };

  const onSubmit = () => {
    const newPreloadedFiles = [];
    images.forEach(i => newPreloadedFiles.push(i.file))
    setPreloadedFiles(newPreloadedFiles);
    setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="contained" color="info" onClick={() => setOpenDialog(true)}>
        {preloadedFiles?.length && preloadedFiles[0] !== "" ? t('buttons.editDocs'): t('buttons.addDocs') }
      </Button>
      <Dialog
        maxWidth="md"
        open={Boolean(openDialog)}
        TransitionComponent={Transition}
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {t('titles.addDocs')}

          <IconButtonAnimate onClick={() => setOpenDialog(false)}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <ImageList sx={{ width: 350, height: 300, objectFit: 'cover' }}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <ImageListItemBar
                  title={image.image.filename}
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
                  <img src={image.image.url} srcSet={image.image.url} alt={image.image.filename}
                  loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <input accept="image" multiple type="file" id="upload-button" style={{ display: 'none' }} onChange={handleFileChange} />
          <label htmlFor="upload-button">
            <LoadingButton component="span" color="info" variant="contained">
              <AddAPhotoSharpIcon /> {t('buttons.add')}
            </LoadingButton>
          </label>
          <LoadingButton variant="contained" onClick={() => onSubmit()}>
            <SaveIcon /> {t('buttons.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DocumentUpload.propTypes = {
  files: PropTypes.array,
  setPreloadedFiles: PropTypes.func,
  preloadedFiles: PropTypes.array,
  setFiles: PropTypes.func,
};