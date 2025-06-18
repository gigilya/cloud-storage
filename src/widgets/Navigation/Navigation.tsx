import React from 'react';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
    return (
        <nav className={styles.navigation}>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>Доступные мне</span>
            </button>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>Мои файлы</span>
            </button>
        </nav>
    );
};

export default Navigation;