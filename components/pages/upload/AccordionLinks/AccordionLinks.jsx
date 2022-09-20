import React from 'react';
import styles from './AccordionLinks.module.scss';
import CopyClipBoard from '../../../common/CopyClipBoard/CopyClipBoard';
import Accordion from '../../../common/Accordion/Accordion';
const AccordionLinks = () => {
  return (
    <>
      <Accordion title={'Ссылки'}>
        <CopyClipBoard title="Мой склад" link="https://online.moysklad.ru/app" />
        <CopyClipBoard title="Ozon" link="https://www.ozon.ru/product" />
        <CopyClipBoard title="Wildberries" link="https://www.wildberries.ru/catalog/16189536" />
        <CopyClipBoard title="Яндекс.Маркет" link="https://pokupki.market.yandex.ru/product/fitnes-braslet-beverni-smart-bracelet" />
      </Accordion>
    </>
  );
};

export default AccordionLinks;
