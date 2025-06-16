import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import styles from './Error.module.css';
import Button from '../../../widgets/Button/Button.tsx';

const Error: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    const logo = (
        <path
            d="M95 40C95 25 85 15 70 15C65 5 50 0 35 0C15 0 0 15 0 35C0 40 5 45 10 45H25C30 60 45 65 55 65C60 65 65 65 70 60H85C100 60 110 50 110 35C110 20 100 10 85 10C80 10 75 15 75 20C75 25 80 30 85 30C90 30 95 35 95 40Z"
            fill="#10b981"
            fillOpacity="0.1"
        />
    );

    return (
        <div className={styles.container}>
            <div className={styles.backgroundLogo}>
                <svg
                    width="400"
                    height="320"
                    viewBox="0 0 120 80"
                    className={styles.cloudLogo}>
                    {logo}
                </svg>
            </div>
            <div className={styles.content}>
                <div className={styles.errorCode}>
                    <span className={styles.digit}>У</span>
                    <span className={styles.digit}>п</span>
                    <span className={styles.digit}>с</span>
                </div>
                <h1 className={styles.title}>Что-то пошло не так</h1>
                <p className={styles.message}>
                    Кажется, мы не можем найти то, что вы ищете
                </p>
                <Link to="/">
                    <Button text="Вернуться на главную" />
                </Link>
            </div>
        </div>
    );
};

export default Error;
