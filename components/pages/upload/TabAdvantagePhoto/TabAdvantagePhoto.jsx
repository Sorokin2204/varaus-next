import React, { useState } from 'react';
import CardInfographic from '../../../common/CardInfographic/CardInfographic';
import { v4 as uuidv4 } from 'uuid';
import styles from './TabAdvantagePhoto.module.scss';
const TabAdvantagePhoto = () => {
  const [count, setCount] = useState([{ id: uuidv4() }]);
  return (
    <>
      {count.map((val, index) => (
        <div>
          <CardInfographic
            key={val.id}
            onDelete={() => {
              if (count.length !== 1) setCount((items) => items.filter((x, i) => x.id !== val.id));
            }}
          />
        </div>
      ))}

      <button class="mb-2 me-2 btn-icon btn btn-primary mt-3" onClick={() => setCount([...count, { id: uuidv4() }])}>
        <i class="lnr-plus-circle btn-icon-wrapper"></i>Добавить преимущество
      </button>
    </>
  );
};

export default TabAdvantagePhoto;
