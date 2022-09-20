import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setShowModalRole, setShowModalUser } from '../../../redux/slices/appSlice';
import { getRoles } from '../../../redux/actions/role/getRoles';
import { setEditRole } from '../../../redux/slices/roleSlice';
import { deleteUser } from '../../../redux/actions/user/deleteUser';
import { deleteRole } from '../../../redux/actions/role/deleteRole';
import { deleteRoles } from '../../../redux/actions/role/deleteRoles';
import { useSession } from 'next-auth/react';
import { checkLocale } from '../../../utils/checkLocale';
const RolePage = () => {
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const [selectRows, setSelectRows] = useState([]);
  const dispath = useDispatch();
  const {
    getRoles: { data, loading: rolesLoading, pages, page },
    deleteRole: { loading: deleteLoading, data: deleteData },
    deleteRoles: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.role);

  useEffect(() => {
    dispath(getRoles());
  }, []);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getRoles());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getRoles());
    }
  }, [deleteManyData, deleteManyLoading]);

  useEffect(() => {
    setHead({
      LOCALE_NAME: {
        type: 'text',
        title: 'Наименование',
        onTransform: (row) => {
          return checkLocale(row);
        },
      },
    });
  }, []);

  useEffect(() => {
    if (searchTable) {
      dispath(getRoles({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);
  const { data: session } = useSession();
  return session.user.role === 'Администратор' ? (
    <MainGrid
      head={head}
      data={data}
      counted
      selectBy="U_ROLE__ID"
      setSelectRows={setSelectRows}
      search={searchTable}
      setSearch={setSearchTable}
      selectRows={selectRows}
      loading={rolesLoading || deleteLoading || deleteManyLoading}
      selectable
      pages={pages}
      currentPage={page}
      onDeleteMany={(ids) => dispath(deleteRoles(ids))}
      onAdd={() => {
        dispath(setEditRole(null));
        dispath(setShowModalRole(true));
      }}
      onEdit={(val) => {
        dispath(setEditRole(val));
        dispath(setShowModalRole(true));
      }}
      onDelete={(val) => {
        dispath(deleteRole({ deleteId: val?.U_ROLE__ID }));
      }}
      onPageClick={(page) => {
        dispath(getRoles({ ...searchTable, page }));
      }}
    />
  ) : (
    <div
      style={{
        color: '#6c757d',
        fontSize: '24px',
        fontWeight: '700',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      Страница не найдена
    </div>
  );
};

export default RolePage;
