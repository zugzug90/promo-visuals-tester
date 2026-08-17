import React from 'react';
import { SIDEBAR_ICONS, SidebarIcon } from './Icons.jsx';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {SIDEBAR_ICONS.map((icon) => (
        <button key={icon.id} className={styles.iconBtn} title={icon.id}>
          <SidebarIcon path={icon.path} />
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
