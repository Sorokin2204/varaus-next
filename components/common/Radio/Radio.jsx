import React from 'react';
import styles from './Radio.module.scss';
import clsx from 'clsx';
const Radio = ({ data, name, form, label, noSpace, className }) => {
  const watchName = form?.watch(name);
  return (
    <div>
      {label && <label class={`form-label ${!noSpace && 'mt-3'} ` + styles.label}>{label}</label>}
      <div className={clsx(styles.headList, className)}>
        {data?.map((item) => (
          <div className={clsx(styles.head)} onClick={() => form.setValue(name, item.value)}>
            <div className={clsx(styles.radio, watchName === item.value && styles.radioActive)}></div>
            <div className={clsx(styles.title)}>{item?.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
