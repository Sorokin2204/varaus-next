import React from 'react';
import styles from './AccordionCommon.module.scss';

import Accordion from '../../../common/Accordion/Accordion';
import TextInput from '../../../common/TextInput/TextInput';
const AccordionCommon = () => {
  return (
    <>
      <Accordion title={'Основные'}>
        <TextInput label={'Бренд'} placeholder="Введите бренд" />
        <TextInput label={'Полное название'} placeholder="Введите полное название" />
        <TextInput label={'Маркетинговое название'} placeholder="Введите маркетинговое название" />
      </Accordion>
    </>
  );
};

export default AccordionCommon;
