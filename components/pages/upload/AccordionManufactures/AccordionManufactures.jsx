import React from 'react';
import Accordion from '../../../common/Accordion/Accordion';
import Tabs from '../../../common/Tabs/Tabs';
import TabManufactures from '../TabManufactures/TabManufactures';
import TabSuppliers from '../TabSuppliers/TabSuppliers';

import styles from './AccordionManufactures.module.scss';
const AccordionManufactures = () => {
  const photoTabs = [
    { name: 'suppliers', title: 'Поставщики', content: <TabSuppliers /> },
    { name: 'manufacter', title: 'Производитель', content: <TabManufactures /> },
  ];
  return (
    <>
      <Accordion title="Поставщики и производители">
        <Tabs list={photoTabs} />
      </Accordion>
    </>
  );
};

export default AccordionManufactures;
