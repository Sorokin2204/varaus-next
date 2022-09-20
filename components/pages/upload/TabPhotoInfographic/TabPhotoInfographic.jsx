import React from 'react';
import Textarea from '../../../common/Textarea/Textarea';
import styles from './TabPhotoInfographic.module.scss';
const TabPhotoInfographic = () => {
  return (
    <>
      <Textarea label={'Описание для маркетплейсов'} />
      <Textarea label={'Описание для сайта Эвилент'} />
      <Textarea label={'Описание для сайта Beverni'} />
      <Textarea label={'Описание для маркетплейсов ИЗ ИНТЕРНЕТА'} />
    </>
  );
};

export default TabPhotoInfographic;
