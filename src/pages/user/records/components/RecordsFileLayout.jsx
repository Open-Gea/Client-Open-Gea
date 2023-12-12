import { Alert, Grid, ImageList, ImageListItem, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FileManager from "../../../../components/file-manager/FileManager";
import { ListGroup } from "react-bootstrap";

export default function RecordsFileLayout({editInfo, edit, t, setValue}){

    const [preloadedFiles, setPreloadedFiles] = useState([]);
    const [urls, setUrls] = useState(edit && editInfo.urls && editInfo.urls[0] !== "" ? editInfo.urls : []);
    
    useEffect(()=>{
        setValue('urls', urls);
        setValue('files', preloadedFiles);
    },[preloadedFiles, urls])

    return (
        <>
        <Grid item xs={12} sm={6}>
                <FileManager urls={urls} files={preloadedFiles}  setFiles={setPreloadedFiles} setUrls={setUrls}/>
                {
                preloadedFiles.length ? 
                (
                <List>
                    <ListGroup>{t('forms.preloadedFiles')}</ListGroup>
                    {preloadedFiles.map((file, index) => (
                    <ListItem key={index}>
                        <ListItemText
                        primary={file.filename || file.name}
                        secondary={
                            <Typography variant="body2">
                            {`${(file.size / 1024).toFixed(2)} KB`}
                            </Typography>
                        }
                        />
                    </ListItem>
                    ))}
                </List>
                ) : 
                <Alert severity="info" sx={{ mt: 2 }}>
                    {t('helpers.noDocs')}
                </Alert>
                }
            </Grid>
            <Grid item xs={12} sm={6}>
                {edit && urls[0] !== "" ? 
                <>
                
                <ListGroup>{t('forms.documentsLoaded')}</ListGroup>
                <ImageList >
                    {edit && urls[0] !== "" && urls.map((url, index) => (
                    <ImageListItem key={index} sx={{ width: 80, height: 40, objectFit: 'cover' }}>
                        <img src={url.url} alt={url.filename}
                        loading="lazy" />
                    <p>{url.filename}</p>
                    </ImageListItem>
                ))}
                </ImageList>
                </>
                : <></>} 

            </Grid>
        </>
    )
}