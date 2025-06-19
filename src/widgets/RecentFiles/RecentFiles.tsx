import { FC } from 'react';
import RecentFileItem from './RecentFileItem/RecentFileItem.tsx';
import styles from './RecentFiles.module.css';
import { FileItem } from '../../shared/api/types.ts';

interface RecentFileProps {
    filesUser?: FileItem[];
    onUpdate?: () => void;
}

const RecentFiles: FC<RecentFileProps> = ({ filesUser = [], onUpdate }) => {
    if (!filesUser || filesUser.length === 0) {
        return (
            <section className={styles.recentFilesSection}>
                <p>Нет файлов</p>
            </section>
        );
    }
    return (
        <section className={styles.recentFilesSection}>
            <div className={styles.recentFilesContainer}>
                {filesUser?.map((file) => (
                    <RecentFileItem
                        key={file.fileName}
                        name={file.fileName}
                        size={`${(file.fileSize / 1024 / 1024).toFixed(2)}МБ`}
                        fileName={file.fileName}
                        isPublic={true}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentFiles;
