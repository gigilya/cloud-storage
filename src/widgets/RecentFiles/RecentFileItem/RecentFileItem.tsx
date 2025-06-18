import React from 'react';
import styles from './RecentFileItem.module.css';
import { MoreOutlined, DownloadOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, message } from 'antd';

interface RecentFileItemProps {
    name: string;
    size: string;
    fileName: string; // Используем fileName вместо fileId
    isPublic?: boolean;
    onUpdate?: () => void;
}

const RecentFileItem: React.FC<RecentFileItemProps> = ({
    name,
    size,
    fileName,
    isPublic = false,
    onUpdate,
}) => {
    const token = `Bearer ${localStorage.getItem('accessToken')}`;

    const handleDownload = async () => {
        try {
            const response = await fetch(
                `https://ggj-cldstrg.ru/api/v1/storage/download/file?fileName=${fileName}`,
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );

            if (!response.ok) throw new Error('Ошибка скачивания');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            message.success('Скачивание началось');
        } catch (error) {
            message.error('Ошибка при скачивании файла');
            console.error('Download error:', error);
        }
    };

    const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
        try {
            switch (key) {
                case 'rename':
                    { const newName = prompt('Введите новое имя файла:', name);
                    if (newName && newName !== name) {
                        await fetch(
                            `https://ggj-cldstrg.ru/api/v1/storage/rename/file?fileName=${fileName}&newName=${newName}`,
                            {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: token,
                                },
                                body: JSON.stringify({
                                    fileName: fileName,
                                    newName: newName,
                                }),
                            },
                        );
                        message.success('Файл переименован');
                        onUpdate?.();
                    }
                    break; }

                case 'view':
                    { const viewResponse = await fetch(
                        `https://ggj-cldstrg.ru/api/v1/storage/view/file?fileName=${fileName}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                            body: JSON.stringify({ fileName }),
                        },
                    );
                    const fileData = await viewResponse.json();
                    window.open(fileData.url, '_blank');
                    break; }

                case 'delete':
                    if (confirm('Вы уверены, что хотите удалить этот файл?')) {
                        await fetch(
                            `https://ggj-cldstrg.ru/api/v1/storage/delete/file?fileName=${fileName}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: token,
                                },
                                body: JSON.stringify({ fileName }),
                            },
                        );
                        message.success('Файл удален');
                        onUpdate?.();
                    }
                    break;

                case 'public':
                    { const action = isPublic ? 'private' : 'public';
                    await fetch(
                        `https://ggj-cldstrg.ru/api/v1/storage/change-status`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                            body: JSON.stringify({
                                fileName,
                                status: action,
                            }),
                        },
                    );
                    message.success(
                        `Файл теперь ${isPublic ? 'приватный' : 'публичный'}`,
                    );
                    onUpdate?.();
                    break; }
            }
        } catch (error) {
            message.error(
                'Произошла ошибка: ' +
                    (error instanceof Error ? error.message : 'Unknown error'),
            );
            console.error('API Error:', error);
        }
    };

    const items: MenuProps['items'] = [
        {
            key: 'download',
            label: 'Скачать',
            icon: <DownloadOutlined />,
            onClick: () => handleDownload(),
        },
        {
            key: 'rename',
            label: 'Переименовать',
        },
        {
            key: 'view',
            label: 'Посмотреть',
        },
        {
            key: 'public',
            label: isPublic ? 'Сделать приватным' : 'Сделать публичным',
        },
        {
            type: 'divider',
        },
        {
            key: 'delete',
            label: 'Удалить',
            danger: true,
        },
    ];

    return (
        <div className={styles.recentFileItem}>
            <div className={styles.fileInfo}>
                <span className={styles.fileIcon}></span>
                <div>
                    <h4 className={styles.fileName}>{name}</h4>
                </div>
            </div>
            <div className={styles.sizeAndOptions}>
                <span className={styles.fileSize}>{size}</span>
                <Dropdown
                    menu={{
                        items,
                        onClick: handleMenuClick // Передаём обработчик сюда
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <span className={styles.moreOptions}>
                        <MoreOutlined />
                    </span>
                </Dropdown>
            </div>
        </div>
    );
};

export default RecentFileItem;
