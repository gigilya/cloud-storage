import React from 'react';
import FileSearch from './FileSearch';
import ActionButtons from './ActionButtons';
import Navigation from './Navigation';
import FolderGrid from './FolderGrid';
import RecentFiles from './RecentFiles';
import StorageUsage from './StorageUsage';
import styles from './MainFileManager.module.css';

const MainFileManager: React.FC = () => {
    return (
        <div id="webcrumbs" className={styles.mainContainer}>
            <div className={styles.topContainer}>
                <div className={styles.elementsContainer}>
                    <header className={styles.header}>
                        <h1 className={styles.headerText}>File Manager</h1>
                        <div className={styles.searchAndActionsContainer}>
                            <FileSearch />
                            <ActionButtons />
                        </div>
                    </header>
                    <div className={styles.emptyDivider}>
                        <div className={styles.emptyContainer}></div>
                    </div>
                </div>
                <div className={styles.emptyDivider}></div>
            </div>
            <Navigation />
            <FolderGrid />
            <RecentFiles />
            <StorageUsage />
        </div>
    );
};

export default MainFileManager;
