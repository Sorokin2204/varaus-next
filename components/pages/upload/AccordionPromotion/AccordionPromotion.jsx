import React from 'react';
import Accordion from '../../../common/Accordion/Accordion';
import CopyClipBoard from '../../../common/CopyClipBoard/CopyClipBoard';
import Textarea from '../../../common/Textarea/Textarea';
import TextInput from '../../../common/TextInput/TextInput';
import styles from './AccordionPromotion.module.scss';
const AccordionPromotion = () => {
  return (
    <>
      <Accordion title={'Продвижение'}>
        <TextInput label={'SEO название'} white />
        <Textarea rows={7} label={'Ключевые слова для описания'} />
        <CopyClipBoard title="Таблица со списком ключевых запросов для рекламы" />
      </Accordion>
    </>
  );
};

export default AccordionPromotion;
