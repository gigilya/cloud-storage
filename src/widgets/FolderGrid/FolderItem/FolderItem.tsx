import React from 'react';
import styles from './FolderItem.module.css';

interface FolderItemProps {
    name: string;
    files: number;
    icon: string;
}

const FolderItem: React.FC<FolderItemProps> = ({ name, files, icon }) => {
    return (
        <div className={styles.folderItem}>
            <div className={styles.folderItemTop}>
                <span className={styles.folderIcon}>{icon}</span>
                <span className={styles.optionsIcon}>{name}</span>
            </div>
            <p className={styles.fileCount}>
                {files} {files === 1 ? 'file' : 'files'}
            </p>
        </div>
    );
};

export default FolderItem;
