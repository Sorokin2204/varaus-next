import React, { useEffect, useState } from 'react';
import Modal from '../../../common/Modal/Modal';
import styles from './ModalUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModalUser } from '../../../../redux/slices/appSlice';
import TextInput from '../../../common/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import { createUser } from '../../../../redux/actions/user/createUser';
import Loading from '../../../common/Loading/Loading';
import { getUsers } from '../../../../redux/actions/user/getUsers';
import { updateUser } from '../../../../redux/actions/user/updateUser';
import { resetUser, setEditUser } from '../../../../redux/slices/userSlice';
import Select from '../../../common/Select/Select';
import clsx from 'clsx';
import RadioCard from '../../../common/RadioCard/RadioCard';
import { getUser } from '../../../../redux/actions/user/getUser';
import Radio from '../../../common/Radio/Radio';
import { getFirms } from '../../../../redux/actions/firm/getFirms';
import { getRoles } from '../../../../redux/actions/role/getRoles';
import generator from 'generate-password';
import { deleteUser } from '../../../../redux/actions/user/deleteUser';
import { useSession } from 'next-auth/react';
const ModalUser = () => {
  const { data: session } = useSession();
  const defaultValues = {
    login: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    locale: '',
    active: true,
    firms: '',
  };
  const dispatch = useDispatch();
  const { modalUser } = useSelector((state) => state.app);
  const {
    getRoles: { data: roles, loading: rolesLoading },
  } = useSelector((state) => state.role);
  const {
    getFirms: { data: firms, loading: firmsLoading },
  } = useSelector((state) => state.firm);
  const {
    createUser: { data: createData, loading: createLoading },
    getUser: { data: getUserData, loading: getUserLoading },
    updateUser: { data: updateData, loading: updateLoading },
    deleteUser: { data: deleteData, loading: deleteLoading },
    editUser,
  } = useSelector((state) => state.user);

  const userForm = useForm({ defaultValues });
  const [viewRoles, setViewRoles] = useState();
  const [viewFirms, setViewFirms] = useState();

  const {
    getLocales: { data: locales },
    activeLocale,
  } = useSelector((state) => state.locale);
  const [viewLocale, setViewLocale] = useState(locales.map((locale) => ({ value: locale.U_LOCALE_ID, label: locale.S_LOCALE_NAME })));
  const [viewActive, setViewActive] = useState([
    { label: 'Активен', value: true },
    { label: 'Заблокирован', value: false },
  ]);
  const watchLocale = userForm.watch('locale');
  const watchFirms = userForm.watch('firms');

  const onSubmit = (data) => {
    console.log(data);
    if (data.role && data.firms && data.firms?.length !== 0) {
      if (editUser) {
        dispatch(updateUser({ ...data, locale: data.locale.value, id: editUser.U_USER_ID, firms: data?.firms ? data?.firms?.map((firm) => firm.value) : [] }));
      } else {
        dispatch(createUser({ ...data, locale: data.locale.value, domain: session.user.domain, firms: data?.firms ? data?.firms?.map((firm) => firm.value) : [] }));
      }
    }
  };
  useEffect(() => {
    if ((updateData && !updateLoading) || (deleteData && !deleteLoading)) {
      dispatch(setShowModalUser(false));
      dispatch(getUsers());
      dispatch(setEditUser(null));
      dispatch(resetUser());
      userForm.reset();
    }
  }, [updateData, updateLoading, deleteData, deleteLoading]);

  useEffect(() => {
    if (createData && !createLoading) {
      dispatch(setShowModalUser(false));
      dispatch(getUsers());
      dispatch(resetUser());
      userForm.reset();
    }
  }, [createData, createLoading]);
  console.log(userForm.formState.errors);
  useEffect(() => {
    if (getUserData && editUser) {
      userForm.setValue('login', getUserData?.S_LOGIN);
      userForm.setValue('name', getUserData?.S_FIRSTNAME);
      userForm.setValue('surname', getUserData?.S_LASTNAME);
      userForm.setValue('email', getUserData?.S_EMAIL);
      userForm.setValue('active', getUserData?.C_ACTIVE);
      userForm.setValue('password', '');
      userForm.setValue(
        'locale',
        viewLocale?.find((viewLocale) => viewLocale.value === getUserData?.U_DEFAULT_LOCALE_ID),
      );
      userForm.setValue('role', viewRoles?.find((viewRole) => viewRole.value === getUserData?.U_ROLE_ID)?.value);
      // userForm.setValue(
      //   'firms',
      //   viewFirms?.filter((viewFirm) => getUserData?.firms?.find((firm) => firm === viewFirm.value)),
      // );
    } else {
      userForm.reset();
    }
  }, [getUserData]);

  useEffect(() => {
    if (viewRoles) {
      if (getUserData && editUser) {
        userForm.setValue('role', viewRoles?.find((viewRole) => viewRole.value === getUserData?.U_ROLE_ID)?.value);
      } else {
        userForm.setValue('role', viewRoles?.find((viewRole) => viewRole.label === 'Пользователь')?.value);
      }
    }
  }, [getUserData, editUser, viewRoles]);

  useEffect(() => {
    if (editUser?.U_USER_ID) {
      dispatch(getUser(editUser?.U_USER_ID));
    } else {
      userForm.reset();
    }
  }, [editUser]);

  useEffect(() => {
    dispatch(getFirms());
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    if (roles) {
      setViewRoles([
        ...roles.map((role) => ({
          value: role.U_ROLE__ID,
          label: role?.LOCALE_NAME,
          desc: role?.LOCALE_DESC,
        })),
      ]);
    }
  }, [roles]);
  useEffect(() => {
    if (editUser && viewFirms?.length !== 0) {
      userForm.setValue(
        'firms',
        viewFirms?.filter((viewFirm) => getUserData?.firms?.find((firm) => firm === viewFirm.value)),
      );
    }
  }, [viewFirms, getUserData]);

  useEffect(() => {
    if (firms) {
      setViewFirms([
        ...firms.map((role) => ({
          value: role.U_ID,
          label: role?.S_NAME,
        })),
      ]);
    }
  }, [firms, modalUser]);
  const onGeneratePassword = () => {
    var password = generator.generate({
      length: 12,
      numbers: true,
    });
    userForm.setValue('password', password);
  };
  const onDeleteUser = () => {
    dispatch(deleteUser({ deleteId: editUser?.U_USER_ID }));
  };
  useEffect(() => {
    userForm.register('role', { required: true });
    userForm.register('locale', { required: true });
    userForm.register('firms', { required: false });
  }, []);
  return (
    <Modal title={!editUser ? 'Добавить пользователя' : `Редактировать пользователя`} onClose={() => dispatch(setShowModalUser(false))} show={modalUser} className={styles.modal}>
      <div style={{ minHeight: '380px' }}>
        {((getUserData && !getUserLoading) || !editUser) && !rolesLoading && !firmsLoading ? (
          <>
            <div className={clsx(styles.modalBody)}>
              {editUser && (
                <div style={{ gridColumn: '1/3' }}>
                  <Radio data={viewActive} name="active" form={userForm} label="Статус" noSpace />
                </div>
              )}

              <TextInput name="name" form={userForm} label="Имя" rules={{ required: true }} noSpace />
              <TextInput name="surname" form={userForm} label="Фамилия" rules={{ required: true }} noSpace />
              <TextInput name="login" form={userForm} label="Логин" noSpace rules={{ required: true }} />
              <TextInput name="password" form={userForm} label="Пароль" rules={{ required: editUser ? false : true }} noSpace />
              <TextInput name="email" form={userForm} label="Почта" rules={{ required: true }} noSpace />
              <Select setValue={(val) => userForm.setValue('locale', val)} label="Локаль" options={viewLocale} value={watchLocale} noSpace />
              <div style={{ gridColumn: '1/3' }}>
                {' '}
                <RadioCard className={styles.roleBody} data={viewRoles} name="role" form={userForm} label="Роль" noSpace />
              </div>
              <div style={{ gridColumn: '1/3' }}>
                <Select setValue={(val) => userForm.setValue('firms', val)} label="Фирмы" options={viewFirms} value={watchFirms} noSpace isMulti />
              </div>
            </div>
            <div className={clsx(styles.modalFooter)}>
              <button type="button" class="me-2 btn btn-primary" onClick={userForm.handleSubmit(onSubmit)}>
                {editUser ? 'Сохранить изменения' : 'Добавить пользователя'}
              </button>
              {editUser && (
                <>
                  <button type="button" class="me-2 btn btn-primary" onClick={onGeneratePassword}>
                    Изменить пароль
                  </button>
                  <button class="me-2  btn-icon btn btn-danger" onClick={onDeleteUser}>
                    <i class="lnr-trash btn-icon-wrapper"></i>Удалить
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {(createLoading || updateLoading || deleteLoading) && <Loading />}
    </Modal>
  );
};
export default ModalUser;
