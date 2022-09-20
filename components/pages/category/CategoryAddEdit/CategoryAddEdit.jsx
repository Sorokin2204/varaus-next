import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './CategoryAddEdit.module.scss';
import Select from '../../../common/Select/Select';
import DragGroup from '../../../common/DragGroup/DragGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setModalCategoryData, setShowCreateModalCategory, setShowModalCategory, setShowModalCategorySubfield } from '../../../../redux/slices/appSlice';
import { getCategories } from '../../../../redux/actions/category/getCategories';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import DragItem from '../../../common/DragItem/DragItem';
import { createCategory } from '../../../../redux/actions/category/createCategory';
import { resetGetGroupCategory, setEditCategory, setEditCategoryFull } from '../../../../redux/slices/categorySlice';
import { createGroupCategory } from '../../../../redux/actions/category/createGroupCategory';
import Loading from '../../../common/Loading/Loading';
import { v4 as uuidv4 } from 'uuid';
import DragGroupSpecs from '../DragGroupSpecs/DragGroupSpecs';
import { getGroupCategory } from '../../../../redux/actions/category/getGroupCategory';
import { deleteCategory } from '../../../../redux/actions/category/deleteCategory';
import { useRouter } from 'next/router';
import MultiInputs from '../../../common/MultiInputs/MultiInputs';
import { localize } from '../../../../public/locales/localize';
import ModalSubfield from '../ModalSubfield/ModalSubfield';
export const typeFieldList = [
  {
    label: 'Строка',
    value: '96ad1115-875d-4c83-b7df-19fa2f34068c',
  },
  {
    label: 'Обычный список',
    value: '3705e94d-3c23-4947-9f1f-030a38b3738e',
  },
  {
    label: 'Множественный список',
    value: '12d07060-f1af-41db-ac79-2a187a8f1c92',
  },
  {
    label: 'Текст',
    value: '97655152-ff9c-47f4-a09c-150c907a0200',
  },
];

