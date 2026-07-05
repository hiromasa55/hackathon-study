// src/components/Sidebar.jsx
import React, {useEffect, useState} from 'react';
// 変更点①：'react-router-dom' から 'Link' を追加でインポートします
import { NavLink, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logoImg from '../assets/logo.png';

// react-iconsから、各メニューに合うアイコンをインポート
import { FaRegQuestionCircle, FaListUl, FaHistory, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const updateProfile = () => {
      const saved = localStorage.getItem("profile");
      if (saved) setProfile(JSON.parse(saved));
    };

    updateProfile();
    window.addEventListener("storage", updateProfile);

    return () => window.removeEventListener("storage", updateProfile);
  }, []);

  return (
    <div className={styles.sidebar}>
      
      <div className={styles.logoContainer}>
        {/* 変更点②：<img> タグを <Link to="/question"> で囲みます */}
        <Link to="/question">
          <img src={logoImg} alt="ぺこナビ" className={styles.logoImage} />
        </Link>
      </div>

      {/* プロフィール表示エリア */}
      {profile && (
        <div className={styles.profileBox}>
          <div className={styles.profileName}>
            {profile.nickname || profile.name}
          </div>
          <div className={styles.profileId}>
            {profile.studentId}
          </div>
        </div>
      )}
      
      {/* メニュー全体を囲むdivを追加 */}
      <div className={styles.menuList}>
        <NavLink 
          to="/question" 
          className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <FaRegQuestionCircle size={20} />
          <span>ぺこナビ</span>
        </NavLink>
        
        <NavLink 
          to="/menu" 
          className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <FaListUl size={20} />
          <span>メニュー一覧</span>
        </NavLink>
        
        <NavLink 
          to="/history" 
          className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <FaHistory size={20} />
          <span>履歴</span>
        </NavLink>
        
        <NavLink 
          to="/option" 
          className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <FaCog size={20} />
          <span>option</span>
        </NavLink>
      </div>

    </div>
  );
};

export default Sidebar;