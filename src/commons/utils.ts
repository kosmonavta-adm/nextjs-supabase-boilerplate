import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const url = {
    login: '/login',
    register: '/',
    dashboard: '/dashboard',
    forgotPassword: '/auth/forgot-password',
};

export type Locales = 'pl' | 'en';

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const getFormErrorMessage = <T, K extends keyof T | undefined>(key: K, dict: T) => {
    if (key === undefined) return;

    return dict[key];
};
