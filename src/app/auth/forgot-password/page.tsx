import { Metadata } from 'next';
import Image from 'next/image';

import ForgotPassword from '@/components/auth/ForgotPassword';
import Logo from '@/components/ui/Logo';
import authBg from '@/images/auth-bg.jpg';

export const metadata: Metadata = {
    title: 'Forgot Password',
    description:
        'Lorem ipsum',
};

export default function ForgotPasswordPage() {
    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex">
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
                <ForgotPassword />
            </div>
        </main>
    );
}
