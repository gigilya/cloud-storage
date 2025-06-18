import React, { FC } from 'react';
import styles from './Button.module.css';

interface ActionButtons {
    text?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
}

const Button: FC<ActionButtons> = ({ loading = false , ...props } ) => {
    return (
        <button
            className={styles.actionButton}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}

        >{loading ? 'Загрузка...' : (
            <>
                {props.icon && <span className={styles.icon}>{props.icon}</span>}
                {props.text}
            </>
        )}
        </button>
    );
};

export default Button;
