import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setShowModalCategory, setShowModalUser } from '../../../redux/slices/appSlice';
import { getCategories } from '../../../redux/actions/category/getCategories';
import { setEditCategory } from '../../../redux/slices/categorySlice';
import { deleteUser } from '../../../redux/actions/user/deleteUser';
import { deleteCategory } from '../../../redux/actions/category/deleteCategory';
import { deleteCategories } from '../../../redux/actions/category/deleteCategories';
import CategoryAddEdit from '../../../components/pages/category/CategoryAddEdit/CategoryAddEdit';
import DragGroup from '../../../components/common/DragGroup/DragGroup';
const CategoryPage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const dispath = useDispatch();
  const {
    getCategories: { data, loading: categoriesLoading, pages, page },
    deleteCategory: { loading: deleteLoading, data: deleteData },
    deleteCategories: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.category);

  // useEffect(() => {
  //   dispath(getCategories());
  // }, []);

  // useEffect(() => {
  //   if (deleteData && !deleteLoading) {
  //     dispath(getCategories());
  //   }
  // }, [deleteData, deleteLoading]);
  // useEffect(() => {
  //   if (deleteManyData && !deleteManyLoading) {
  //     dispath(getCategories());
  //   }
  // }, [deleteManyData, deleteManyLoading]);

  // useEffect(() => {
  //   setHead({
  //     S_ROLE_NAME: {
  //       type: 'text',
  //       title: 'Наименование',
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   if (searchTable) {
  //     dispath(getCategories({ ...searchTable, page: 1 }));
  //   }
  // }, [searchTable]);

  return (
    <>
      <CategoryAddEdit />
      {/* <MainGrid
        head={head}
        data={data ?? []}
        counted
        selectBy="U_ROLE__ID"
        setSelectRows={setSelectRows}
        search={searchTable}
        setSearch={setSearchTable}
        selectRows={selectRows}
        loading={categoriesLoading || deleteLoading || deleteManyLoading}
        selectable
        pages={pages}
        currentPage={page}
        onDeleteMany={(ids) => dispath(deleteCategories(ids))}
        onAdd={() => {
          dispath(setEditCategory(null));
          dispath(setShowModalCategory(true));
        }}
        onEdit={(val) => {
          dispath(setEditCategory(val));
          dispath(setShowModalCategory(true));
        }}
        onDelete={(val) => {
          dispath(deleteCategory({ deleteId: val?.U_ROLE__ID }));
        }}
        onPageClick={(page) => {
          dispath(getCategories({ ...searchTable, page }));
        }}
      /> */}
    </>
  );
};

export default CategoryPage;
