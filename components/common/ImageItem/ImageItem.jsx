import React from 'react';
import styles from './ImageItem.module.scss';
const ImageItem = ({ src, name, caption, onDelete }) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.nameTop}>{caption}</div>
        <div class={styles.imgCard} style={{ backgroundImage: `url(${src})` }}>
          <button class={styles.close + ' bg-danger'} onClick={onDelete}>
            <i class="lnr-cross btn-icon-wrapper text-white"></i>
          </button>
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </>
  );
};

export default ImageItem;
