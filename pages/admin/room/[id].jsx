import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Loading from '../../../components/common/Loading/Loading';
import AddEditRoom from '../../../components/pages/room/AddEditRoom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getRoom } from '../../../redux/actions/room/getRoom';
const EditRoom = () => {
  const router = useRouter();
  console.log(router.query);
  useEffect(() => {
    if (router.query?.id) {
      console.log(router.query?.id);
      dispatch(getRoom({ id: router.query?.id }));
    }
  }, [router.query]);

  const dispatch = useDispatch();
  const {
    getRoom: { data, loading },
  } = useSelector((state) => state.room);
  return (
    <>
      {!data || loading ? (
        <Loading />
      ) : !data && !loading ? (
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
      ) : (
        <AddEditRoom value={data} />
      )}
    </>
  );
};

export default EditRoom;
