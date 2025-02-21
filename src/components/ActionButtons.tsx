import React from 'react';
import styles from './ActionButtons.module.css';

const ActionButtons: React.FC = () => {
    return (
        <div className={styles.buttonsContainer}>
            <button className={styles.actionButton}>
                <image className={`material-symbols-outlined ${styles.actionIcon}`}>icon</image>
                New File
            </button>
            <button className={styles.actionButton}>
                <image className={`material-symbols-outlined ${styles.actionIcon}`}>icon</image>
                New Folder
            </button>
        </div>
    );
};

export default ActionButtons;