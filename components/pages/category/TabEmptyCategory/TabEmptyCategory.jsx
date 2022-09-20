import React, { useEffect, useState } from 'react';
import Select from '../../../common/Select/Select';
import TextInput from '../../../common/TextInput/TextInput';
import styles from './TabEmptyCategory.module.scss';
import { useSelector } from 'react-redux';
const TabEmptyCategory = ({ form }) => {
  const [viewCategory, setViewCategory] = useState([]);
  const { modalCreateCategory } = useSelector((state) => state.app);
  const watchCat = form.watch('parent');
  const {
    getCategories: { data: categories },
    editCategory,
  } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories && categories?.length !== 0) {
      let viewCat = categories?.map((item) => ({ value: item.U_CATEGORY_ID, label: item.S_CATEGORY_NAME }));
      if (!modalCreateCategory) {
        console.log('FILTER');
        viewCat = viewCat.filter((cat) => cat.value !== editCategory?.value);
      }
      setViewCategory(viewCat);
    } else {
      setViewCategory([]);
    }
  }, []);
  return (
    <>
      <TextInput label="Название категории" rules={{ required: true }} name="name" form={form} />
      <Select label="Родительская категория" defaultValue={watchCat} name="parent" form={form} options={viewCategory} isClearable />
    </>
  );
};

export default TabEmptyCategory;
