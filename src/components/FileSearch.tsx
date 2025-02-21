import React from 'react';
import styles from './FileSearch.module.css';

const FileSearch: React.FC = () => {
    return (
        <div className={styles.searchContainer}>
      <image className={`material-symbols-outlined ${styles.searchIcon}`}>
        icon
      </image>
            <input
                type="text"
                placeholder="Search files..."
                className={styles.searchField}
            />
        </div>
    );
};

export default FileSearch;