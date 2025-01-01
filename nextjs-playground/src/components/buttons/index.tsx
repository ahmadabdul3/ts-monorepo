import styles from './buttons.module.css';
import cx from 'classnames';
import { ReactNode } from 'react';

type sharedButtonProps = {
    children?: string | ReactNode,
    fullWidth?: boolean,
    loading?: boolean,
}

type baseButtonProps = {
    classNames?: string,
}

type buttonProps = sharedButtonProps & baseButtonProps;

export function Button({
    children = 'click',
    classNames = '',
    fullWidth = false,
    loading = false,
}: buttonProps) {
    return (
        <div className={cx(styles.buttonWrap, { [styles.fullWidth]: fullWidth })}>
            <button
                className={cx(
                    styles.button,
                    classNames,
                )}
            >
                {children}
                {loading && <img className={cx(styles.icon, styles.iconAfterText)} src='/icons/loading-icon.gif' />}
            </button>
        </div>
    );
}

export function ButtonPrimary(props: sharedButtonProps) {
    return <Button {...props} classNames={styles.buttonPrimary} />;
}

type buttonsContainerProps = sharedButtonProps;

export function ButtonsContainer({
    children
}: buttonsContainerProps) {
    return (
        <div className={styles.buttonsContainer}>
            {children}
        </div>
    );
}