import React, { useEffect, useState } from 'react';
import { createRole } from '../../../../redux/actions/role/createRole';
import { updateRole } from '../../../../redux/actions/role/updateRole';
import { setModalCategoryData, setShowModalCategorySubfield, setShowModalRole } from '../../../../redux/slices/appSlice';
import { setEditRole } from '../../../../redux/slices/roleSlice';
import styles from './ModalSubfield.module.scss';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Loading from '../../../common/Loading/Loading';
import { getRoles } from '../../../../redux/actions/role/getRoles';
import Select from '../../../common/Select/Select';

const photoOptions = [
  { label: 'Первая опция для фото', value: 'f93dd3c9-0999-4c13-a787-eef730ade06f' },
  { label: 'Вторая опция для фото', value: 'f4cb054b-a4b6-4a5a-8f2a-9498649f01ef' },
];

const ModalSubfield = ({}) => {
  const [viewOptions, setViewOptions] = useState([]);
  const [typeRow, setTypeRow] = useState();

  const dispatch = useDispatch();
  const { modalCategorySubfield } = useSelector((state) => state.app);
  const { modalCategoryData } = useSelector((state) => state.app);
  const defaultValues = {
    subField: values,
  };
  const form = useForm({ defaultValues });
  const onSubmit = (data) => {
    modalCategoryData.onSave(data.subField);
    dispatch(setModalCategoryData(null));
    dispatch(setShowModalCategorySubfield(false));
  };

  useEffect(() => {
    if (modalCategoryData) {
      form.setValue('subField', modalCategoryData.list);
      if (modalCategoryData.type === 'Фото') {
        setViewOptions(photoOptions);
      }
      setTypeRow(modalCategoryData.type);
    }
  }, [modalCategoryData]);
  const values = form.watch('subField');
  console.log('SUB values', values);
  return (
    <Modal title={'Изменение Доп.параметров'} onClose={() => dispatch(setShowModalCategorySubfield(false))} show={modalCategorySubfield} className={styles.modal}>
      <div>{<Select defaultValue={values} form={form} name="subField" creatable />}</div>
      <div style={{ marginTop: '16px' }}>
        <button type="button" class="btn btn-primary" onClick={form.handleSubmit(onSubmit)}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};

export default ModalSubfield;
