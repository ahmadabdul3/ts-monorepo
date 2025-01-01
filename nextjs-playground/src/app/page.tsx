'use client'

import { Page, PageSection } from '@/components/page-sectioning';
import { PageTitle, PageSectionTitle } from '@/components/typography';
import { contentWrapper } from '@/types/generic-component-prop-types';
import {
    useRef,
    useEffect,
    useState,
    useCallback,
} from 'react';
import styles from './page.module.css';
import DoDateStuff from '@lib/date';


export default function Main() {
    console.log('do date stuff: ', DoDateStuff());
    return (
        <Page debug>
            <PageSection debug column>
                <PageTitle>
                    Welcome to my website
                </PageTitle>
                <PageSectionTitle>
                    Howdy ho
                </PageSectionTitle>
            </PageSection>

        </Page>
    );
}

// function SplitContentContainer() {
//     const mountedRef = useRef(false);
//     const separatorRef = useRef(null);
//     const [mouseDown, setMouseDown] = useState(false);
//     const [mousePos, setMousePos] = useState(0);
//     const [mousePosDiff, setMousePosDiff] = useState(0);

//     const handleMove = useCallback((e: any) => {
//         // console.log('*** mouse move', mouseDown);
//         if (mouseDown) {
//             setMousePosDiff(e.x - mousePos);
//             console.log('*** MOUSE DOWN, CAN DRAG');
//         }
//     }, [mouseDown]);

//     const handleMouseDown = useCallback((e: any) => {
//         console.log('*** set mouse down');
//         console.log('*** e', e);
//         setMouseDown(true);
//         setMousePos(e.x);
//     }, []);
//     const handleMouseUp = useCallback(() => {
//         console.log('*** set mouse up');
//         setMouseDown(false);
//     }, []);

//     useEffect(() => {
//         window.addEventListener('mousemove', handleMove);

//         return () => {
//             window.removeEventListener('mousemove', handleMove);
//         }
//     }, [mouseDown]);

//     useEffect(() => {
//         if (!separatorRef.current) return;

//         separatorRef.current.addEventListener('mousedown', handleMouseDown);
//         window.addEventListener('mouseup', handleMouseUp);

//         return () => {
//             if (separatorRef.current) separatorRef.current.removeEventListener('mousedown', handleMouseDown);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [separatorRef]);

//     return (
//         <ContentBox width={1000}>
//             <ContentBox width={100 + mousePosDiff} />
//             <div ref={separatorRef} className={styles.separator} />
//             <ContentBox width={100 - mousePosDiff} />
//         </ContentBox>
//     );
// }

// type contentBox = contentWrapper & {
//     width?: number
// }
// function ContentBox({ children, width = 100 }: contentBox) {
//     return <div className={styles.contentBox} style={{
//         width,
//     }}>{children}</div>;
// }
