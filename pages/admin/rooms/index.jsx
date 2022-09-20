import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setShowModalRoom, setShowModalUser } from '../../../redux/slices/appSlice';
import { getRooms } from '../../../redux/actions/room/getRooms';
import { setEditRoom } from '../../../redux/slices/roomSlice';
import { deleteUser } from '../../../redux/actions/user/deleteUser';
import { deleteRoom } from '../../../redux/actions/room/deleteRoom';
import { deleteRooms } from '../../../redux/actions/room/deleteRooms';
import Router from 'next/router';
const CompanyPage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const dispath = useDispatch();
  const {
    getRooms: { data: rooms, loading: roomsLoading, pages, page },
    deleteRoom: { loading: deleteLoading, data: deleteData },
    deleteRooms: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.room);

  useEffect(() => {
    dispath(getRooms());
  }, []);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getRooms());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getRooms());
    }
  }, [deleteManyData, deleteManyLoading]);

  useEffect(() => {
    setHead({
      NAME: {
        type: 'text',
        title: 'Название',
      },
    });
  }, []);

  useEffect(() => {
    if (searchTable) {
      dispath(getRooms({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);

  return (
    <>
      <MainGrid
        head={head}
        data={rooms}
        counted
        selectBy="ID"
        setSelectRows={setSelectRows}
        search={searchTable}
        setSearch={setSearchTable}
        selectRows={selectRows}
        loading={roomsLoading || deleteLoading || deleteManyLoading}
        selectable
        pages={pages}
        currentPage={page}
        onDeleteMany={(ids) => {
          // dispath(deleteRooms(ids));
        }}
        onAdd={() => {
          Router.push(`/admin/room/new`);
        }}
        onEdit={(val) => {
          Router.push(`/admin/room/${val?.SLUG}`);
        }}
        onDelete={(val) => {
          // dispath(deleteRoom({ deleteId: val?.U_ID }));
        }}
        onPageClick={(page) => {
          dispath(getRooms({ ...searchTable, page }));
        }}
      />
    </>
  );
};

export default CompanyPage;
