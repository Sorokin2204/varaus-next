import React, { useState } from 'react';
// import styles from './CopyClipBoard.module.scss';
const CopyClipBoard = ({ title, link, disabled }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(link);
  return (
    <div class="mt-3">
      <div class="form-label" style={{ textTransform: 'none' }}>
        {title}
      </div>
      <div class="input-group">
        <div
          style={{ cursor: !edit ? 'pointer' : 'auto' }}
          onClick={() => {
            if (!edit) {
              window.open(value, '_blank');
            }
          }}>
          {' '}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            class="form-control"
            id="clipboard-source-2"
            disabled={!edit}
            style={{ textDecoration: !edit ? 'underline' : 'auto', height: '100%', borderRadius: '0.25rem 0 0 0.25rem', cursor: !edit ? 'pointer' : 'auto', color: !edit ? '#3f6ad8' : '#212529' }}
            autoComplete="off"
          />
        </div>
        <div class="input-group-text">
          <button type="button" data-clipboard-target="#clipboard-source-2" class="btn btn-primary clipboard-trigger" onClick={() => setEdit(!edit)}>
            {edit ? <i class="pe-7s-check"></i> : <i class="lnr-pencil"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyClipBoard;
