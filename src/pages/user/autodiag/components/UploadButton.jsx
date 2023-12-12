import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React,{ useState,useRef  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Input } from '@mui/material';
// Translation module
import { useTranslation } from 'react-i18next';



export default function UploadButton({ sx }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  // Added for translations
  const { t } = useTranslation('self-diagnosis');

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    
    if (!file) {
      console.log(t('actionMessages.notSelectedImage'));
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await axios.post('/api/upload', formData);
      console.log(t('actionMessages.successImage'));
      // Realiza cualquier acción adicional con la respuesta del backend aquí
    } catch (error) {
      console.error(t('actionMessages.errorImage'), error);
      console.log(formData)
    }
  };
  
  const handleClick2 = () => {
    fileInputRef.current.click();
  };


  function handleClick() {
    setLoading(!loading);
  }


  return (
    <>
      <Box sx={{ '& > button': { mt: 1 } }}>

      <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileUpload} />



        <LoadingButton
          color="primary"
          onClick={handleClick2}
          loading={loading}
          loadingPosition="start"
          startIcon={<UploadFileIcon />}
          variant="outlined"
          sx={{ m: 0, ...sx }}
        >
          {t('buttons.certificate')}
        </LoadingButton>
      </Box>
    </>
  );
}
UploadButton.propTypes = {
  sx: PropTypes.object,
};
