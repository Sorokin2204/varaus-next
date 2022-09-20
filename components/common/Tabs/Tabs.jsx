import React, { useEffect, useState } from 'react';
import styles from './Tabs.module.scss';
const Tabs = ({ list }) => {
  const [activeTab, setActiveTab] = useState(list?.[0]?.name);

  return (
    <>
      <div class="card-header-tab card-header" style={{ border: 'none', paddingLeft: '0px', height: '40px' }}>
        <ul class="nav" style={{ marginRight: 'auto', marginLeft: '0', height: '40px' }}>
          {list?.map((tab) => (
            <li class="nav-item " style={{ height: '40px' }}>
              <a data-bs-toggle="tab" onClick={() => setActiveTab(tab?.name)} class={`nav-link ${tab?.name === activeTab && 'active'}`} style={{ padding: '0px 8px 6px 8px' }}>
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {list?.map((tab) => tab?.name === activeTab && tab?.content)}
    </>
  );
};

export default Tabs;
