import React, { useEffect, useState } from 'react';
import { createRole } from '../../../../redux/actions/role/createRole';
import { updateRole } from '../../../../redux/actions/role/updateRole';
import { setShowModalRole } from '../../../../redux/slices/appSlice';
import { setEditRole } from '../../../../redux/slices/roleSlice';
import styles from './ModalRole.module.scss';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Loading from '../../../common/Loading/Loading';
import { getRoles } from '../../../../redux/actions/role/getRoles';
const ModalRole = () => {
  const dispatch = useDispatch();
  const { modalRole } = useSelector((state) => state.app);

  const {
    createRole: { data: createData, loading: createLoading },
    updateRole: { data: updateData, loading: updateLoading },
    editRole,
  } = useSelector((state) => state.role);
  const defaultValues = {
    name: '',
  };
  const roleForm = useForm({ defaultValues });
  const onSubmit = (data) => {
    if (editRole) {
      dispatch(updateRole({ ...data, id: editRole.U_ROLE__ID }));
    } else {
      dispatch(createRole({ ...data }));
    }
  };
  useEffect(() => {
    if (updateData && !updateLoading) {
      dispatch(setShowModalRole(false));
      dispatch(getRoles());
      dispatch(setEditRole(null));
      roleForm.reset();
    }
  }, [updateData, updateLoading]);

  useEffect(() => {
    if (createData && !createLoading) {
      dispatch(setShowModalRole(false));
      dispatch(getRoles());
      roleForm.reset();
    }
  }, [createData, createLoading]);

  useEffect(() => {
    if (editRole) {
      roleForm.setValue('name', editRole?.S_ROLE_NAME);
    } else {
      roleForm.reset();
    }
  }, [editRole]);
  const [viewRoles, setViewRoles] = useState();

  const watchRole = roleForm.watch('role');
  return (
    <Modal title={!editRole ? 'Добавить Роль' : `Редактировать роль "${editRole?.S_ROLE_NAME}"`} onClose={() => dispatch(setShowModalRole(false))} show={modalRole} className={styles.modal}>
      <div>
        <TextInput name="name" form={roleForm} label="Наименование" noSpace rules={{ required: true }} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <button type="button" class="btn btn-primary" onClick={roleForm.handleSubmit(onSubmit)}>
          {editRole ? 'Сохранить роль' : 'Добавить роль'}
        </button>
      </div>
      {(createLoading || updateLoading) && <Loading />}
    </Modal>
  );
};

export default ModalRole;
