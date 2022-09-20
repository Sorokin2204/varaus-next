import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { localize } from '../../../public/locales/localize';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import styles from './DragItem.module.scss';
const DragItem = ({ provided, list, form, key, onDelete, onEdit, item }) => {
  const showTypeField = () => {};
  const { locale } = useRouter();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  return (
    <>
      <div className={clsx(styles.row)}>
        {/* {showTypeField({ ...props })} */}
        <div className={clsx(styles.drag)} {...provided.dragHandleProps}></div>
        {list?.map((item, i) => (
          <div style={{ width: '100%' }} key={i}>
            {item?.type == 'text' ? (
              <TextInput name={item?.name} noSpace white form={form} rules={{ required: true }} />
            ) : item?.type == 'select' ? (
              <>
                <Select onChangeCustom={forceUpdate} defaultValue={item?.value} noSpace form={form} name={item?.name} options={item?.options} />
              </>
            ) : (
              ''
            )}
          </div>
        ))}
        <button
          class="btn btn-primary"
          style={{ width: '98px', visibility: list?.[1]?.value?.value === '3705e94d-3c23-4947-9f1f-030a38b3738e' || list?.[1]?.value?.value === '12d07060-f1af-41db-ac79-2a187a8f1c92' ? 'visible' : 'hidden' }}
          onClick={() => {
            onEdit(item, list);
          }}>
          {localize[locale].category.edit}
        </button>
        <button type="button" data-clipboard-target="#clipboard-source-2" class="btn btn-danger clipboard-trigger" style={{ width: '40px' }} onClick={() => onDelete()}>
          <i class="lnr-trash"></i>
        </button>
      </div>
    </>
  );
};

export default DragItem;
