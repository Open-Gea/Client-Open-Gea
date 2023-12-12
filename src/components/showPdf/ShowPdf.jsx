import { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './showPdf.css';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

export default function ShowPdf({ pdfUrl = '', scale = 1.0 }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="ShowPDF">
      <div className="ShowPDF__container">
        <div className="ShowPDF__container__document">
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (_el, index) => (
              <Page scale={scale} key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

ShowPdf.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  scale: PropTypes.number,
};
