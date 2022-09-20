import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setShowModalFirm, setShowModalUser } from '../../../redux/slices/appSlice';
import { getFirms } from '../../../redux/actions/firm/getFirms';
import { setEditFirm } from '../../../redux/slices/firmSlice';
import { deleteUser } from '../../../redux/actions/user/deleteUser';
import { deleteFirm } from '../../../redux/actions/firm/deleteFirm';
import { deleteFirms } from '../../../redux/actions/firm/deleteFirms';
const CompanyPage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const dispath = useDispatch();
  const {
    getFirms: { data: firms, loading: firmsLoading, pages, page },
    deleteFirm: { loading: deleteLoading, data: deleteData },
    deleteFirms: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.firm);

  useEffect(() => {
    dispath(getFirms());
  }, []);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getFirms());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getFirms());
    }
  }, [deleteManyData, deleteManyLoading]);

  useEffect(() => {
    setHead({
      S_NAME: {
        type: 'text',
        title: 'Наименование',
      },
    });
  }, []);

  useEffect(() => {
    if (searchTable) {
      dispath(getFirms({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);

  return (
    <>
      <MainGrid
        head={head}
        data={firms}
        counted
        selectBy="U_ID"
        setSelectRows={setSelectRows}
        search={searchTable}
        setSearch={setSearchTable}
        selectRows={selectRows}
        loading={firmsLoading || deleteLoading || deleteManyLoading}
        selectable
        pages={pages}
        currentPage={page}
        onDeleteMany={(ids) => dispath(deleteFirms(ids))}
        onAdd={() => {
          dispath(setEditFirm(null));
          dispath(setShowModalFirm(true));
        }}
        onEdit={(val) => {
          dispath(setEditFirm(val));
          dispath(setShowModalFirm(true));
        }}
        onDelete={(val) => {
          dispath(deleteFirm({ deleteId: val?.U_ID }));
        }}
        onPageClick={(page) => {
          dispath(getFirms({ ...searchTable, page }));
        }}
      />
    </>
  );
};

export default CompanyPage;
