import React from 'react';
import styles from './RecentFileItem.module.css';

interface RecentFileItemProps {
    name: string;
    modified: string;
    size: string;
    iconColor: string;
    icon: string;
}

const RecentFileItem: React.FC<RecentFileItemProps> = ({name, modified, size, iconColor, icon}) => {
    return (
        <div className={styles.recentFileItem}>
            <div className={styles.fileInfo}>
                <span className={`material-symbols-outlined ${styles.fileIcon} text-${iconColor}`}>{icon}</span>
                <div>
                    <h4 className={styles.fileName}>{name}</h4>
                    <p className={styles.modifiedDate}>Modified {modified}</p>
                </div>
            </div>
            <div className={styles.sizeAndOptions}>
                <span className={styles.fileSize}>{size}</span>
                <span className={`material-symbols-outlined ${styles.optionsIcon}`}>
                  . . .
                </span>
            </div>
        </div>
    );
};

export default RecentFileItem;