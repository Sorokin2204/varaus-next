import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/group/getGroups';
import { deleteGroups } from '../../../redux/actions/group/deleteGroups';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../redux/actions/category/getCategories';
import { setEditGroup } from '../../../redux/slices/groupSlice';
import { setShowModalGroup } from '../../../redux/slices/appSlice';
import { deleteGroup } from '../../../redux/actions/group/deleteGroup';
import { getGroup } from '../../../redux/actions/group/getGroup';
const GroupPage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [viewCategories, setViewCategories] = useState([]);

  const dispath = useDispatch();
  const {
    getGroups: { data, loading: groupsLoading, pages, page },
    deleteGroup: { loading: deleteLoading, data: deleteData },
    deleteGroups: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.group);
  const {
    getCategories: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);
  const { activeFirm } = useSelector((state) => state.app);

  useEffect(() => {
    if (activeFirm?.value) {
      dispath(getCategories());
      dispath(getGroups());
    }
  }, [activeFirm]);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getGroups());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getGroups());
    }
  }, [deleteManyData, deleteManyLoading]);

  useEffect(() => {
    if (categories && !categoriesLoading) {
      setHead({
        S_CATEGORY_GROUP_NAME: {
          type: 'input',
          title: 'Наименование',
        },
        U_CATEGORY_ID: {
          type: 'select',
          list: [{ label: 'Все категории', value: '' }, ...categories?.map((cat) => ({ label: cat.S_CATEGORY_NAME, value: cat.U_CATEGORY_ID }))],
          title: 'Категория',
          onTransform: (val) => {
            const findCat = categories?.find((cat) => cat.U_CATEGORY_ID === val);
            return findCat?.S_CATEGORY_NAME ?? val;
          },
        },
      });
    }
  }, [categories]);

  useEffect(() => {
    if (searchTable) {
      console.log(searchTable);
      dispath(getGroups({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);

  return (
    <>
      <MainGrid
        head={head}
        data={data}
        counted
        selectBy="U_CATEGORY_GROUP_ID"
        setSelectRows={setSelectRows}
        search={searchTable}
        setSearch={setSearchTable}
        selectRows={selectRows}
        loading={groupsLoading || deleteLoading || deleteManyLoading || categoriesLoading || !activeFirm}
        selectable
        pages={pages}
        currentPage={page}
        onDeleteMany={(ids) => dispath(deleteGroups(ids))}
        onAdd={() => {
          dispath(setEditGroup(null));
          dispath(setShowModalGroup(true));
        }}
        onEdit={(val) => {
          dispath(setEditGroup(val));
          dispath(setShowModalGroup(true));
        }}
        onDelete={(val) => {
          dispath(deleteGroup({ deleteId: val?.U_CATEGORY_GROUP_ID }));
        }}
        onPageClick={(page) => {
          dispath(getGroups({ ...searchTable, page }));
        }}
      />
    </>
  );
};

export default GroupPage;
