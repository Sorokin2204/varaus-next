import React, { useState } from 'react';
import Switch from 'react-switch';
import styles from './Switch.module.scss';
const SwitchCustom = ({ active, handleChange }) => {
  // const [active, setActive] = useState({ checked: false });
  // const handleChange = (checked) => {
  //   setActive({ checked });
  // };
  return (
    <>
      <Switch
        checked={active.checked}
        onChange={handleChange}
        // style={styles.switchCustom}
        onColor="#0D6EFD"
        onHandleColor="#0D6EFD"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="none"
        activeBoxShadow="none"
        height={10}
        width={24}
        className="react-switch"
        id="material-switch"
      />
    </>
  );
};

export default SwitchCustom;
