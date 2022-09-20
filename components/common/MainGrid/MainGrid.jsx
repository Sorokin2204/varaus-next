import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import styles from './MainGrid.module.scss';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../../redux/actions/user/deleteUsers';
import Pagination from '../Pagination/Pagination';
import { useRouter } from 'next/router';
import WrapTextInputIcon from '../WrapTextInputIcon/WrapTextInputIcon';
import { localize } from '../../../public/locales/localize';
const MainGrid = ({ data, counted, selectBy, selectRows, setSelectRows, loading, selectable, onAdd, onEdit, onDelete, head, setSearch, search, pages, currentPage, onPageClick, onDeleteMany }) => {
  const onSelectRow = (checked, val) => {
    if (!checked) setSelectRows(selectRows.filter((sel) => sel[selectBy] !== val[selectBy]));
    if (checked) setSelectRows([...selectRows, val]);
  };
  const onSelectAllRows = (checked) => {
    if (!checked) setSelectRows([]);
    if (checked) setSelectRows(data);
  };

  useEffect(() => {
    if (data?.length !== 0) {
      setSelectRows(selectRows.filter((row) => data.find((item) => item[selectBy] === row[selectBy])));
    } else {
      setSelectRows([]);
    }
  }, [data]);

  const dispatch = useDispatch();
  const { locale } = useRouter();
  return data ? (
    <div class="main-card mb-3 card">
      <div class="card-body">
        <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <button class=" me-2 btn-icon btn btn-primary" onClick={() => onAdd()}>
                <i class="lnr-plus-circle btn-icon-wrapper"></i>
                {localize[locale].table.add}
              </button>
              <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class=" me-2 btn btn-danger" disabled={selectRows.length === 0} style={{ position: 'relative' }} onClick={() => onDeleteMany({ deleteIds: selectRows.map((selRow) => selRow[selectBy]) })}>
                {` ${localize[locale].table.deleteSelected} (${selectRows.length})`}
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <table class={'mb-0 mt-3 table table-borderless table-striped ' + styles.table}>
                <thead>
                  <tr class="bg-light">
                    {selectable && (
                      <th style={{ textAlign: 'center', width: '50px' }}>
                        <input name="check" checked={data?.length === selectRows?.length} type="checkbox" class="form-check-input" onChange={(e) => onSelectAllRows(e.target.checked)} autoComplete="off" />
                      </th>
                    )}
                    {counted && (
                      <th style={{ textAlign: 'center', width: 'min-content', width: '50px' }}>
                        <div class="card-title text-capitalize ">#</div>
                      </th>
                    )}
                    {head &&
                      Object?.keys(head)?.map((headKey) => (
                        <th style={{ width: head[headKey]?.width ?? 'auto' }}>
                          {head[headKey].type == 'text' ? (
                            head[headKey].title
                          ) : head[headKey].type == 'input' ? (
                            <TextInput
                              rightIcon={'lnr-magnifier btn-icon-wrapper'}
                              search
                              placeholder={head[headKey].title}
                              setValue={(val) => {
                                setSearch({ ...search, [headKey]: val });
                              }}
                            />
                          ) : head[headKey].type == 'select' ? (
                            <Select setValue={(val) => setSearch({ ...search, [headKey]: val?.value })} placeholder={head[headKey].title} options={head[headKey].list} />
                          ) : (
                            ''
                          )}
                        </th>
                      ))}

                    <th style={{ textAlign: 'center', width: '100px' }}>
                      <div class="card-title text-capitalize mb-0" style={{ fontSize: '16px' }}>
                        {localize[locale].table.action}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length == 0 ? (
                    <tr>
                      <td colSpan={'100%'}>
                        <div style={{ fontSize: '16px', margin: '0 auto', display: 'flex', justifyContent: 'center', padding: '32px 0' }}>{localize[locale].table.noResults}</div>
                      </td>
                    </tr>
                  ) : (
                    data?.map((row, i) => {
                      const selected = !!selectRows?.find((sel) => sel[selectBy] === row[selectBy]);
                      return (
                        <tr key={row[selectBy]} style={{ ...(selected && { backgroundColor: '#E0ECFF', '--bs-table-accent-bg': 'none' }) }} onClick={() => onEdit(row)}>
                          {selectable && <td style={{ textAlign: 'center' }}>{<input name="check" type="checkbox" checked={selected} class="form-check-input" onChange={(e) => onSelectRow(e.target.checked, row)} onClick={(e) => e.stopPropagation()} autoComplete="off" />}</td>}
                          {counted && (
                            <th scrope="row" style={{ textAlign: 'center' }}>
                              {i + 1}
                            </th>
                          )}
                          {head && Object.keys(head).map((key, index) => <td>{head[key]?.onTransform ? head[key]?.onTransform?.(row[key]) : row[key]}</td>)}
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {/* <button style={{ padding: '6px' }} class=" btn-icon btn-icon-only btn btn-link  " onClick={() => onEdit(row)}>
                                <i class="text-primary lnr-pencil btn-icon-wrapper "></i>
                              </button> */}
                              <button
                                class=" btn-icon btn-icon-only btn btn-link"
                                style={{ padding: '6px' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(row);
                                }}>
                                <i class="text-danger lnr-trash btn-icon-wrapper "></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {loading && <Loading />}
              </table>
            </div>
          </div>
          <div class="mt-3" style={{ display: 'flex', justifyContent: 'left' }}>
            {data?.length !== 0 && <Pagination pages={pages} currentPage={currentPage} onPageClick={onPageClick} />}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MainGrid;
