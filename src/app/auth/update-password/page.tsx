import { redirect } from 'next/navigation';

import { url } from '@/commons/utils';
import UpdatePassword from '@/components/auth/UpdatePassword';
import Logo from '@/components/ui/Logo';
import { createClient } from '@/supabase/server';

export default async function PrivatePage() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
    }

    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex">
                <div className="bg-purple-800 z-10 flex h-full w-full">
                    <Logo/>
                </div>
            </div>
            <div className="flex flex-col items-center p-4">
                <UpdatePassword />
            </div>
        </main>
    );
}
