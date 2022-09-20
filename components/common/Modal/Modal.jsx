import clsx from 'clsx';
import React from 'react';
import styles from './Modal.module.scss';
const Modal = ({ children, onClose, title, show, className }) => {
  return (
    <div
      class={`modal fade bd-example-modal-md ${show ? 'show' : ''}`}
      tabindex="-1"
      aria-labelledby="myLargeModalLabel"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', display: 'block', transition: 'all 0.3s ease-out', visibility: show ? 'visible' : 'hidden', opacity: show ? '1' : '0', display: 'block' }}
      aria-modal="true"
      role="dialog">
      <div className={clsx(styles.modal, className)} style={{ visibility: show ? 'visible' : 'hidden', opacity: show ? '1' : '0', display: 'block' }}>
        <div className={clsx(styles.modalBody)}>
          <div className={clsx(styles.modalHeader)}>
            <h5 className={clsx(styles.modalTitle)}>{title}</h5>
            <button onClick={onClose} className={clsx(styles.modalBtn)}>
              <i className="lnr-cross"></i>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
