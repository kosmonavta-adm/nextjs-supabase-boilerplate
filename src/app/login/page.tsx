import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { url } from '@/commons/utils';
import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/ui/Logo';
import authBg from '@/images/auth-bg.jpg';
import { createClient } from '@/supabase/server';

export const metadata: Metadata = {
    title: 'Login',
    description:
        'Lorem ipsum',
};

export default async function LoginPage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user) {
        redirect(url.dashboard);
    }

    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:flex">
                <div className="relative z-10 flex h-full w-full">
                    <Image
                        fill={true}
                        src={authBg}
                        alt=""
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="m-auto flex w-full flex-col items-center gap-16 p-4">
                <Logo />
                <LoginForm />
            </div>
        </main>
    );
}
