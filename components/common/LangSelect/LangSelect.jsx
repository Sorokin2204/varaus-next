import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './LangSelect.module.scss';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveLocale } from '../../../redux/slices/localeSlice';
const LangSelect = () => {
  const {
    getLocales: { data },
    activeLocale,
  } = useSelector((state) => state.locale);
  const dispatch = useDispatch();
  const [listLang, setListLang] = useState([
    { label: 'Русский', value: 'ru' },
    { label: 'English', value: 'en' },
  ]);

  const [open, setOpen] = useState(false);
  const { locale, push, asPath, route } = useRouter();

  const onChangeLang = (loc) => {
    push(route, asPath, {
      locale: loc,
    });
  };
  return (
    <>
      {' '}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          marginLeft: 'auto',
        }}
        onClick={() => {
          setOpen(!open);
        }}>
        <div class="form-labelmb-0  me-1">
          <div style={{ padding: '8px 0' }}>{activeLocale?.S_LOCALE_NAME}</div>
          <OutsideClickHandler
            onOutsideClick={() => {
              setOpen(false);
            }}>
            <div tabindex="-1" role="menu" aria-hidden="true" class={`dropdown-menu ${open ? 'show' : ''}`} style={{ minWidth: '0px', padding: '6px 4px' }}>
              {data?.map(
                (item) =>
                  item.S_LOCALE_CODE !== locale && (
                    <button type="button" tabindex="0" class="dropdown-item" style={{ maxWidth: '100px' }} onClick={() => onChangeLang(item.S_LOCALE_CODE)}>
                      {item.S_LOCALE_NAME}
                    </button>
                  ),
              )}
            </div>
          </OutsideClickHandler>
        </div>
        <i class="pe-7s-angle-down  opacity-8" style={{ fontSize: '24px' }}></i>
      </div>
    </>
  );
};

export default LangSelect;
