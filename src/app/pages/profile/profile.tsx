import React, { useState, useEffect } from 'react';
import Input from '../../../widgets/Input/Input.tsx';
import Button from '../../../widgets/Button/Button.tsx';
import StorageUsage from '../../../widgets/StorageUsage/StorageUsage.tsx';
import Icon from '@ant-design/icons/UserOutlined';
import EditIcon from '@ant-design/icons/EditOutlined';
import SaveIcon from '@ant-design/icons/SaveOutlined';
import LockIcon from '@ant-design/icons/LockOutlined';
import styles from './profile.module.css';
import { FileItem, UserProfile } from '../../../shared/api/types.ts';
import { useNavigate } from 'react-router';

interface UserData {
    name: string;
    email: string;
    joinedDate: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [files, setFiles] = useState<FileItem[]>([]);
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        joinedDate: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const token = `Bearer ${localStorage.getItem('accessToken')}`;
                const response = await fetch(
                    'https://ggj-cldstrg.ru/api/v1/user/info/profile',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data: UserProfile = await response.json();
                setProfileData(data);

                // Заполняем форму данными пользователя
                setUserData({
                    name: data.username,
                    email: data.email,
                    joinedDate: new Date(data.createdAt).toLocaleDateString(
                        'en-US',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        },
                    ),
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (err) {
                console.error('Ошибка при загрузке профиля:', err);
                setError(
                    err instanceof Error ? err.message : 'Неизвестная ошибка',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch(
                `https://ggj-cldstrg.ru/api/v1/storage/my-files`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'accessToken',
                        )}`,
                    },
                },
            );
            if (!response.ok) {
                navigate('/error');
                console.log(`${response.statusText} (код ${response.status})`);
            }
            const data = await response.json();
            setFiles(data);
        };

        fetchFiles();
    }, [navigate]);

    const handleSave = async () => {
        try {
            const token = `Bearer ${localStorage.getItem('accessToken')}`;
            const response = await fetch(
                'https://ggj-cldstrg.ru/api/v1//user/update/all',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        username: userData.name,
                        email: userData.email,
                        newPassword: userData.newPassword,
                        oldPassword: userData.currentPassword,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`Ошибка сохранения`);
            }

            setIsEditing(false);
        } catch (err) {
            console.error('Ошибка при сохранении:', err);
            setError(err instanceof Error ? err.message : 'Ошибка сохранения');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка профиля...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!profileData) {
        return <div className={styles.error}>Данные профиля не загружены</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileContent}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                        <Icon style={{ fontSize: '64px', color: '#10b981' }} />
                    </div>
                    <div className={styles.profileActions}>
                        {isEditing ? (
                            <Button
                                icon={<SaveIcon />}
                                text="Сохранить"
                                onClick={handleSave}
                            />
                        ) : (
                            <Button
                                icon={<EditIcon />}
                                text="Редактировать"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.profileInfo}>
                    {isEditing ? (
                        <div className={styles.editFields}>
                            <Input
                                value={userData.name}
                                onChange={(e) =>
                                    handleInputChange('name', e.target.value)
                                }
                                placeholder="Имя пользователя"
                            />
                            <Input
                                value={userData.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
                                placeholder="Email"
                                type="email"
                            />
                            <Input
                                value={userData.currentPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        'currentPassword',
                                        e.target.value,
                                    )
                                }
                                placeholder="Текущий пароль"
                                type="password"
                                icon={<LockIcon />}
                            />
                            <Input
                                value={userData.newPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        'newPassword',
                                        e.target.value,
                                    )
                                }
                                placeholder="Новый пароль"
                                type="password"
                                icon={<LockIcon />}
                            />
                            <Input
                                value={userData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        'confirmPassword',
                                        e.target.value,
                                    )
                                }
                                placeholder="Подтвердите пароль"
                                type="password"
                                icon={<LockIcon />}
                            />
                        </div>
                    ) : (
                        <div className={styles.viewFields}>
                            <h2 className={styles.userName}>{userData.name}</h2>
                            <p className={styles.userEmail}>{userData.email}</p>
                            <p className={styles.joinedDate}>
                                Дата регистрации: {userData.joinedDate}
                            </p>
                        </div>
                    )}
                </div>

                <StorageUsage files={files} />
            </div>
        </div>
    );
};

export default Profile;
