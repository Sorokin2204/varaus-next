import MainGrid from '../../../components/common/MainGrid/MainGrid';
import Select from '../../../components/common/Select/Select';
import TextInput from '../../../components/common/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { getUsers } from '../../../redux/actions/user/getUsers';
import Modal from '../../../components/common/Modal/Modal';
import ModalUser from '../../../components/pages/user/ModalUser/ModalUser';
import ErrorPage from 'next/error';
import { setShowModalUser } from '../../../redux/slices/appSlice';
import { getFirms } from '../../../redux/actions/firm/getFirms';
import { getRoles } from '../../../redux/actions/role/getRoles';
import { setEditUser, setPage } from '../../../redux/slices/userSlice';
import { deleteUser } from '../../../redux/actions/user/deleteUser';
import { deleteUsers } from '../../../redux/actions/user/deleteUsers';
import { useSession } from 'next-auth/react';
const UserPage = () => {
  const [viewData, setViewData] = useState(null);
  const [viewRoles, setViewRoles] = useState(null);
  const [viewFirms, setViewFirms] = useState(null);
  const [searchTable, setSearchTable] = useState(null);
  const [head, setHead] = useState(null);
  const {
    getUsers: { data: usersData, loading: usersLoading, pages, page },
    deleteUser: { loading: deleteLoading, data: deleteData },
    deleteUsers: { loading: deleteManyLoading, data: deleteManyData },
  } = useSelector((state) => state.user);
  const {
    getRoles: { data: roles },
  } = useSelector((state) => state.role);
  const {
    getFirms: { data: firms },
  } = useSelector((state) => state.firm);

  const dispath = useDispatch();
  const [selectRows, setSelectRows] = useState([]);
  useEffect(() => {
    dispath(getFirms());
    dispath(getRoles());
    dispath(getUsers());
  }, []);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispath(getUsers());
    }
  }, [deleteData, deleteLoading]);
  useEffect(() => {
    if (deleteManyData && !deleteManyLoading) {
      dispath(getUsers());
    }
  }, [deleteManyData, deleteManyLoading]);

  useEffect(() => {
    if (firms) {
      setViewFirms(firms.map((firm) => ({ value: firm.U_ID, label: firm.S_NAME })));
    }
  }, [firms]);

  useEffect(() => {
    if (roles && !viewRoles) {
      setViewRoles([{ label: 'Роль', value: '' }, ...roles.map((role) => ({ value: role.U_ROLE__ID, label: role?.S_ROLE_NAME }))]);
    }
    if (roles && usersData) {
      const view = usersData.map((user) => {
        const findRole = roles.find((role) => role.U_ROLE__ID === user.U_ROLE_ID);
        return { ...user, U_ROLE_ID: findRole?.S_ROLE_NAME };
      });
      setViewData(view);
    }
  }, [roles, usersData]);

  useEffect(() => {
    if (viewRoles) {
      setHead({
        S_FIRSTNAME: {
          type: 'input',
          title: 'Имя',
        },
        S_LASTNAME: {
          type: 'input',
          title: 'Фамилия',
        },
        S_EMAIL: {
          type: 'input',
          title: 'Email',
        },
        U_ROLE_ID: {
          width: '170px',
          type: 'select',
          title: 'Роль',
          list: viewRoles,
        },
        C_ACTIVE: {
          type: 'text',
          title: 'Статус',
          onTransform: (val) => {
            if (val) {
              return <div style={{ color: '#0D6EFD' }}>Активен</div>;
            } else {
              return <div style={{ color: '#DC3545' }}>Заблокирован</div>;
            }
          },
        },
      });
    }
  }, [viewRoles]);

  useEffect(() => {
    if (searchTable) {
      dispath(getUsers({ ...searchTable, page: 1 }));
    }
  }, [searchTable]);
  const { data: session } = useSession();
  console.log(session);
  return session.user.role === 'Администратор' ? (
    <MainGrid
      head={head}
      data={viewData}
      counted
      selectBy="U_USER_ID"
      setSelectRows={setSelectRows}
      search={searchTable}
      setSearch={setSearchTable}
      selectRows={selectRows}
      loading={usersLoading || deleteLoading || deleteManyLoading}
      selectable
      pages={pages}
      currentPage={page}
      onAdd={() => {
        dispath(setEditUser(null));
        dispath(setShowModalUser(true));
      }}
      onEdit={(val) => {
        dispath(setEditUser(val));
        dispath(setShowModalUser(true));
      }}
      onDeleteMany={(ids) => dispath(deleteUsers(ids))}
      onDelete={(val) => dispath(deleteUser({ deleteId: val?.U_USER_ID }))}
      onPageClick={(page) => dispath(getUsers({ ...searchTable, page }))}
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

export default UserPage;
