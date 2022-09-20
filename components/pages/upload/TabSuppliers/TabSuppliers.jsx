import React from 'react';
import styles from './TabSuppliers.module.scss';
import TextInput from '../../../common/TextInput/TextInput';
import Select from '../../../common/Select/Select';
const TabSuppliers = () => {
  return (
    <>
      <table class="mb-0 mt-3 table table-borderless">
        <thead>
          <tr class="bg-light">
            <th style={{ textAlign: 'center' }}>#</th>
            <th style={{ fontWeight: '400' }}>
              <Select placeholder="Название поставщика" />
            </th>
            <th style={{ fontWeight: '400' }}>
              <Select placeholder="Площадка" />
            </th>
            <th style={{ fontWeight: '400' }}>
              <Select placeholder="Ссылка на товар" />
            </th>
            <th style={{ textAlign: 'center' }}>
              <div class="card-title text-capitalize ">Удалить</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <input type="text" class="form-control" style={{ fontSize: '16px' }} placeholder="Введите название" />
            </td>
            <td>
              <Select placeholder="Выберите" />
            </td>
            <td>
              <Select placeholder="Введите ссылку" />
            </td>
            <td style={{ textAlign: 'center' }}>
              <button class=" btn-icon btn-icon-only btn btn-link  ">
                <i class="text-danger lnr-trash btn-icon-wrapper "></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TabSuppliers;