const CategoryAddEdit = () => {
  const [viewCategories, setViewCategories] = useState([]);
  const [viewGroupCategory, setViewGroupCategory] = useState([]);
  const [savedButton, setSavedButton] = useState(false);
  const categoryForm = useForm();
  const { locale } = useRouter();
  const catGroupArray = useFieldArray({
    control: categoryForm.control,
    name: 'categorySpecs',
  });
  const {
    getCategories: { data: categories, loading: categoriesLoading },
    deleteCategory: { data: deleteCategoryData, loading: deleteCategoryLoading },
    createCategory: { data: createCategoryData, loading: createCategoryLoading },
    updateCategory: { data: updateCategoryData, loading: updateCategoryLoading },
    getGroupCategory: { data: groupCategory, loading: groupCategoryLoading },
    createGroupCategory: { data: createGroupCategoryData, loading: createGroupCategoryLoading },
    editCategory,
  } = useSelector((state) => state.category);
  const { activeFirm } = useSelector((state) => state.app);
  useEffect(() => {
    if (categories && categories?.length !== 0) {
      setViewCategories(categories?.map((item) => ({ value: item.U_CATEGORY_ID, label: item.S_CATEGORY_NAME })));
    } else {
      setViewCategories([]);
    }
  }, [categories]);
  useEffect(() => {
    if (activeFirm?.value) {
      dispatch(getCategories());
    }
  }, [activeFirm]);
  useEffect(() => {
    if (createGroupCategoryData && !createGroupCategoryLoading) {
      setSavedButton(true);
      setTimeout(() => {
        setSavedButton(false);
      }, 2000);
    }
  }, [createGroupCategoryData, createGroupCategoryLoading]);

  useEffect(() => {
    if (groupCategory && groupCategory?.length !== 0) {
      let viewGroupArr = [];
      groupCategory.map((group, groupIndex) => {
        const items = group.items.map((item, itemIndex) => ({
          order: item.N_ORDER,
          ID: item.U_CATEGORY_PARAM_ID,
          specs: [
            { type: 'text', value: item.S_PARAM_NAME, name: `categorySpecs[${groupIndex}].list[${itemIndex}].specs[0].value` },
            { type: 'select', value: typeFieldList.find((type) => type.value === item.U_PARAM_TYPE_ID), name: `categorySpecs[${groupIndex}].list[${itemIndex}].specs[1].value`, options: typeFieldList },
          ],
          subFieldValues: item?.items.lenght !== 0 ? item?.items.map((subItem) => ({ label: subItem?.S_CATEGORY_PARAM_ITEM_NAME, value: subItem?.U_CATEGORY_PARAM_ITEM_ID })) : [],
          subFieldName: `categorySpecs[${groupIndex}].list[${itemIndex}].subFieldValues`,
        }));
        viewGroupArr.push({
          title: group.S_CATEGORY_GROUP_NAME,
          ID: group.U_CATEGORY_GROUP_ID,
          list: items,
        });
      });

      setViewGroupCategory(viewGroupArr);
    } else {
      setViewGroupCategory([]);
    }
  }, [groupCategory]);
  useEffect(() => {
    if (viewGroupCategory && viewGroupCategory?.length !== 0) {
      categoryForm.setValue('categorySpecs', viewGroupCategory);
    } else {
      categoryForm.setValue('categorySpecs', []);
    }
  }, [viewGroupCategory]);

  useEffect(() => {
    categoryForm.register('categorySpecs');
  }, []);

  useEffect(() => {
    if (editCategory) {
      dispatch(resetGetGroupCategory());
      dispatch(getGroupCategory(editCategory.value));
    }
  }, [editCategory]);
  const dispatch = useDispatch();
  const { modalCategorySubfield } = useSelector((state) => state.app);
  const onAddNewSpec = () => {
    catGroupArray.append({
      title: `Новая группа (${catGroupArray.fields?.length + 1})`,
      ID: uuidv4(),
      list: [
        {
          order: 0,
          ID: uuidv4(),
          specs: [
            { type: 'text', value: '', name: `categorySpecs[${catGroupArray.fields?.length}].list[0].specs[0].value` },
            {
              type: 'select',
              value: typeFieldList[0],
              name: `categorySpecs[${catGroupArray.fields?.length}].list[0].specs[1].value`,
              options: typeFieldList,
            },
          ],
          subFieldValues: [],
          subFieldName: `categorySpecs[${catGroupArray.fields?.length}].list[0].subFieldValues`,
        },
      ],
    });
  };
  const onSaveCategory = (data) => {
    console.log(data);
    dispatch(createGroupCategory({ ...data, catId: editCategory.value }));
  };
  useEffect(() => {
    if ((deleteCategoryData && !deleteCategoryLoading) || (createCategoryData && !createCategoryLoading) || (updateCategoryData && !updateCategoryLoading) || activeFirm) {
      dispatch(setEditCategory(null));
      dispatch(resetGetGroupCategory());
      categoryForm.setValue('categorySpecs', []);
      dispatch(getCategories());
    }
  }, [deleteCategoryData, deleteCategoryLoading, createCategoryData, updateCategoryData, updateCategoryLoading, createCategoryLoading, activeFirm]);

  const onDeleteCategory = () => {
    if (editCategory) {
      dispatch(deleteCategory({ deleteId: editCategory.value }));
    }
  };
  console.log(catGroupArray.fields);
  return (
    <>
      <div class="card mb-3">
        <div class="card-header-tab card-header">
          <div className={clsx(styles.head)}>
            <button
              class=" me-2 btn-icon btn btn-primary "
              style={{ display: 'flex', alignItems: 'center', height: '37px' }}
              onClick={() => {
                dispatch(setShowModalCategory(true));
                dispatch(setShowCreateModalCategory(true));
              }}>
              <i class="lnr-plus-circle btn-icon-wrapper"></i> {localize[locale].category.addCategory}
            </button>

            {savedButton ? (
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '37px', background: 'rgba(58, 196, 125,1)', border: '1px solid transparent ', color: '#fff' }} class="me-2 btn-icon btn btn-primary">
                {<img src={'/success-icon-green.svg'} style={{ marginRight: '8px' }} />}
                {localize[locale].category.saved}
              </button>
            ) : (
              <button disabled={!editCategory} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '37px', background: '#E0ECFF', border: '1px solid #E0ECFF', color: '#212529' }} class="me-2 btn-icon btn btn-primary" onClick={categoryForm.handleSubmit(onSaveCategory)}>
                <img src={'/success-icon.svg'} style={{ marginRight: '8px' }} />
                {localize[locale].category.save}
              </button>
            )}
          </div>
        </div>
        <div class="card-body">
          <div className={clsx(styles.category)}>
            <Select
              setValue={(val) => {
                dispatch(setEditCategory(val));
                if (val) {
                  const findCat = categories.find((cat) => cat.U_CATEGORY_ID == val.value);
                  dispatch(setEditCategoryFull(findCat));
                } else {
                  dispatch(setEditCategoryFull(null));
                }
              }}
              options={viewCategories}
              value={editCategory}
              label={localize[locale].category.label}
              noSpace
            />
            <button
              disabled={!editCategory}
              class="btn-icon btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', height: '37px' }}
              onClick={() => {
                dispatch(setShowModalCategory(true));
                dispatch(setShowCreateModalCategory(false));
              }}>
              <i class="lnr-plus-circle btn-icon-wrapper"></i> {localize[locale].category.edit}
            </button>
            <button style={{ display: 'flex', alignItems: 'center', height: '37px' }} type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class=" btn-icon btn btn-danger" disabled={!editCategory} onClick={() => onDeleteCategory()}>
              <i class="lnr-trash btn-icon-wrapper"></i>
              {localize[locale].category.delete}
            </button>
          </div>
          <button
            disabled={!editCategory}
            style={{ display: 'flex', alignItems: 'center', height: '37px' }}
            class=" me-2 btn-icon btn btn-primary mt-3"
            onClick={() => {
              onAddNewSpec();
            }}>
            <i class="lnr-plus-circle btn-icon-wrapper"></i>
            {localize[locale].category.addGroupSpecs}
          </button>
          {editCategory && (
            <>
              <MultiInputs
                newRow={(index, length) => [
                  { type: 'text', value: '', name: `categorySpecs[${index}].list[${length}].specs[0].value` },
                  { type: 'select', value: typeFieldList[0], name: `categorySpecs[${index}].list[${length}].specs[1].value`, options: typeFieldList },
                ]}
                onEdit={(row) => {
                  const name = row?.subFieldName;
                  const type = row?.row?.specs?.[1]?.value?.label;
                  const list = categoryForm.getValues(name);
                  dispatch(
                    setModalCategoryData({
                      list,
                      type,
                      onSave: (data) => {
                        categoryForm.setValue(name, data);
                      },
                    }),
                  );
                  dispatch(setShowModalCategorySubfield(true));
                }}
                isEditable
                isDeletable
                form={categoryForm}
                textNotFound={'Групп характеристик не найдено'}
                fieldArray={catGroupArray}
              />
            </>
          )}
        </div>
        {(categoriesLoading || groupCategoryLoading || deleteCategoryLoading || createGroupCategoryLoading || !activeFirm) && <Loading />}
      </div>
      {}
    </>
  );
};

export default CategoryAddEdit;
