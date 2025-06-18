import React, { useEffect, useState } from 'react';
import FolderItem from './FolderItem/FolderItem.tsx';
import styles from './Folder.module.css';

interface Folder {
    name: string;
    files: number;
    icon: string;
}

const FolderGrid: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                setLoading(true);
                const mockData: Folder[] = [
                    { name: 'Documents', files: 15, icon: '' },
                    { name: 'Images', files: 243, icon: '' },
                    { name: 'Videos', files: 35, icon: '' },
                ];

                setFolders(mockData);
            } catch (err) {
                setError('Failed to load folders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFolders();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading folders...</div>;
    }
    if (error) {
        return <div className={styles.error}>{error}</div>;
    }
    return (
        <div className={styles.folders}>
            <div className={styles.scrollContainer}>
                <div className={styles.folderGrid}>
                    {folders.map((folder, index) => (
                        <FolderItem
                            key={index}
                            name={folder.name}
                            files={folder.files}
                            icon={folder.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FolderGrid;
