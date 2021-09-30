import styles from './Button.module.css';
import React from 'react';
import Link from 'next/Link';
import cn from 'classnames';

export enum ButtonTone {
    Primary = 'primary'
}

export type ButtonProps = (JSX.IntrinsicElements['a'] | JSX.IntrinsicElements['button']) & {
    tone?: ButtonTone;
};

// @ts-ignore
export const Button: React.FC<ButtonProps> = ({ children, href, tone, ...props }) => {
    const TagName: any = href ? 'a' : 'button';
    const content = (
        <TagName className={cn(props.className, styles.button, styles[tone])} {...props}>
            {children}
        </TagName>
    );
    if (href) return <Link href={href}>{content}</Link>;
    return content;
};
