import React from 'react';
import Accordion from '../../../common/Accordion/Accordion';
import Tabs from '../../../common/Tabs/Tabs';
import TabAdvantagePhoto from '../TabAdvantagePhoto/TabAdvantagePhoto';
import TabCommonSpecs from '../TabCommonSpecs/TabCommonSpecs';
import TabFeature from '../TabFeature/TabFeature';
import styles from './AccordionFeatures.module.scss';
const AccordionFeatures = () => {
  const photoTabs = [
    { name: 'feature', title: 'Фичи', content: <TabFeature /> },
    { name: 'commonSpec', title: 'Основные характеристики', content: <TabAdvantagePhoto /> },
  ];
  return (
    <>
      <Accordion title={'Фичи и характеристики'}>
        <Tabs list={photoTabs} />
      </Accordion>
    </>
  );
};

export default AccordionFeatures;
