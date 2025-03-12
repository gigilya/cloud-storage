import React from 'react';
import FileSearch from '../FileSearch/FileSearch.tsx';
import ActionButtons from '../ActionButtons/ActionButtons.tsx';
import Navigation from '../Navigation/Navigation.tsx';
import FolderGrid from '../FolderGrid/FolderGrid.tsx';
import RecentFiles from '../RecentFiles/RecentFiles.tsx';
import StorageUsage from '../StorageUsage/StorageUsage.tsx';
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
