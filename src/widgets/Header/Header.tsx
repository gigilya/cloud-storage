import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const logout = async () => {
        const response = await fetch(
            'https://ggj-cldstrg.ru/api/v1/auth/logout',
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
            let errorMessage = 'Ошибка регистрации';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error('Не удалось распарсить ошибку:', e);
            }
            throw new Error(`${errorMessage} (код ${response.status})`);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/auth');
        window.location.reload();
    };

    return (
        <header className={styles.header}>
            <div
                className={styles.logoContainer}
                onClick={() => {
                    navigate('/home/');
                    window.location.reload();
                }}
            >
                <svg
                    width="40"
                    height="32"
                    viewBox="0 0 120 80"
                    className={styles.logo}
                >
                    <path
                        d="M95 40C95 25 85 15 70 15C65 5 50 0 35 0C15 0 0 15 0 35C0 40 5 45 10 45H25C30 60 45 65 55 65C60 65 65 65 70 60H85C100 60 110 50 110 35C110 20 100 10 85 10C80 10 75 15 75 20C75 25 80 30 85 30C90 30 95 35 95 40Z"
                        fill="#10B981"
                    />
                </svg>
                <h1 className={styles.appName}>cloud-storage</h1>
            </div>
            <span className={styles.buttonUser}>
                <Button
                    icon={<UserOutlined />}
                    onClick={() => {
                        navigate('/home/profile');
                        window.location.reload();
                    }}
                />
                <Button
                    icon={<LogoutOutlined />}
                    onClick={logout}
                />
            </span>
        </header>
    );
};

export default Header;
