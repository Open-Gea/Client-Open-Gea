import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import Download from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';

import { LoadingButton } from '@mui/lab';

import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DocumentDialog({ openDialog, setOpenDialog, urls, recordInfo }) {
  const { id } = recordInfo;
  
  const {t} = useTranslation('records')

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);


  const handleDownload = (url) => {
    window.open(url, '_blank');
  };


  return (
    <>
      {
        urls && urls.length ? 
        <>
            <Chip label={t('recordsCommon.check')} onClick={() => setOpenDialog(id)} />
            <Dialog
                open={Boolean(openDialog === id)}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialog('')}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t('titles.loadedDocs')}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {urls.map((file, index) => (
                        <Grid item xs={12} key={index}>
                            <Card elevation={3} onClick={() => setSelectedImageIndex(index)}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={file.url}
                                alt={file.filename}
                            />
                            <CardContent>
                            <LoadingButton variant="contained" onClick={() => handleDownload(file.url)}>
                              <Download /> 
                            </LoadingButton>
                            </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
      :
      <p>--</p>
      }
    </>
  );
}

DocumentDialog.propTypes = {
  openDialog: PropTypes.string,
  setOpenDialog: PropTypes.func.isRequired,
  urls: PropTypes.arrayOf(PropTypes.string),
  recordInfo: PropTypes.object.isRequired,
};

export default DocumentDialog;
