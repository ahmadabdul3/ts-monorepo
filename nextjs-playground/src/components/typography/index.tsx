import styles from './typography.module.scss';
import cx from 'classnames';
import { ReactNode } from 'react';
import { contentWrapper } from '@/types/generic-component-prop-types';



type textProps = {
    children: ReactNode,
    className?: String,
}

export function Text({ children, className }: textProps) {
    return (
        <p className={cx(styles.textBasic, className)}>
            {children}
        </p>
    );
}

export function TextError(props: textProps) {
    return <Text {...props} className={cx(styles.textError, props.className)} />;
}

export function MessageBasic(props: textProps) {
    return <Text {...props} className={styles.message} />;
}

export function MessageError(props: textProps) {
    return <TextError {...props} className={styles.message} />;
}

export function PageTitle({ children }: contentWrapper) {
    return (
        <h1 className={styles.pageTitle}>
            {children}
        </h1>
    );
}

export function PageSectionTitle({ children }: contentWrapper) {
    return (
        <h3 className={styles.pageSectionTitle}>
            {children}
        </h3>
    );
}