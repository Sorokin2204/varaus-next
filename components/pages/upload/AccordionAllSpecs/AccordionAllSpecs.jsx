import React from 'react';
import Masonry from 'react-masonry-css';
import Accordion from '../../../common/Accordion/Accordion';
import CardSpec from '../../../common/CardSpec/CardSpec';
import styles from './AccordionAllSpecs.module.scss';
const AccordionAllSpecs = () => {
  const specDisplay = [
    {
      label: 'Разрешение',
      name: 'resulution',
      type: 'select',
      placeholder: 'Выберите',
      options: [{ value: '1111', label: 'Первый' }],
      noSpace: true,
    },
    {
      label: 'Диагональ, дюймы',
      name: 'diagonal',
      type: 'text',
      placeholder: 'Выберите',
    },
    {
      label: 'Разрешение',
      name: 'resulution',
      type: 'select',
      placeholder: 'Выберите',
      options: [{ value: '1111', label: 'Первый' }],
    },
  ];
  const commonDisplay = [
    {
      label: 'Разрешение',
      name: 'resulution',
      type: 'select',
      placeholder: 'Выберите',
      options: [{ value: '1111', label: 'Первый' }],
      noSpace: true,
    },
    {
      label: 'Диагональ, дюймы',
      name: 'diagonal',
      type: 'text',
      placeholder: 'Выберите',
    },
    {
      label: 'Разрешение',
      name: 'resulution',
      type: 'select',
      placeholder: 'Выберите',
      options: [{ value: '1111', label: 'Первый' }],
    },
    {
      label: 'Основные фичи',
      name: 'common-fetch',
      type: 'select',
      isMulti: true,
      creatable: true,
      options: [{ value: '1111', label: 'Первый' }],
    },
    {
      label: 'Главные фичи',
      name: 'common-fetcаh',
      type: 'select',
      isMulti: true,
      creatable: true,
      options: [{ value: '11111', label: '2222' }],
    },
  ];

  return (
    <>
      <Accordion title="Все характеристики" link>
        <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          <CardSpec title={'Экран'} inputs={specDisplay} />
          <CardSpec title={'Основные'} inputs={commonDisplay} /> <CardSpec title={'Экран'} inputs={specDisplay} />
          <CardSpec title={'Основные'} inputs={commonDisplay} />
        </Masonry>
      </Accordion>
    </>
  );
};

export default AccordionAllSpecs;
