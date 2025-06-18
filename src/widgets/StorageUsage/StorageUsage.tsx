import React from 'react';
import styles from './StorageUsage.module.css';

interface StorageUsageProps {
    files: {
        fileSize: number;
    }[];
}

const StorageUsage: React.FC<StorageUsageProps> = ({ files }) => {
    // Константы
    const TOTAL_SPACE_GB = 10; // Всего доступно 10 ГБ
    const TOTAL_SPACE_BYTES = TOTAL_SPACE_GB * 1024 * 1024 * 1024; // Конвертируем в байты

    // Рассчитываем использованное пространство
    const usedSpaceBytes = files.reduce((sum, file) => sum + (file.fileSize || 0), 0);
    const usedSpaceGB = usedSpaceBytes / (1024 * 1024 * 1024);
    const freeSpaceGB = TOTAL_SPACE_GB - usedSpaceGB;
    const usagePercentage = Math.round((usedSpaceBytes / TOTAL_SPACE_BYTES) * 100);

    // Форматирование чисел
    const formatGB = (value: number) => {
        return value.toFixed(2) + ' GB';
    };

    return (
        <section className={styles.storageSection}>
            <h2 className={styles.sectionHeader}>Storage Usage</h2>
            <div className={styles.storageContainer}>
                <div className={styles.topRow}>
                    <div className={styles.storagePercent}>
                        <span className={styles.percentValue}>
                            {usagePercentage}%
                        </span>
                    </div>
                </div>
                <div className={styles.progressBar}>
                    <div
                        className={styles.filledBar}
                        style={{ width: `${usagePercentage}%` }}
                    ></div>
                </div>
                <div className={styles.infoGrid}>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Total Space</p>
                        <p className={styles.cellValue}>{TOTAL_SPACE_GB} GB</p>
                    </div>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Used Space</p>
                        <p className={styles.cellValue}>{formatGB(usedSpaceGB)}</p>
                    </div>
                    <div className={styles.gridCell}>
                        <p className={styles.cellLabel}>Free Space</p>
                        <p className={styles.cellValue}>{formatGB(freeSpaceGB)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorageUsage;