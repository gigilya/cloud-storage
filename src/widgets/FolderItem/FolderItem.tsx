import React, {useState} from 'react';
import styles from './FolderItem.module.css';

interface FolderItemProps {
    name: string;
    files: number;
    iconColor: string;
}

const FolderItem: React.FC<FolderItemProps> = ({name, files, iconColor}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className={styles.folderItem}>
            <div className={styles.folderItemTop}>
        <span className={`material-symbols-outlined ${styles.folderIcon} text-${iconColor}`}>
          folder
        </span>
                <details className={styles.optionsContainer}>
                    <summary className={styles.optionsButton} onClick={toggleDropdown}>
                        <image className={`material-symbols-outlined ${styles.optionsIcon}`}>icon</image>
                    </summary>
                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <a className={styles.menuItem}>
                                <span className={`material-symbols-outlined ${styles.menuIcon}`}>edit</span> Rename
                            </a>
                            <a className={styles.menuItem}>
                                <span
                                    className={`material-symbols-outlined ${styles.menuIcon}`}>download</span> Download
                            </a>
                            <a className={`${styles.menuItem} ${styles.menuItemDelete}`}>
                                <span className={`material-symbols-outlined ${styles.menuIcon}`}>delete</span> Delete
                            </a>
                        </div>
                    )}
                </details>
            </div>
            <h3 className={styles.folderName}>{name}</h3>
            <p className={styles.fileCount}>{files} files</p>
        </div>
    );
};

export default FolderItem;