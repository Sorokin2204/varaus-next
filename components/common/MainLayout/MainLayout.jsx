import React, { useEffect } from 'react';
import ModalCategory from '../../pages/category/ModalCategory/ModalCategory';
import ModalFirma from '../../pages/firm/ModalFirma/ModalFirma';
import ModalRole from '../../pages/role/ModalRole/ModalRole';
import ModalUser from '../../pages/user/ModalUser/ModalUser';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import ModalGroup from '../../pages/group/ModalGroup/ModalGroup';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import ModalSection from '../../pages/section/ModalSection/ModalSection';
import { getLocales } from '../../../redux/actions/locale/getLocales';
import { setActiveLocale } from '../../../redux/slices/localeSlice';
import axios from 'axios';
import ModalSubfield from '../../pages/category/ModalSubfield/ModalSubfield';
const MainLayout = ({ children }) => {
  const { modalCategory, modalUser, modalFirm, modalRole, modalGroup, modalSection, modalCategorySubfield, modalCategoryData } = useSelector((state) => state.app);
  const {
    getLocales: { data: locales },
    activeLocale,
  } = useSelector((state) => state.locale);
  const { push, locale } = useRouter();
  const { status } = useSession();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // axios.interceptors.request.use((config) => {
  //   //   config.headers['locale'] = locale;
  //   //   return config;
  //   // });
  //   console.log('lOCALE CHANGE');
  //   const eventHandlerFn = (config) => {
  //     config.headers['locale'] = locale;
  //     return config;
  //   };

  //   axios.interceptors.request.use(eventHandlerFn);
  //   return () => {
  //     axios.interceptors.request.eject(eventHandlerFn);
  //   };
  // }, [locale]);

  useEffect(() => {
    dispatch(getLocales());
    if (status === 'unauthenticated') {
      push('/login');
    }
  }, [status]);
  useEffect(() => {
    if (locale && locales) {
      const findLocale = locales?.find((item) => item.S_LOCALE_CODE === locale);
      if (findLocale) {
        dispatch(setActiveLocale(findLocale));
      }
    }
  }, [locale, locales]);

  return status === 'authenticated' && activeLocale && locales ? (
    <>
      <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header />

        <div class="app-main">
          <Menu />
          <div class="app-main__outer">
            <div class="app-main__inner" style={{ position: 'relative' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div class="app-drawer-wrapper">
        <div class="drawer-nav-btn">
          <button type="button" class="hamburger hamburger--elastic is-active">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="app-drawer-overlay d-none animated fadeIn"></div>

      {modalCategory && <ModalCategory />}
      {modalUser && <ModalUser />}
      {modalFirm && <ModalFirma />}
      {modalRole && <ModalRole />}
      {modalGroup && <ModalGroup />}
      {modalSection && <ModalSection />}

      {modalCategorySubfield && modalCategoryData && <ModalSubfield />}
    </>
  ) : (
    <Loading />
  );
};

export default MainLayout;
