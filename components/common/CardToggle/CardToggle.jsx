import React, { useState } from 'react';
import SwitchCustom from '../Switch/Switch';
// import Switch from 'react-switch';
import styles from './CardToggle.module.scss';

const CardToggle = ({ title, img }) => {
  const [active, setActive] = useState({ checked: false });
  const handleChange = (checked) => {
    setActive({ checked });
  };
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <img src={img} alt="" className={styles.img} />
        <div className={styles.title}> {title}</div>
        <div className={styles.toggle}>
          <SwitchCustom active={active} handleChange={handleChange} />
          {/* <Switch onChange={handleChange} checked={active.checked} className="react-switch-custom" /> */}
        </div>
      </div>
      {active.checked ? (
        <div className={styles.success}>
          {' '}
          <img src={'/success-icon.svg'} /> Успешно
        </div>
      ) : (
        <div className={styles.error}>
          {' '}
          <img src={'/error-icon.svg'} />
          Ошибка
        </div>
      )}
      {/* <div className={styles.info}>
        <img src={'/info-icon.svg'} /> Не выполнено
      </div> */}
    </div>

    // <div class="main-card mb-3 card">
    //   <div class="card-header font-size-sm text-capitalize fw-normal">
    //     <div class="avatar-icon-wrapper avatar-icon-sm">
    //       <div class="avatar-icon  rounded">
    //         <img src={img} alt="" />
    //       </div>
    //     </div>

    //     <div class="btn-actions-pane-right actions-icon-btn">
    //       <div class={`toggle btn btn-primary ${active ? '' : 'off'}`} data-toggle="toggle" role="button" style={{ border: '#fff' }}>
    //         <input id="chkToggle1" type="checkbox" data-toggle="toggle" checked="" />
    //         <div class="toggle-group" onClick={() => setActive(!active}>
    //           <label for="chkToggle1" class="btn btn-primary toggle-on">
    //             On
    //           </label>
    //           <label for="chkToggle1" class="btn btn-light toggle-off">
    //             Off
    //           </label>
    //           <span class="toggle-handle btn btn-light"></span>
    //         </div>
    //       </div>
    //       {/* <div class={`toggle btn btn-primary ${active ? '' : 'off'}`} data-toggle="toggle" role="button">
    //         <input id="chkToggle1" type="checkbox" data-toggle="toggle" checked="" />
    //         <div class="toggle-group" onClick={() => setActive(!active}>
    //           <label for="chkToggle1" class="btn btn-primary toggle-on">
    //             On
    //           </label>
    //           <label for="chkToggle1" class="btn btn-light toggle-off">
    //             Off
    //           </label>
    //           <span class="toggle-handle btn btn-light"></span>
    //         </div>
    //       </div> */}
    //     </div>
    //   </div>
    //   <div class="card-body">
    //     <div class={`alert ${active ? 'alert-danger' : 'alert-success'} fade show`} role="alert" style={{ marginBottom: 0 }}>
    //       {active ? 'Ошибка' : 'Успешно'}
    //     </div>
    //   </div>
    // </div>
  );
};

export default CardToggle;
