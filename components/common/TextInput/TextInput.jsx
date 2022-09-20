import React, { useEffect, useState } from 'react';
import WrapTextInputIcon from '../WrapTextInputIcon/WrapTextInputIcon';
import styles from './TextInput.module.scss';
const TextInput = ({ label, placeholder, name, noSpace, form, rules = {}, setValue, search, rightIcon, white, type = 'text' }) => {
  const [text, setText] = useState();

  useEffect(() => {
    if (search) {
      const delayDebounceFn = setTimeout(() => {
        setValue?.(text);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setValue?.(text);
    }
  }, [text]);

  return (
    <>
      {rightIcon ? (
        <WrapTextInputIcon classIcon={rightIcon}>
          <input autoComplete="off" name={name} placeholder={placeholder} type="text" class="form-control" onChange={(e) => setText(e.target.value)} {...(typeof form == 'undefined' || form.register(name, rules))} />
        </WrapTextInputIcon>
      ) : (
        <div class={`position-relative `}>
          {label && <label class={`form-label ${!noSpace && 'mt-3'} ` + styles.label}>{label}</label>}

          <input autoComplete="off" name={name} placeholder={placeholder} type={type} class={'form-control ' + styles.input + ` ${white ? styles.inputWhite : ' '}`} onChange={(e) => setText(e.target.value)} {...(typeof form == 'undefined' || form.register(name, rules))} />
        </div>
      )}
    </>
  );
};

export default TextInput;
