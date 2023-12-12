/* eslint-disable react/prop-types */
/* eslint-disable new-cap */
import { useEffect } from 'react';
import { jsPDF } from 'jspdf';

export const PDFGenerator = ({ children, download, setDownload, fileName, title }) => {
  useEffect(() => {
    if (download) setup();
    setDownload(false);
  }, [download]);

  const setup = () => {
    const doc = new jsPDF('p', 'pt', 'A4');
    const el = document.getElementById('content');

    if (typeof el === 'object' && el !== null) {
      doc.setFontSize(10);
      doc.text(`${title}`, 40, 40);
      const opt = {
        callback: function (jsPdf) {
          jsPdf.save(`${fileName}.pdf`);
        },
        margin: [72, 72, 72, 72],
        autoPaging: 'text',
        html2canvas: {
          allowTaint: true,
          dpi: 300,
          letterRendering: true,
          logging: false,
          scale: 0.5,
        },
      };

      doc.html(el, opt);
    }
  };

  return <div id="content">{children}</div>;
};