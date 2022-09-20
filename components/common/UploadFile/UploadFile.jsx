import React, { useState } from 'react';
import ImageItem from '../ImageItem/ImageItem';
import styles from './UploadFile.module.scss';
const UploadFile = ({ label, uploadFile, setUploadFile, previewUrl, setPreviewUrl }) => {
  // const [uploadFile, setUploadFile] = useState();
  // const [previewUrl, setPreviewUrl] = useState();
  const onChange = (e) => {
    var files = e.target.files;
    const url = URL.createObjectURL(files[0]);
    setUploadFile(files[0]);
    setPreviewUrl(url);
  };
  return (
    <>
      <div className={'form-label mt-2'}>{label}</div>
      {!previewUrl && !uploadFile ? (
        <div className={styles.btnBox}>
          <label for="file">
            <div class="mb-2 me-2 btn-icon btn btn-primary">
              <i class="lnr-upload btn-icon-wrapper"></i>Выберите файл
            </div>
          </label>
          <div className="form-label mt-2">{uploadFile ? uploadFile?.name : 'Файл не выбран '}</div>
          <input onChange={onChange} type="file" id="file" style={{ display: 'none' }} />
        </div>
      ) : (
        <ImageItem
          src={previewUrl}
          name={uploadFile?.name}
          onDelete={() => {
            setPreviewUrl();
            setUploadFile();
          }}
        />
      )}
    </>
  );
};

export default UploadFile;
