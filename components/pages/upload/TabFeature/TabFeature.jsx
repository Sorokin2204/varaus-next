import React from 'react';
import Select from '../../../common/Select/Select';
import styles from './TabFeature.module.scss';
const TabFeature = () => {
  return (
    <>
      <Select isMulti label="Основные фичи" creatable />
      <Select isMulti label="Дополнительные фичи" creatable />
    </>
  );
};

export default TabFeature;
