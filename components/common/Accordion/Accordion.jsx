import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import styles from './Accordion.module.scss';
const Accordion = ({ title, children, link, drag }) => {
  const [height, setHeight] = useState(0);
  return (
    <div class="card" style={{ boxShadow: 'none' }}>
      <div class="b-radius-0 card-header">
        <button
          type="button"
          aria-expanded={height !== 0}
          class="text-start m-0 p-0 btn btn-link btn-block"
          onClick={() => {
            setHeight(height === 0 ? 'auto' : 0);
          }}>
          <h5 class="m-0 p-0">{title}</h5>
        </button>
        {link && (
          <a className={styles.link} href="#">
            Редактировать
          </a>
        )}
      </div>
      <AnimateHeight
        duration={400}
        height={height} // see props documentation below
      >
        <div class="card-body">{children}</div>
      </AnimateHeight>
    </div>
  );
};

export default Accordion;
