import styles from './ErrorMessage.module.css';
import React from 'react';

export const ErrorMessage: React.FC = ({ children }) => (
    <div className={styles.error}>{children}</div>
);
