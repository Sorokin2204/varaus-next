import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setShowModalSection, setShowModalUser } from '../../../redux/slices/appSlice';
import { getSections } from '../../../redux/actions/section/getSections';
import { setEditSection } from '../../../redux/slices/sectionSlice';
import { deleteSection } from '../../../redux/actions/section/deleteSection';
import { deleteSections } from '../../../redux/actions/section/deleteSections';
const SectionPage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const dispath = useDispatch();
  const {
    getSections: { data, loading: sectionsLoading, pages, page },
    deleteSection: { loading: deleteLoading, data: deleteData },
    deleteSections: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.section);

  useEffect(() => {
    dispath(getSections());
  }, []);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getSections());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getSections());
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
      dispath(getSections({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);
  return (
    <MainGrid
      head={head}
      data={data}
      counted
      selectBy="U_CHAPTER_ID"
      setSelectRows={setSelectRows}
      search={searchTable}
      setSearch={setSearchTable}
      selectRows={selectRows}
      loading={sectionsLoading || deleteLoading || deleteManyLoading}
      selectable
      pages={pages}
      currentPage={page}
      onDeleteMany={(ids) => dispath(deleteSections(ids))}
      onAdd={() => {
        dispath(setEditSection(null));
        dispath(setShowModalSection(true));
      }}
      onEdit={(val) => {
        dispath(setEditSection(val));
        dispath(setShowModalSection(true));
      }}
      onDelete={(val) => {
        dispath(deleteSection({ deleteId: val?.U_ROLE__ID }));
      }}
      onPageClick={(page) => {
        dispath(getSections({ ...searchTable, page }));
      }}
    />
  );
};

export default SectionPage;
