import React, { useState } from 'react';
import Input from '../../../widgets/Input/Input.tsx';
import Button from '../../../widgets/Button/Button.tsx';
import StorageUsage from '../../../widgets/StorageUsage/StorageUsage.tsx';
import Icon from '@ant-design/icons/UserOutlined';
import EditIcon from '@ant-design/icons/EditOutlined';
import SaveIcon from '@ant-design/icons/SaveOutlined';
import LockIcon from '@ant-design/icons/LockOutlined';
import styles from '././profile.module.css';

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
    const [userData, setUserData] = useState<UserData>({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        joinedDate: 'January 15, 2022',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSave = () => {
        // Здесь должна быть логика сохранения изменений
        console.log('Saving changes:', userData);
        setIsEditing(false);
    };
    const handleInputChange = (field: string, value: string) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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
                                text="Save"
                                onClick={handleSave}
                            />
                        ) : (
                            <Button
                                icon={<EditIcon />}
                                text="Edit"
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
                                onChange={(e) => handleInputChange('name', e)}
                                placeholder="Enter your name"
                            />
                            <Input
                                onChange={(e) => handleInputChange('email', e)}
                                placeholder="Enter your email"
                                type="email"
                            />
                                <Input
                                    placeholder="Enter current password"
                                    type="password"
                                    icon={<LockIcon />}
                                />
                                <Input
                                    placeholder="Enter new password"
                                    type="password"
                                    icon={<LockIcon />}
                                />
                                <Input
                                    placeholder="Confirm new password"
                                    type="password"
                                    icon={<LockIcon />}
                                />
                        </div>
                    ) : (
                        <div className={styles.viewFields}>
                            <h2 className={styles.userName}>{userData.name}</h2>
                            <p className={styles.userEmail}>{userData.email}</p>
                        </div>
                    )}
                </div>
                <StorageUsage />
            </div>
        </div>
    );
};

export default Profile;
