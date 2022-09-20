import React from 'react';
import styles from './WrapTextInputIcon.module.scss';
const WrapTextInputIcon = ({ children, classIcon }) => {
  return (
    <div class="input-group">
      {children}
      <div class="input-group-text bg-white">
        <span class="">
          <i class={classIcon}></i>
        </span>
      </div>
    </div>
  );
};

export default WrapTextInputIcon;
