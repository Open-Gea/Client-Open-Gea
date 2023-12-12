import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import QRCode from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// Translation module
import { useTranslation } from 'react-i18next';
import { LinearProgress } from '@mui/material';

const QRDialog = ({ open, onClose, responseId }) => {
  const downloadQRAsImage = () => {
    const canvas = document.getElementById('qr-code');
    const imgUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'QR_Code.png';
    link.click();
  };

  const downloadQRAsPDF = async () => {
    const canvas = await html2canvas(document.getElementById('qr-code'));
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('QR_Code.pdf');
  };

  // Added for translations
  const { t } = useTranslation('qr-code');
  // Added to know the language
  const { i18n } = useTranslation();
  const urlQrView = `${import.meta.env.VITE_YVY_APPDOMAIN}/#/qr-view/${responseId}`
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>{t('title2')}</DialogTitle>
      <DialogContent>
        {responseId ? 

        (<Box display="flex" justifyContent="center">

          <QRCode id="qr-code" value={urlQrView} />

        </Box>)
        : <LinearProgress sx={{ my: 5 }}/>
        }
      </DialogContent>
      {responseId ? 
      (<DialogActions>
        <Button onClick={downloadQRAsImage} color="primary">
          {t('buttons.downloadImage')}
        </Button>
        <Button onClick={downloadQRAsPDF} color="primary">
          {t('buttons.downloadPdf')}
        </Button>
        <Button onClick={() => window.open(urlQrView, '_blank')} color="primary">
          {t('buttons.openView')}
        </Button>
      </DialogActions>) : <></>
      }
    </Dialog>
  );
};

export default QRDialog;