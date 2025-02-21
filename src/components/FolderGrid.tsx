import React from 'react';
import FolderItem from './FolderItem.tsx';
import styles from './FolderGrid.module.css';

const FolderGrid: React.FC = () => {
    const folders = [
        { name: 'Documents', files: 15, iconColor: 'blue-500' },
        { name: 'Images', files: 243, iconColor: 'green-500' },
        { name: 'Videos', files: 35, iconColor: 'purple-500' },
        { name: 'Music', files: 128, iconColor: 'orange-500' },
    ];

    return (
        <div className={styles.folderGrid}>
            {folders.map((folder, index) => (
                <FolderItem
                    key={index}
                    name={folder.name}
                    files={folder.files}
                    iconColor={folder.iconColor}
                />
            ))}
        </div>
    );
};

export default FolderGrid;
