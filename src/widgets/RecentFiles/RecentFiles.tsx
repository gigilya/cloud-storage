import { FC } from 'react';
import RecentFileItem from './RecentFileItem/RecentFileItem.tsx';
import styles from './RecentFiles.module.css';

interface FileItems {
    id: number;
    fileName: string;
    fileSize: number;
    mimeType: string;
    folderURL: string;
    shared: boolean;
}

interface RecentFileProps {
    filesUser: FileItems[];
}

const files = [
    {fileName: 'test1.txt', fileSize: 123456789, mimeType: 'text/plain', folderURL: '', shared: true},
]

const RecentFiles: FC<RecentFileProps> = ({ filesUser = files }) => {
    return (
        <section className={styles.recentFilesSection}>
            <div className={styles.recentFilesContainer}>
                {filesUser.map((file, index) => (
                    <RecentFileItem
                        key={index}
                        name={file.fileName}
                        size={(file.fileSize/2048).toFixed(2)}
                        // iconColor={file.iconColor}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentFiles;
