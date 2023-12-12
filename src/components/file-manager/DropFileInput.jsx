import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from './utils/imageConfig'; 
import uploadImg from '../../assets/file-manager/cloud-upload-regular-240.png';
import { Alert, CircularProgress } from '@mui/material';
import { processFile } from './utils/processFile';

const DropFileInput = ({onFileChange, preloadedFiles = [], t}) => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([...preloadedFiles]);
    const [error, setError] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);


    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = async (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setLoadingFile(true);
            const {error} = await processFile(newFile);
            setLoadingFile(false);
            if (error) {
                setError(error);
            } else {
                setError(null);
                const updatedList = [...fileList, newFile];
                setFileList(updatedList);
                onFileChange(updatedList);
            }
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>{t('dropDrag')}</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                error ? (
                    <Alert severity='error'>{error}</Alert>
                ) : null
            }
            {loadingFile && 
            // <p>{t('uploading')}</p>
            <CircularProgress variant={"indeterminate"} size={'2rem'} />
            }
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            {t('readyToUpload')}
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
    preloadedFiles: PropTypes.array
}

export default DropFileInput;