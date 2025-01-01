import { ReactNode } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

export type baseContainerSharedPropsTypes = {
    staticSize?: boolean,
    className?: string,
    children?: ReactNode,
    column?: boolean,
    noOverflow?: boolean,
    centerContent?: boolean,
}

type baseContainerPropTypes = baseContainerSharedPropsTypes & {
    el?: string,
}

export default function BaseContainer({
    children,
    el,
    staticSize,
    className,
    column,
    noOverflow,
    centerContent
}: baseContainerPropTypes) {
    let Component = Div;
    if (el === 'section') Component = Section;

    return (
        <Component className={cx(
            styles.baseContainer,
            className,
            {
                [styles.staticSize]: staticSize,
                [styles.column]: column,
                [styles.noOverflow]: noOverflow,
                [styles.centerContent]: centerContent,
            }
        )}>
            {children}
        </Component>
    );
}

function Div(props: baseContainerPropTypes) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

function Section(props: baseContainerPropTypes) {
    return (
        <section className={props.className}>
            {props.children}
        </section>
    );
}

