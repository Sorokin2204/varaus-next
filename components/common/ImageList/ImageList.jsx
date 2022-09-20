import React from 'react';
import ImageItem from '../ImageItem/ImageItem';
import styles from './ImageList.module.scss';
const ImageList = ({ title, children }) => {
  return (
    <div className={styles.wrap}>
      <div class="form-label">{title}</div>
      <div className={styles.grid}>{children}</div>
    </div>
  );
};

export default ImageList;
