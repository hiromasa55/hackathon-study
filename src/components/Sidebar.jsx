// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>ロゴ</div>
      
      {/* isActiveがtrue(現在地)なら、navItemとactiveの両方のCSSを当てる */}
      <NavLink 
        to="/question" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        質問
      </NavLink>
      
      <NavLink 
        to="/menu" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        メニュー一覧
      </NavLink>
      
      <NavLink 
        to="/history" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        履歴
      </NavLink>
      
      <NavLink 
        to="/option" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        option
      </NavLink>
    </div>
  );
};

export default Sidebar;