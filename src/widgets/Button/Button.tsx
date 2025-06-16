import React, { FC } from 'react';
import styles from './Button.module.css';

interface ActionButtons {
    text?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
}

const Button: FC<ActionButtons> = ( props) => {
    return (
        <button className={styles.actionButton}
                onClick={props.onClick}
                type= {props.type}>
            {props.icon && <image className={styles.actionIcon}>{props.icon}</image>}
            {props.text}

        </button>
    );
};

export default Button;
