import React from 'react';
import styles from './AccordionInfographic.module.scss';
import Accordion from '../../../common/Accordion/Accordion';
import Tabs from '../../../common/Tabs/Tabs';
import TabAdvantagePhoto from '../TabAdvantagePhoto/TabAdvantagePhoto';
import TabPhotoInfographic from '../TabPhotoInfographic/TabPhotoInfographic';
const AccordionInfographic = () => {
  const photoTabs = [
    { name: 'extaned', title: 'Расширенные преимущества для фото', content: <TabAdvantagePhoto /> },
    { name: 'photoInfographic', title: 'Фото с инфографикой', content: <TabPhotoInfographic /> },
  ];
  return (
    <>
      {' '}
      <Accordion title={'Инфографика'}>
        <Tabs list={photoTabs} />
      </Accordion>
    </>
  );
};

export default AccordionInfographic;
