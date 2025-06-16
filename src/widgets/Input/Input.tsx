import React, { ChangeEvent, FC } from 'react';
import styles from './Input.module.css';

interface Input {
    icon?: React.ReactNode;
    type?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Input> = (props) => {
    return (
        <div className={styles.inputContainer}>
            {props.icon && (
                <image className={styles.inputIcon}>{props.icon}</image>
            )}
            <input
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                className={styles.input}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Input;
