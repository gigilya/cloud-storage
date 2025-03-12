import React from 'react';
import RecentFileItem from '../RecentFileItem/RecentFileItem.tsx';
import styles from './RecentFiles.module.css';

const RecentFiles: React.FC = () => {
    const recentFiles = [
        {
            name: 'Project_Report.pdf',
            modified: '2 hours ago',
            size: '2.5 MB',
            iconColor: 'blue-500',
            icon: 'description'
        },
        {name: 'vacation_photo.jpg', modified: 'yesterday', size: '4.2 MB', iconColor: 'green-500', icon: 'image'},
        {name: 'presentation.mp4', modified: '3 days ago', size: '156 MB', iconColor: 'purple-500', icon: 'movie'},
    ];
    return (
        <section className={styles.recentFilesSection}>
            <h2 className={styles.sectionHeader}>Recently Opened</h2>
            <div className={styles.recentFilesContainer}>
                {recentFiles.map((file, index) => (
                    <RecentFileItem
                        key={index}
                        name={file.name}
                        modified={file.modified}
                        size={file.size}
                        iconColor={file.iconColor}
                        icon={file.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentFiles;