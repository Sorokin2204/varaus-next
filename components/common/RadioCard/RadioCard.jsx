import React from 'react';
import styles from './RadioCard.module.scss';
import clsx from 'clsx';
const RadioCard = ({ data, name, form, label, noSpace, className }) => {
  const watchName = form?.watch(name);
  return (
    <div>
      {label && <label class={`form-label ${!noSpace && 'mt-3'} ` + styles.label}>{label}</label>}
      <div className={className}>
        {data?.map((item) => (
          <div className={clsx(styles.card, watchName === item.value && styles.cardActive)} onClick={() => form.setValue(name, item.value)}>
            <div className={clsx(styles.head)}>
              <div className={clsx(styles.radio, watchName === item.value && styles.radioActive)}></div>
              <div className={clsx(styles.title)}>{item?.label}</div>
            </div>
            <div className={clsx(styles.desc)}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioCard;
