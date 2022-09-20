import React from 'react';
import styles from './Loading.module.scss';
const Loading = ({ fixed = false }) => {
  return (
    <div style={{ position: fixed ? 'fixed' : 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div class="loader-wrapper d-flex justify-content-center align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <div class="loader">
          <div class="ball-pulse-sync">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
