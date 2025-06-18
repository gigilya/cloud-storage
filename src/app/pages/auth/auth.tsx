import React, { useState } from 'react';
import Button from '../../../widgets/Button/Button.tsx';
import Input from '../../../widgets/Input/Input.tsx';
import style from './auth.module.css';
import { useNavigate } from 'react-router';
import { LoginResponse, RegisterResponse } from '../../../shared/api/types.ts';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'register'>(
        'profile',
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(''); // Добавлено для регистрации
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loginFetch = async (
        login: string,
        password: string,
    ): Promise<LoginResponse> => {
        const response = await fetch(
            'https://ggj-cldstrg.ru/api/v1/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            },
        );
        if (!response.ok) {
            let errorMessage = 'Ошибка авторизации';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
                
            } catch (e) {
                console.error('Не удалось распарсить ошибку:', e);
            }
            throw new Error(`${errorMessage} (код ${response.status})`);
        }
        return response.json();
    };

    const registerFetch = async (
        email: string,
        password: string,
        username: string,
    ): Promise<RegisterResponse> => {
        const response = await fetch(
            'https://ggj-cldstrg.ru/api/v1/auth/registration',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
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
        return response.json();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (activeTab === 'profile') {
                // Логика входа
                const { refreshToken, accessToken } = await loginFetch(login, password);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                navigate('/home');
                window.location.reload();
            } else {
                // Логика регистрации
                await registerFetch(email, password, login);
                const { refreshToken } = await loginFetch(login, password);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/home');
                window.location.reload();
            }
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.authWindow}>
            <div className={style.authHeader}>
                <h2>
                    {activeTab === 'profile' ? 'Вход в систему' : 'Регистрация'}
                </h2>
                <div className={style.authTabs}>
                    <button
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        Войти
                    </button>
                    <button
                        className={activeTab === 'register' ? 'active' : ''}
                        onClick={() => setActiveTab('register')}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
            <form
                className={style.authForm}
                onSubmit={handleSubmit}
            >
                <div className={style.inputGroup}>
                    <label htmlFor="login">Имя пользователя</label>
                    <Input
                        type="text"
                        placeholder="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="password">Пароль</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {activeTab === 'profile' && (
                        <a
                            href="#"
                            className={style.forgotPassword}
                        >
                            Забыли пароль?
                        </a>
                    )}
                </div>
                {activeTab === 'register' && (
                    <div className={style.inputGroup}>
                        <label htmlFor="email">email</label>
                        <Input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    text={
                        isLoading
                            ? 'Загрузка...'
                            : activeTab === 'profile'
                            ? 'Войти'
                            : 'Зарегистрироваться'
                    }
                />
                <div className={style.authDivider}>
                    <span>или</span>
                </div>
                <div className={style.socialButtons}>
                    <Button text={'Продолжить с Google'} />
                </div>
            </form>
        </div>
    );
};

export default Auth;
