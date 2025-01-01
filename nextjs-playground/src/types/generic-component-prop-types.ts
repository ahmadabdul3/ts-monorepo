import { debuggable } from './debugging';
import { baseContainerSharedPropsTypes } from '@/components/base-container';

export type contentWrapper =
    debuggable &
    baseContainerSharedPropsTypes;