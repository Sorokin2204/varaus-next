import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { localize } from '../../../public/locales/localize';
import Accordion from '../Accordion/Accordion';
import DragItem from '../DragItem/DragItem';
import TextInput from '../TextInput/TextInput';
import styles from './DragGroup.module.scss';
const DragGroup = ({ providedParent, title, children, onAddNew, form, name, onDelete, isEditable, isDeletable }) => {
  const { locale } = useRouter();
  const [height, setHeight] = useState(0);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState();
  useEffect(() => {
    setNewTitle(form.getValues(name));
  }, [edit]);

  // const watchTitle = form.watch(name);
  console.log('render');
  return (
    <div className={clsx(styles.wrap)}>
      <div
        className={clsx(styles.head)}
        onClick={() => {
          setHeight(height === 0 ? 'auto' : 0);
        }}>
        <div className={clsx(styles.headDrag)} {...providedParent.dragHandleProps}>
          <img src={'/drag.svg'} />
        </div>
        {isEditable && edit ? <TextInput name={name} noSpace white form={form} /> : <div className={clsx(styles.headTitle)}>{newTitle}</div>}
        {isEditable && (
          <button class=" btn-icon btn-icon-only btn btn-link " style={{ padding: '5px' }} onClick={() => setEdit(!edit)}>
            <i class="text-primary lnr-pencil btn-icon-wrapper " style={{ fontSize: '14px' }}></i>
          </button>
        )}
        {isDeletable && (
          <button class=" btn-icon btn-icon-only btn btn-link " style={{ padding: '5px ' }} onClick={onDelete}>
            <i class="text-danger lnr-trash btn-icon-wrapper " style={{ fontSize: '14px' }}></i>
          </button>
        )}

        <img src="/chevron.svg" className={clsx(styles.headArrow, height && styles.headArrowActive)} />
      </div>
      <AnimateHeight duration={400} height={height}>
        {' '}
        <div className={clsx(styles.body)}>
          {children}
          <button class=" me-2 btn-icon btn btn-primary mt-3" style={{ display: 'flex', alignItems: 'center', height: '37px' }} onClick={() => onAddNew()}>
            {localize[locale].category.addSpec}
          </button>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DragGroup;
