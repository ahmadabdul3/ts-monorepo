import styles from './styles.module.scss';
import debugStyles from '@/styles/debug.module.scss';
import cx from 'classnames';
import { contentWrapper } from '@/types/generic-component-prop-types';
import BaseContainer from '@/components/base-container';

type pageSectionPropTypes = contentWrapper & {
    noWidthConstraint?: boolean,
}

export function PageSection({ children, debug, noWidthConstraint, ...props }: pageSectionPropTypes) {
    let content = children;
    if (!noWidthConstraint) {
        content = (
            <PageWidth debug={debug} {...props}>
                {children}
            </PageWidth>
        );
    }
    return (
        <BaseContainer
            {...props}
            el='section'
            className={cx(
                styles.pageSection,
                { [debugStyles.debug]: debug },
            )}
        >
            {content}
        </BaseContainer>
    );
}

export function PageWidth({ children, debug, ...props }: contentWrapper) {
    return (
        <BaseContainer
            {...props}
            className={cx(
                styles.pageWidth,
                { [debugStyles.debug]: debug },
            )}
        >
            {children}
        </BaseContainer>
    );
}

export function Page({ children, debug }: contentWrapper) {
    return (
        <main
            className={cx(
                { [debugStyles.debug]: debug },
            )}
        >
            {children}
        </main>
    );
}