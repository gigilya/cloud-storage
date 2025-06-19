import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import Input from '../../../widgets/Input/Input.tsx';
import Button from '../../../widgets/Button/Button.tsx';
import Folder from '../../../widgets/FolderGrid/Folder.tsx';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Search from '@ant-design/icons/SearchOutlined';
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';
import RecentFiles from '../../../widgets/RecentFiles/RecentFiles.tsx';
import { FileItem } from '../../../shared/api/types.ts';
import { message } from 'antd';

const Home: FC = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const fetchFiles = useCallback(async () => {
        try {
            const response = await fetch(
                `https://ggj-cldstrg.ru/api/v1/storage/my-files`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken',
                        )}`,
                    },
                },
            );
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setFiles(data);
        } catch (data) {
            console.error('Error fetching files:', data);
            navigate('/error');
        }
    }, [navigate]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const handleAddFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(
                'https://ggj-cldstrg.ru/api/v1/storage/upload/file',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken',
                        )}`,
                    },
                    body: formData,
                },
            );

            if (!response.ok) throw new Error(await response.text());

            const newFile: FileItem = await response.json();
            setFiles((prevFiles) => [newFile, ...prevFiles]);
            message.success('Файл успешно загружен');
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Ошибка при загрузке файла');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className={styles.container}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                multiple={false}
            />
            <div className={styles.header}>
                <h1 className={styles.headerText}>File Manager</h1>
                <div className={styles.actionsContainer}>
                    <Input
                        icon={<Search />}
                        placeholder="Поиск файлов..."
                    />
                    <div className={styles.buttonsContainer}>
                        <Button
                            icon={<PlusOutlined />}
                            text="Добавить файл"
                            onClick={handleAddFileClick}
                            loading={isUploading}
                            disabled={isUploading}
                        />
                    </div>
                </div>
            </div>

            <Folder />

            <RecentFiles filesUser={files.slice(0, 5)} onUpdate={fetchFiles} />

            {files.length > 5 && (
                <div className={styles.showAllContainer}>
                    <Button
                        text="Показать все"
                        onClick={() => navigate('/home/files')}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
