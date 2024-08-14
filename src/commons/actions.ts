'use server';

import { cookies } from 'next/headers';

export const handleChangeLanguage = (language: 'pl' | 'en') => {
    cookies().set('NEXT_LOCALE', language);
};
