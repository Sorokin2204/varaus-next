import React, { useEffect, useState } from 'react';
import Modal from '../../../common/Modal/Modal';
import styles from './ModalCategory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreateModalCategory, setShowModalCategory, setShowModalUser } from '../../../../redux/slices/appSlice';
import TextInput from '../../../common/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import { createUser } from '../../../../redux/actions/user/createUser';
import Loading from '../../../common/Loading/Loading';
import { getUsers } from '../../../../redux/actions/user/getUsers';
import { updateUser } from '../../../../redux/actions/user/updateUser';
import { setEditUser } from '../../../../redux/slices/userSlice';
import Select from '../../../common/Select/Select';
import clsx from 'clsx';
import RadioCard from '../../../common/RadioCard/RadioCard';
import { getUser } from '../../../../redux/actions/user/getUser';
import Radio from '../../../common/Radio/Radio';
import { getFirms } from '../../../../redux/actions/firm/getFirms';
import { getRoles } from '../../../../redux/actions/role/getRoles';
import generator from 'generate-password';
import { deleteUser } from '../../../../redux/actions/user/deleteUser';
import Tabs from '../../../common/Tabs/Tabs';
import TabFromTemplate from '../TabFromTemplate/TabFromTemplate';
import TabEmptyCategory from '../TabEmptyCategory/TabEmptyCategory';
import { createCategory } from '../../../../redux/actions/category/createCategory';
import { getCategories } from '../../../../redux/actions/category/getCategories';
import { updateCategory } from '../../../../redux/actions/category/updateCategory';
import { resetCreateCategory, resetUpdateCategory, setEditCategory, setEditCategoryFull } from '../../../../redux/slices/categorySlice';
const ModalCategory = () => {
  const defaultValues = {
    name: '',
    shared: false,
    parent: null,
  };
  const dispatch = useDispatch();
  const { modalCategory, modalCreateCategory } = useSelector((state) => state.app);
  const [viewTemplate, setViewTemplate] = useState();
  const {
    editCategory,
    editCategoryFull,
    createCategory: { loading: createLoading, data: createData },
    updateCategory: { loading: updateLoading, data: updateData },
    getCategories: { data: categories },
  } = useSelector((state) => state.category);
  const categoryForm = useForm({ defaultValues });

  useEffect(() => {
    if (createData && !createLoading) {
      dispatch(setShowModalCategory(false));
      dispatch(setShowCreateModalCategory(false));
      dispatch(getCategories());
      dispatch(resetCreateCategory());
      dispatch(setEditCategory(null));
      dispatch(setEditCategoryFull(null));
      categoryForm.reset();
    }
  }, [createData, createLoading]);

  useEffect(() => {
    if (updateData && !updateLoading) {
      dispatch(setShowModalCategory(false));
      dispatch(setShowCreateModalCategory(false));
      dispatch(getCategories());
      dispatch(resetUpdateCategory());
      dispatch(setEditCategory(null));
      dispatch(setEditCategoryFull(null));
      categoryForm.reset();
    }
  }, [updateData, updateLoading]);

  const onSubmit = (data) => {
    console.log(data);
    if (modalCreateCategory) {
      dispatch(createCategory(data));
    } else {
      dispatch(updateCategory({ ...data, id: editCategory.value }));
    }
  };

  const editCategoryTabs = [
    { name: 'from-template', title: 'Из шаблона', content: <TabFromTemplate form={categoryForm} /> },
    { name: 'empty-cat', title: 'Пустая категория', content: <TabEmptyCategory form={categoryForm} /> },
  ];

  useEffect(() => {
    if (!modalCreateCategory) {
      categoryForm.setValue('name', editCategoryFull.S_CATEGORY_NAME);
      categoryForm.setValue('shared', editCategoryFull.C_SHARED);
      const findParent = categories.find((cat) => cat.U_CATEGORY_ID === editCategoryFull.U_CATEGORY_PARENT_ID);
      if (findParent) {
        categoryForm.setValue('parent', { value: findParent.U_CATEGORY_ID, label: findParent.S_CATEGORY_NAME });
      }
    } else {
      categoryForm.setValue('name', '');
      categoryForm.setValue('shared', false);
      categoryForm.setValue('parent', null);
    }
  }, []);
  const watchShared = categoryForm.watch('shared');
  return (
    <Modal
      title={!editCategory ? 'Создание категории' : `Редактирование категории`}
      onClose={() => {
        dispatch(setShowModalCategory(false));
        dispatch(setShowCreateModalCategory(false));
      }}
      show={true}
      className={styles.modal}>
      <div style={{ minHeight: '200px' }}>
        {true ? (
          <>
            <div className={clsx(styles.modalBody)}>
              <Tabs list={editCategoryTabs} />
              <label class="mt-3" style={{ display: 'flex', alignItems: 'center', color: '#212529', fontSize: '16px' }}>
                <input name="check" type="checkbox" checked={watchShared} onChange={(e) => categoryForm.setValue('shared', e.target.checked)} class="form-check-input" autoComplete="off" style={{ marginTop: '0', width: '24px !important', height: '24px !important', marginRight: '10px' }} />
                Общая для всех фирм
              </label>
            </div>
            <div className={clsx(styles.modalFooter)}>
              <button type="button" class="me-2 btn btn-primary" onClick={categoryForm.handleSubmit(onSubmit)}>
                {editCategory ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {(createLoading || updateLoading) && <Loading />}
    </Modal>
  );
};
export default ModalCategory;
