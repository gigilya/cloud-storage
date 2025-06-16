import React from 'react';
import Input from '../../../widgets/Input/Input.tsx';
import Button from '../../../widgets/Button/Button.tsx';
import Folder from '../../../widgets/FolderGrid/Folder.tsx';
import RecentFiles from '../../../widgets/RecentFiles/RecentFiles.tsx';
import Icon from '@ant-design/icons/ArrowsAltOutlined';
import Search from '@ant-design/icons/SearchOutlined';
import styles from './home.module.css';

interface Files {
    folderUrl?: string;
}

const Home: React.FC = () => {
    const getFile = async () => {
        const response = await fetch(
            `https://ggj-cldstrg.ru/api/v1/storage/my-files`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('accessToken')}`,
                },
            },
        );
        if (!response.ok) {
            throw new Error(`${errorMessage} (код ${response.status})`);
        }
        const data = await response.json();
        console.log(data);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };
    getFile();
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerText}>File Manager</h1>
                <div className={styles.actionsContainer}>
                    <Input icon={<Search />} />
                    <div className={styles.buttonsContainer}>
                        <Button
                            icon={<Icon />}
                            text="Добавить файл"
                        />
                    </div>
                </div>
            </div>
            <Folder />
            <RecentFiles />
        </div>
    );
};

export default Home;
