import React from 'react';
import Textarea from '../Textarea/Textarea';
import TextInput from '../TextInput/TextInput';
import UploadFile from '../UploadFile/UploadFile';
// import styles from './CardInfographic.module.scss';
const CardInfographic = ({ onDelete }) => {
  return (
    <div class="card mt-3">
      <div class="card-body">
        <TextInput label={'Заголовок'} white />
        <Textarea label={'Описание'} />
        <UploadFile label={'Файл'} />
        <button class="mb-2 mt-2 me-2 btn-icon btn btn-danger" style={{ width: '110px' }} onClick={onDelete}>
          <i class="lnr-trash btn-icon-wrapper"></i>Удалить
        </button>
      </div>
    </div>
  );
};

export default CardInfographic;
