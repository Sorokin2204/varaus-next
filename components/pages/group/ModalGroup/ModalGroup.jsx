import React, { useEffect, useState } from 'react';
import { createGroup } from '../../../../redux/actions/group/createGroup';
import { updateGroup } from '../../../../redux/actions/group/updateGroup';
import { setModalCategoryData, setShowModalCategorySubfield, setShowModalGroup } from '../../../../redux/slices/appSlice';
import { resetGetGroup, setEditGroup } from '../../../../redux/slices/groupSlice';
import styles from './ModalGroup.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Loading from '../../../common/Loading/Loading';
import { getGroups } from '../../../../redux/actions/group/getGroups';
import { getGroup } from '../../../../redux/actions/group/getGroup';
import Select from '../../../common/Select/Select';
import { getCategories } from '../../../../redux/actions/category/getCategories';
import { typeFieldList } from '../../category/CategoryAddEdit/CategoryAddEdit';
import MultiInputs from '../../../common/MultiInputs/MultiInputs';
import { createGroupCategory } from '../../../../redux/actions/category/createGroupCategory';
import { resetCreateGroupCategory } from '../../../../redux/slices/categorySlice';
const ModalGroup = () => {
  const [viewCategories, setViewCategories] = useState();
  const [viewGroupCategory, setViewGroupCategory] = useState([]);
  const dispatch = useDispatch();
  const { modalGroup } = useSelector((state) => state.app);
  const {
    getCategories: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);

  const {
    createGroup: { data: createData, loading: createLoading },
    getGroup: { data: getGroupData, loading: getGroupLoading },
    updateGroup: { data: updateData, loading: updateLoading },
    editGroup,
  } = useSelector((state) => state.group);

  const {
    createGroupCategory: { data: createGroupCategoryData, loading: createGroupCategoryLoading },
  } = useSelector((state) => state.category);
  const defaultValues = {
    name: '',
    category: null,
  };
  const groupForm = useForm({ defaultValues });
  const catGroupArray = useFieldArray({
    control: groupForm.control,
    name: 'categorySpecs',
  });

  const onSubmit = (data) => {
    if (data.categorySpecs.length !== 0) {
      const catSpecs = data.categorySpecs;
      catSpecs[0].title = data.name;

      dispatch(createGroupCategory({ categorySpecs: catSpecs, catId: data.category.value }));
    }
  };
  // useEffect(() => {
  //   if (updateData && !updateLoading) {
  //     dispatch(setShowModalGroup(false));
  //     dispatch(getGroups());
  //     dispatch(setEditGroup(null));
  //     groupForm.reset();
  //   }
  // }, [updateData, updateLoading]);
  // useEffect(() => {
  //   if (createData && !createLoading) {
  //     dispatch(setShowModalGroup(false));
  //     dispatch(getGroups());
  //     groupForm.reset();
  //   }
  // }, [createData, createLoading]);

  useEffect(() => {
    if (createGroupCategoryData) {
      dispatch(setShowModalGroup(false));
      dispatch(setEditGroup(null));
      dispatch(resetCreateGroupCategory());
      dispatch(getGroups());
    }
  }, [createGroupCategoryData]);

  useEffect(() => {
    console.log('EDIT GROUP', editGroup);
    if (editGroup) {
      dispatch(getGroup(editGroup?.U_CATEGORY_GROUP_ID));
    } else {
      groupForm.setValue('name', '');
      groupForm.setValue('category', null);
      // setViewGroupCategory([
      //   {
      //     title: `Поля характеристик`,
      //     ID: uuidv4(),
      //     list: [
      //       {
      //         order: 0,
      //         ID: uuidv4(),
      //         specs: [
      //           { type: 'text', value: '', name: `categorySpecs[${catGroupArray.fields?.length}].list[0].specs[0].value` },
      //           { type: 'select', value: typeFieldList[0], name: `categorySpecs[${catGroupArray.fields?.length}].list[0].specs[1].value`, options: typeFieldList },
      //         ],
      //       },
      //     ],
      //   },
      // ]);
    }
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (!viewCategories) {
      const viewCat = categories?.map((item) => ({ value: item.U_CATEGORY_ID, label: item.S_CATEGORY_NAME }));
      setViewCategories(viewCat);
    }
    if (getGroupData && editGroup) {
      groupForm.setValue('name', editGroup?.S_CATEGORY_GROUP_NAME);
      const findCat = categories?.find((cat) => cat.U_CATEGORY_ID === getGroupData.U_CATEGORY_ID);
      if (findCat && editGroup) {
        groupForm.setValue('category', { value: findCat.U_CATEGORY_ID, label: findCat.S_CATEGORY_NAME });
      }
    }
  }, [categories, editGroup, getGroupData]);

  useEffect(() => {
    if (getGroupData && getGroupData?.length !== 0) {
      const items = getGroupData.items.map((item, itemIndex) => ({
        order: item.N_ORDER,
        ID: item.U_CATEGORY_PARAM_ID,
        specs: [
          { type: 'text', value: item.S_PARAM_NAME, name: `categorySpecs[0].list[${itemIndex}].specs[0].value` },
          { type: 'select', value: typeFieldList.find((type) => type.value === item.U_PARAM_TYPE_ID), name: `categorySpecs[0].list[${itemIndex}].specs[1].value`, options: typeFieldList },
        ],
        subFieldValues: item?.items?.lenght !== 0 && item?.items ? item?.items.map((subItem) => ({ label: subItem?.S_CATEGORY_PARAM_ITEM_NAME, value: subItem?.U_CATEGORY_PARAM_ITEM_ID })) : [],
        subFieldName: `categorySpecs[0].list[${itemIndex}].subFieldValues`,
      }));
      const viewGroup = [
        {
          title: 'Поля характеристик',
          ID: getGroupData.U_CATEGORY_GROUP_ID,
          list: items,
        },
      ];

      console.log(viewGroup);
      setViewGroupCategory(viewGroup);
    } else {
    }
  }, [getGroupData]);

  useEffect(() => {
    if (viewGroupCategory && viewGroupCategory?.length !== 0 && editGroup) {
      groupForm.setValue('categorySpecs', viewGroupCategory);
    } else {
      groupForm.setValue('categorySpecs', [
        {
          title: `Поля характеристик`,
          ID: uuidv4(),
          list: [
            {
              order: 0,
              ID: uuidv4(),
              specs: [
                { type: 'text', value: '', name: `categorySpecs[0].list[0].specs[0].value` },
                { type: 'select', value: typeFieldList[0], name: `categorySpecs[0].list[0].specs[1].value`, options: typeFieldList },
              ],
              subFieldValues: [],
              subFieldName: `categorySpecs[0].list[0].subFieldValues`,
            },
          ],
        },
      ]);
    }
  }, [viewGroupCategory, editGroup]);

  const watchCat = groupForm.watch('category');
  return (
    <Modal
      title={!editGroup ? 'Добавить группу' : `Редактировать группу "${editGroup?.S_CATEGORY_GROUP_NAME}"`}
      onClose={() => {
        dispatch(setEditGroup(null));
        dispatch(resetGetGroup());
        dispatch(setShowModalGroup(false));
      }}
      show={modalGroup}
      className={styles.modal}>
      <div className={styles.modalBody}>
        {!categoriesLoading && !getGroupLoading ? (
          <>
            <div>
              <TextInput name="name" form={groupForm} label="Название" noSpace rules={{ required: true }} />
              <Select label="Категория" name="category" rules={{ required: true }} form={groupForm} options={viewCategories} />
              {viewGroupCategory && (
                <MultiInputs
                  newRow={(index, length) => [
                    { type: 'text', value: '', name: `categorySpecs[${index}].list[${length}].specs[0].value` },
                    { type: 'select', value: typeFieldList[0], name: `categorySpecs[${index}].list[${length}].specs[1].value`, options: typeFieldList },
                  ]}
                  form={groupForm}
                  textNotFound={'Групп характеристик не найдено'}
                  fieldArray={catGroupArray}
                  onEdit={(row) => {
                    const name = row?.subFieldName;
                    const type = row?.row?.specs?.[1]?.value?.label;
                    const list = groupForm.getValues(name);
                    dispatch(
                      setModalCategoryData({
                        list,
                        type,
                        onSave: (data) => {
                          groupForm.setValue(name, data);
                        },
                      }),
                    );
                    dispatch(setShowModalCategorySubfield(true));
                  }}
                />
              )}
            </div>
            <div style={{ marginTop: '16px' }}>
              <button type="button" class="btn btn-primary" onClick={groupForm.handleSubmit(onSubmit)}>
                {editGroup ? 'Сохранить' : 'Добавить группу'}
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {createGroupCategoryLoading && <Loading />}
    </Modal>
  );
};

export default ModalGroup;
