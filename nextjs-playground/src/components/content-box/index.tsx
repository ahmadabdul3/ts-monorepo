import styles from './content-box.module.css';
import React, { ReactNode } from 'react';
import cx from 'classnames';

export enum Color {
    primary,
    primaryAccentLight,
    primaryAccentDark,
    secondary,
    secondaryAccentLight,
    secondaryAccentDark,
}

type contentBoxProps = {
    children?: ReactNode,
    debug?: boolean,
    backgroundColor?: Color,
};

export function ContentBox({
    children,
    debug = false,
    backgroundColor
}: contentBoxProps) {
    return (
        <div className={cx(
            styles.contentBox,
            styles.contentBoxStandard,
            {
                [styles.debug]: debug,
                [styles.bgPrimary]: backgroundColor === Color.primary,
                [styles.bgPrimaryAccentLight]: backgroundColor === Color.primaryAccentLight,
                [styles.bgPrimaryAccentDark]: backgroundColor === Color.primaryAccentDark,

                [styles.bgSecondary]: backgroundColor === Color.secondary,
                [styles.bgSecondaryAccentLight]: backgroundColor === Color.secondaryAccentLight,
                [styles.bgSecondaryAccentDark]: backgroundColor === Color.secondaryAccentDark,
            }
        )}>
            {children}
        </div>
    );
}