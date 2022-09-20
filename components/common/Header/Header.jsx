import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { localize } from '../../../public/locales/localize';
import LangSelect from '../LangSelect/LangSelect';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import FirmSelect from '../FirmSelect/FirmSelect';
import axios from 'axios';
import Loading from '../Loading/Loading';
const Header = () => {
  const [oneSelect, setOneSelect] = useState(false);
  const [avatarSelect, setAvatarSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { locale } = useRouter();
  const { data: session } = useSession();
  return (
    <div class="app-header header-shadow" style={{ zIndex: '10' }}>
      <div class="app-header__logo">
        <div class="logo-src" style={{ background: `url(/img/logo-inverse.png)` }}></div>
        <div class="header__pane ms-auto">
          <div>
            <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto auto',
          alignItems: 'center',
          marginLeft: 'auto',
          gridGap: '8px',
          justifyContent: 'end',
        }}>
        <LangSelect />
        <FirmSelect />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',

            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => {
            setAvatarSelect(!avatarSelect);
          }}>
          <img width="42" class="avatar-icon  me-2 " src="/img/1.jpg" alt="" />
          <div class="form-labelmb-0  me-1">{`${session?.user?.name} ${session?.user?.lastName}`}</div>
          <i class="pe-7s-angle-down  opacity-8" style={{ fontSize: '24px' }}></i>{' '}
          <OutsideClickHandler
            onOutsideClick={() => {
              setAvatarSelect(false);
            }}>
            <div tabindex="-1" role="menu" aria-hidden="true" class={`dropdown-menu ${avatarSelect ? 'show' : ''}`} style={{ top: '100%', left: '0' }}>
              <h6 tabindex="-1" class="dropdown-header">
                Header
              </h6>
              <button type="button" tabindex="0" class="dropdown-item active">
                Menus
              </button>
              <button type="button" tabindex="0" class="dropdown-item">
                Settings
              </button>
              <button type="button" tabindex="0" class="dropdown-item">
                Actions
              </button>
              <div tabindex="-1" class="dropdown-divider"></div>
              <button type="button" tabindex="0" class="dropdown-item">
                Dividers
              </button>
            </div>
          </OutsideClickHandler>{' '}
        </div>
        <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0  btn btn-link">
          <span class="icon-wrapper icon-wrapper-alt rounded-circle" style={{ width: '44px', height: '44px' }}>
            <span class="icon-wrapper-bg bg-primary"></span>
            <i class="icon text-primary lnr-question-circle" style={{ fontSize: '20px' }}></i>
            <span class="badge badge-dot badge-dot-sm bg-primary">Notifications</span>
          </span>
        </button>
        <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0  btn btn-link me-1">
          <span class="icon-wrapper icon-wrapper-alt rounded-circle" style={{ width: '44px', height: '44px' }}>
            <span class="icon-wrapper-bg bg-danger"></span>
            <i class="icon text-danger pe-7s-bell" style={{ fontSize: '21px' }}></i>
          </span>

          <span
            class="badge badge-dot badge-dot-md bg-danger"
            style={{
              top: '1px',
              right: '1px',
            }}>
            Notifications
          </span>
        </button>{' '}
        <button
          type="button"
          className=" me-4 btn btn-danger"
          onClick={async () => {
            try {
              setLoading(true);
              await axios.post(`${window.location.origin + '/api'}/exit-session`, { sessionId: session.user.sessionId });
            } catch (error) {
            } finally {
              setLoading(false);
              signOut();
            }
          }}>
          Выйти
        </button>
        {loading && <Loading fixed />}
      </div>
    </div>
  );
};

export default Header;
