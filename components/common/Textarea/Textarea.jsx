import React from 'react';
// import styles from './Textarea.module.scss';
const Textarea = ({ label, rows, noSpace, form, name, rules }) => {
  return (
    <>
      <div class="position-relative mt-3">
        <label for="exampleText" class="form-label">
          {label}
        </label>
        <textarea {...(typeof form == 'undefined' || form.register(name, rules))} style={{ fontSize: '16px' }} rows={rows} class="form-control"></textarea>
      </div>
    </>
  );
};

export default Textarea;
