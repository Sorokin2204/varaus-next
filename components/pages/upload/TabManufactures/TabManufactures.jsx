import React from 'react';
import CopyClipBoard from '../../../common/CopyClipBoard/CopyClipBoard';
import TextInput from '../../../common/TextInput/TextInput';
import styles from './TabManufactures.module.scss';
const TabManufactures = () => {
  return (
    <>
      <CopyClipBoard title={'Ссылка на сайт производителя'} />
      <TextInput label={'Название в каталоге производителя'} />
    </>
  );
};

export default TabManufactures;
