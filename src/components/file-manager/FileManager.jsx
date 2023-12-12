import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Grid, Input, Typography, IconButton, Chip } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useEffect, useState } from "react";
import { IconButtonAnimate } from '../animate/IconButtonAnimate';
import Iconify from '../utils/Iconify';
import { useTheme } from "@emotion/react";
import Save from "@mui/icons-material/Save";
import DropFileInput from "./DropFileInput";
import PropTypes from 'prop-types';
import Download from "@mui/icons-material/Download";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../confirm-dialog/ConfirmDialog";
import FilePresent from '@mui/icons-material/FilePresent';
import { useTranslation } from "react-i18next";

export default function FileManager({files = [], setFiles, readOnly, urls = [], setUrls, disabled, reset}){
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();
    const [preloadedFiles, setPreloadedFiles] = useState(files);
    const [savedFiles, setSavedFiles] = useState(urls);
    const [error, setError] = useState(null);
    
    const {t} = useTranslation('file-manager');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleDeleteFile = (id) => {
        setSavedFiles(savedFiles.filter(f => f.file_id !== id))
    }

    const onFileChange = (files) => {
        setPreloadedFiles([...files])
    }
    const handleDownload = (url) => {
        window.open(url, '_blank');
      };

    const handleConfirmAction = () => {
    setFiles && setFiles(preloadedFiles);
    setUrls && setUrls(savedFiles);
    setConfirmationOpen(false);
    setOpenDialog(false);
    };

    useEffect(()=>{
        //console.log('estoy en file manager');
        setPreloadedFiles(files);
        setSavedFiles(urls)
    },[reset])
    

    return (
        <>
        <Box sx={{  display: 'flex',alignItems:'center', justifyContent: 'space-between'}} >
            <Button
                color="primary"
                onClick={() => setOpenDialog(true)}
                // startIcon={readOnly ? <FileDownloadIcon /> : <UploadFileIcon/>}
                variant="outlined"
                disabled={disabled}
            >
                {readOnly ? <FileDownloadIcon /> : <UploadFileIcon/>}
            </Button>
            <Chip
                icon={<FilePresent />}
                color={savedFiles?.length || preloadedFiles?.length  ? 'primary' : 'warning'}     
                variant="outlined"
                label={savedFiles?.length || 0 + preloadedFiles?.length || 0 }
            />

            <Dialog open={openDialog} maxWidth="md" onClose={() => setOpenDialog(false)} aria-describedby="alert-dialog-slide-description">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {t('title')}
                    <IconButtonAnimate onClick={() => setOpenDialog(false)}>
                        <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
                    </IconButtonAnimate>
                </DialogTitle>
                <Divider sx={{ border: `1px solid ${theme.palette.primary.main}` }}/>
                <DialogContent>
                    {/* <Divider orientation="vertical" sx={{ border: `1px solid ${theme.palette.primary.main}` }}/> */}
                    <Grid container spacing={2} sx={{ width: '60vw'}}>
                        {!readOnly && <Grid item xs={12} md={6} >
                            <DropFileInput onFileChange={(files) => onFileChange(files)} preloadedFiles={preloadedFiles} t={t}/>
                        </Grid>}
                        <Grid item container xs={readOnly? 12 : 6} sx={{display:'flex', alignContent: 'center', justifyContent:'center'}}>
                            {savedFiles?.length ? savedFiles.map((file, index) => (
                            <Grid item md={4} key={index} padding={1}>
                                <Card elevation={3} onClick={() => setSelectedImageIndex(index)}>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={file.url}
                                    alt={file.filename}
                                />
                                <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                                <IconButton
                                sx={{ color: `${theme.palette.primary.main}` }}
                                aria-label="download"
                                onClick={() => handleDownload(file.url)}
                                >
                                    
                                  <Download /> 
                                </IconButton>
                                
                                {!readOnly && <IconButton
                                    aria-label="delete image"
                                    sx={{ color: `rgb(130, 0, 0)` }}
                                    onClick={() => handleDeleteFile(file.file_id)}
                                    >
                                    <DeleteIcon />
                                </IconButton>}
                                </CardContent>
                                </Card>
                            </Grid>
                            )):
                            <Alert sx={{maxHeight: '50px'}} severity="info" >No saved files</Alert>}
                        </Grid>
                    </Grid>
                </DialogContent>
                {!readOnly && <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmationOpen(true)}
                    >
                     <Save/>
                    </Button>
                </Box>}
                <ConfirmationDialog
                    open={confirmationOpen}
                    onClose={() => setConfirmationOpen(false)}
                    onConfirm={handleConfirmAction}
                    actionName="Guardar Archivos"
                />
            </Dialog>
        </Box>
        </>
    )
}

