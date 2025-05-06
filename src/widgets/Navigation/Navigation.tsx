import React from 'react';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
    return (
        <nav className={styles.navigation}>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>folder</span> All Files
            </button>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>image</span> Images
            </button>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>description</span> Documents
            </button>
            <button className={styles.navItem}>
                <span className={`material-symbols-outlined ${styles.navIcon}`}>movie</span> Videos
            </button>
        </nav>
    );
};

export default Navigation;