import React, { useEffect, useState } from 'react';
import { createSection } from '../../../../redux/actions/section/createSection';
import { updateSection } from '../../../../redux/actions/section/updateSection';
import { setShowModalSection } from '../../../../redux/slices/appSlice';
import { setEditSection } from '../../../../redux/slices/sectionSlice';
import styles from './ModalSection.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal/Modal';
import TextInput from '../../../common/TextInput/TextInput';
import Loading from '../../../common/Loading/Loading';
import { getSections } from '../../../../redux/actions/section/getSections';
import { getSection } from '../../../../redux/actions/section/getSection';
import Select from '../../../common/Select/Select';
import { getCategories } from '../../../../redux/actions/category/getCategories';
import { typeFieldList } from '../../category/CategoryAddEdit/CategoryAddEdit';
import MultiInputs from '../../../common/MultiInputs/MultiInputs';
// import { createSectionCategory } from '../../../../redux/actions/category/createSectionCategory';
import { resetCreateSectionCategory } from '../../../../redux/slices/categorySlice';
const ModalSection = () => {
  const [viewCategories, setViewCategories] = useState();
  const [viewSectionCategory, setViewSectionCategory] = useState([]);
  const dispatch = useDispatch();
  const { modalSection } = useSelector((state) => state.app);
  const {
    getCategories: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);

  const {
    createSection: { data: createData, loading: createLoading },
    getSection: { data: getSectionData, loading: getSectionLoading },
    updateSection: { data: updateData, loading: updateLoading },
    editSection,
  } = useSelector((state) => state.section);

  // const {
  //   createSectionCategory: { data: createSectionCategoryData, loading: createSectionCategoryLoading },
  // } = useSelector((state) => state.category);
  const defaultValues = {
    name: '',
  };
  const sectionForm = useForm({ defaultValues });
  const catSectionArray = useFieldArray({
    control: sectionForm.control,
    name: 'categorySpecs',
  });
  const onSubmit = (data) => {
    if (data.categorySpecs.length !== 0) {
      const catSpecs = data.categorySpecs;
      catSpecs[0].title = data.name;
      // dispatch(createSection({ sectionGroups: catSpecs, sectionId }));
      console.log(data);
    }
  };

  // useEffect(() => {
  //   if (createSectionCategoryData) {
  //     dispatch(setShowModalSection(false));
  //     dispatch(setEditSection(null));
  //     dispatch(resetCreateSectionCategory());
  //     dispatch(getSections());
  //   }
  // }, [createSectionCategoryData]);

  useEffect(() => {
    if (editSection) {
      dispatch(getSection(editSection?.U_CATEGORY_GROUP_ID));
    } else {
      sectionForm.setValue('name', '');
    }
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (!viewCategories) {
      const viewCat = categories?.map((item) => ({ value: item.U_CATEGORY_ID, label: item.S_CATEGORY_NAME }));
      setViewCategories(viewCat);
    }
    if (getSectionData && editSection) {
      sectionForm.setValue('name', editSection?.S_CATEGORY_GROUP_NAME);
      const findCat = categories?.find((cat) => cat.U_CATEGORY_ID === getSectionData.U_CATEGORY_ID);
    }
  }, [categories, editSection, getSectionData]);

  useEffect(() => {
    if (getSectionData && getSectionData?.length !== 0) {
      const items = getSectionData.items.map((item, itemIndex) => ({
        order: item.N_ORDER,
        ID: item.U_CATEGORY_PARAM_ID,
        specs: [{ type: 'select', value: typeFieldList.find((type) => type.value === item.U_PARAM_TYPE_ID), name: `categorySpecs[0].list[${itemIndex}].specs[1].value`, options: typeFieldList }],
      }));
      const viewSection = [
        {
          title: 'Поля характеристик',
          ID: getSectionData.U_CATEGORY_GROUP_ID,
          list: items,
        },
      ];

      console.log(viewSection);
      setViewSectionCategory(viewSection);
    } else {
    }
  }, [getSectionData]);

  useEffect(() => {
    if (viewCategories && viewCategories?.length !== 0) {
      if (viewSectionCategory && viewSectionCategory?.length !== 0 && editSection) {
        sectionForm.setValue('categorySpecs', viewSectionCategory);
      } else {
        sectionForm.setValue('categorySpecs', [
          {
            title: `Группы`,
            ID: uuidv4(),
            list: [
              {
                order: 0,
                ID: uuidv4(),
                specs: [{ type: 'select', value: viewCategories[0], name: `categorySpecs[0].list[0].specs[0].value`, options: viewCategories }],
              },
            ],
          },
        ]);
      }
    }
  }, [viewSectionCategory, viewCategories]);

  return (
    <Modal title={!editSection ? 'Добавить раздел' : `Редактировать раздел "${editSection?.S_CATEGORY_GROUP_NAME}"`} onClose={() => dispatch(setShowModalSection(false))} show={modalSection} className={styles.modal}>
      <div className={styles.modalBody}>
        {!categoriesLoading && !getSectionLoading && viewCategories?.length !== 0 && viewCategories ? (
          <>
            <div>
              <TextInput name="name" form={sectionForm} label="Название" noSpace rules={{ required: true }} />
              {/* <Select label="Категория" name="category" rules={{ required: true }} form={sectionForm} options={viewCategories} /> */}
              {viewSectionCategory && (
                <MultiInputs form={sectionForm} newRow={(index, length) => [{ type: 'select', value: viewCategories[0], name: `categorySpecs[${index}].list[${length}].specs[0].value`, options: viewCategories }]} textNotFound={'Групп характеристик не найдено'} fieldArray={catSectionArray} />
              )}
            </div>
            <div style={{ marginTop: '16px' }}>
              <button type="button" class="btn btn-primary" onClick={sectionForm.handleSubmit(onSubmit)}>
                {editSection ? 'Сохранить' : 'Добавить группу'}
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {/* {createSectionCategoryLoading && <Loading />} */}
    </Modal>
  );
};

export default ModalSection;
