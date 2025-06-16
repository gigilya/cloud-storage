import React from 'react';
import styles from './RecentFileItem.module.css';
import { MoreOutlined } from '@ant-design/icons';

interface RecentFileItemProps {
    name: string;
    size: string;
}

const RecentFileItem: React.FC<RecentFileItemProps> = ({
    name,
    size,
}) => {
    return (
        <div className={styles.recentFileItem}>
            <div className={styles.fileInfo}>
                <span className={styles.fileIcon}></span>
                <div>
                    <h4 className={styles.fileName}>{name}</h4>
                </div>
            </div>
            <div className={styles.sizeAndOptions}>
                <span className={styles.fileSize}>{size}</span>
                <span><MoreOutlined /></span>
            </div>
        </div>
    );
};

export default RecentFileItem;
