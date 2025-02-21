import React from 'react';
import styles from './StorageUsage.module.css';

const StorageUsage: React.FC = () => {
    return (
        <section className={styles.storageSection}>
            <h2 className={styles.sectionHeader}>Storage Usage</h2>
            <div className={styles.storageContainer}>
                <div className={styles.topRow}>
                    <div>
            <span className={styles.storageLabel}>
              Storage
            </span>
                    </div>
                    <div className={styles.storagePercent}>
            <span className={styles.percentValue}>
              75%
            </span>
                    </div>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.filledBar}></div>
                </div>
                <div className={styles.infoGrid}>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Total Space</p>
                        <p className={styles.cellValue}>1 TB</p>
                    </div>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Used Space</p>
                        <p className={styles.cellValue}>750 GB</p>
                    </div>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Free Space</p>
                        <p className={styles.cellValue}>250 GB</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorageUsage;