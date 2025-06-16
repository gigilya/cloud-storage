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

    // Заглушка для получения данных из API
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                setLoading(true);
                // Здесь будет реальный вызов API
                // const response = await fetch('/api/folders');
                // const data = await response.json();

                // Имитация загрузки данных
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Заглушечные данные
                const mockData: Folder[] = [
                    { name: 'Documents', files: 15, icon: 'blue-500' },
                    { name: 'Images', files: 243, icon: 'green-500' },
                    { name: 'Videos', files: 35, icon: 'purple-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
                    { name: 'Music', files: 128, icon: 'orange-500' },
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
